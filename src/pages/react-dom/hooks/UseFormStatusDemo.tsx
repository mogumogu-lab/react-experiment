import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'

// Submit button component that uses useFormStatus
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()

  return (
    <div className="space-y-4">
      <button
        type="submit"
        disabled={pending}
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          pending
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {pending ? 'Submitting...' : 'Submit'}
      </button>

      {/* Show form status information */}
      <div className="p-4 bg-gray-800 rounded-lg text-sm space-y-2">
        <div>
          <span className="text-gray-400">Pending:</span>{' '}
          <span className={pending ? 'text-yellow-400' : 'text-green-400'}>
            {pending ? 'true' : 'false'}
          </span>
        </div>
        <div>
          <span className="text-gray-400">Method:</span>{' '}
          <span className="text-blue-400">{method || 'null'}</span>
        </div>
        <div>
          <span className="text-gray-400">Action:</span>{' '}
          <span className="text-purple-400">{action ? 'function' : 'null'}</span>
        </div>
        {data && (
          <div>
            <span className="text-gray-400">Form Data:</span>
            <pre className="text-xs text-gray-300 mt-1">
              {JSON.stringify(Object.fromEntries(data.entries()), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

// Simulate async form submission
async function submitForm(_prevState: any, formData: FormData) {
  const username = formData.get('username')
  const email = formData.get('email')

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate validation
  if (!username || username.toString().length < 3) {
    return {
      success: false,
      message: 'Username must be at least 3 characters',
      data: null,
    }
  }

  if (!email || !email.toString().includes('@')) {
    return {
      success: false,
      message: 'Please enter a valid email',
      data: null,
    }
  }

  return {
    success: true,
    message: 'Form submitted successfully!',
    data: { username, email },
  }
}

export default function UseFormStatusDemo() {
  const [state, formAction] = useActionState(submitForm, null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-4">useFormStatus</h1>
        <p className="text-gray-300 text-lg">
          <code className="text-blue-400">useFormStatus</code>는 form 제출 상태를
          추적하는 Hook입니다.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">
          Basic Usage
        </h2>
        <p className="text-gray-300 mb-4">
          버튼 컴포넌트에서 <code>useFormStatus</code>를 사용하여 form의 제출
          상태를 확인할 수 있습니다.
        </p>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter username (min 3 chars)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter email"
            />
          </div>

          <SubmitButton />
        </form>

        {/* Show submission result */}
        {state && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              state.success
                ? 'bg-green-900/30 border border-green-700'
                : 'bg-red-900/30 border border-red-700'
            }`}
          >
            <p
              className={`font-semibold ${
                state.success ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {state.message}
            </p>
            {state.data && (
              <pre className="text-xs text-gray-300 mt-2">
                {JSON.stringify(state.data, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">
          Key Points
        </h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              <code className="text-yellow-400">useFormStatus</code>는 반드시
              form의 <strong>자식 컴포넌트</strong>에서만 호출되어야 합니다
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              <code className="text-yellow-400">pending</code>: form이 제출
              중인지 여부
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              <code className="text-yellow-400">data</code>: 제출 중인
              FormData 객체
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              <code className="text-yellow-400">method</code>: HTTP 메서드
              (GET/POST)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              <code className="text-yellow-400">action</code>: form의 action
              함수 참조
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              주로 <code className="text-yellow-400">useActionState</code>와
              함께 사용되어 form 상태를 관리합니다
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}