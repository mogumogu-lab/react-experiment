import { useActionState } from 'react'

async function submitAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string

  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 1000))

  if (!name) {
    return { error: 'Name is required', success: false }
  }

  return { message: `Hello, ${name}!`, success: true }
}

export default function UseActionStateDemo() {
  const [state, formAction, isPending] = useActionState(submitAction, { success: false })

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useActionState</h2>
      <p className="text-gray-400">Manages form state with server actions</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">Form with Action State</h3>
        <form action={formAction} className="space-y-4">
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 bg-gray-700 rounded text-white"
            placeholder="Enter your name"
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors disabled:opacity-50"
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {state.success && state.message && (
          <p className="mt-4 text-green-400">{state.message}</p>
        )}
        {state.error && (
          <p className="mt-4 text-red-400">{state.error}</p>
        )}
      </div>
    </div>
  )
}