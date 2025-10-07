import { useState } from 'react'

// Simulated tainted object tracking
const taintedObjects = new WeakSet()

// Simulated taintObjectReference
function simulateTaintObjectReference(obj: object, message: string) {
  taintedObjects.add(obj)
  console.warn(`[TAINT] Object marked as tainted: ${message}`)
  return obj
}

// Check if object is tainted
function isTainted(obj: object): boolean {
  return taintedObjects.has(obj)
}

// Example: Sensitive user data
interface SensitiveUser {
  id: number
  username: string
  email: string
  password: string // Should never be sent to client!
  ssn: string // Should never be sent to client!
}

// Server-side function (simulated)
function getUserFromDatabase(userId: number): SensitiveUser {
  const user: SensitiveUser = {
    id: userId,
    username: 'john_doe',
    email: 'john@example.com',
    password: 'hashed_password_xyz',
    ssn: '123-45-6789'
  }

  // Mark this object as tainted - it contains sensitive data
  simulateTaintObjectReference(
    user,
    'This object contains sensitive data (password, SSN) and should not be sent to the client'
  )

  return user
}

// Safe user data for client
interface SafeUser {
  id: number
  username: string
  email: string
}

// Convert to safe user (removes sensitive fields)
function toSafeUser(user: SensitiveUser): SafeUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email
  }
}

export default function ExperimentalTaintObjectReferenceDemo() {
  const [userId, setUserId] = useState(1)
  const [attemptType, setAttemptType] = useState<'safe' | 'unsafe' | null>(null)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const attemptSafeSend = () => {
    setError(null)
    setAttemptType('safe')

    try {
      const user = getUserFromDatabase(userId)
      const safeUser = toSafeUser(user)

      // Check if we're trying to send tainted object
      if (isTainted(safeUser)) {
        throw new Error('Attempted to send tainted object to client!')
      }

      setResult(safeUser)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const attemptUnsafeSend = () => {
    setError(null)
    setAttemptType('unsafe')

    try {
      const user = getUserFromDatabase(userId)

      // Check if we're trying to send tainted object
      if (isTainted(user)) {
        throw new Error(
          '🚨 SECURITY VIOLATION: Attempted to send tainted object containing sensitive data (password, SSN) to client!'
        )
      }

      setResult(user)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">experimental_taintObjectReference()</h1>
        <p className="text-gray-400 mb-6">
          experimental_taintObjectReference()는 특정 객체를 "오염된(tainted)" 것으로 표시하여
          클라이언트로 전송되는 것을 방지합니다. 민감한 데이터를 보호하는 서버 컴포넌트 전용 API입니다.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Interactive Demo</h2>
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded">
              <label className="text-sm text-gray-400 mb-2 block">User ID:</label>
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
                className="px-3 py-2 bg-gray-700 rounded w-32"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={attemptSafeSend}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
              >
                Send Safe User (Filtered)
              </button>
              <button
                onClick={attemptUnsafeSend}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
              >
                Send Full User (Unsafe)
              </button>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-500 p-4 rounded">
                <p className="font-semibold text-red-400 mb-1">Error:</p>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {result && !error && (
              <div className={`p-4 rounded border ${
                attemptType === 'safe'
                  ? 'bg-green-900/30 border-green-500'
                  : 'bg-blue-900/30 border-blue-500'
              }`}>
                <p className="font-semibold mb-2">
                  {attemptType === 'safe' ? '✓ Safe Data Sent:' : 'Data Sent:'}
                </p>
                <pre className="text-xs font-mono text-gray-300">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-yellow-900/30 p-3 rounded border border-yellow-700">
              <p className="text-sm text-yellow-200">
                <strong>실험:</strong> "Send Full User"를 클릭하면 오염된 객체를 전송하려 시도하여
                에러가 발생합니다. "Send Safe User"는 민감한 필드를 제거한 새 객체를 생성하여 성공합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`import { experimental_taintObjectReference } from 'react';

// Server Component only!
async function getUserData(userId) {
  const user = await db.users.findById(userId);

  // Mark entire object as tainted
  experimental_taintObjectReference(
    user,
    'Do not pass full user object to client'
  );

  return user;
}

// This will throw an error at runtime
export async function UserProfile({ userId }) {
  const user = await getUserData(userId);

  // ❌ Error! Trying to pass tainted object to client component
  return <ClientComponent user={user} />;
}

// Correct approach: Create safe subset
export async function UserProfile({ userId }) {
  const user = await getUserData(userId);

  // ✓ Create new object with only public fields
  const publicUser = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  return <ClientComponent user={publicUser} />;
}
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">How It Works</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">1. Mark Object as Tainted</p>
              <p className="text-gray-400">
                객체 전체를 오염된 것으로 표시 (참조로 추적)
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">2. Runtime Check</p>
              <p className="text-gray-400">
                오염된 객체를 클라이언트로 전송하려 하면 에러 발생
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">3. Create Safe Copy</p>
              <p className="text-gray-400">
                새 객체를 만들어 공개 가능한 필드만 포함
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold">4. Development Safety</p>
              <p className="text-gray-400">
                개발 중 실수로 민감한 데이터 노출 방지
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Use Cases</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Database records with sensitive fields</p>
              <p className="text-gray-400">password, SSN, credit cards 등 포함된 객체</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ API tokens and credentials</p>
              <p className="text-gray-400">절대 클라이언트로 전송되면 안 되는 토큰</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Internal system data</p>
              <p className="text-gray-400">시스템 내부 정보가 포함된 객체</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Compliance requirements</p>
              <p className="text-gray-400">GDPR, HIPAA 등 규정 준수를 위한 보호</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Important Notes</h2>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>Object reference tracking:</strong> 객체 참조로 추적 (값 복사는 안전)</p>
            <p>• <strong>Server Components only:</strong> 서버 컴포넌트에서만 사용 가능</p>
            <p>• <strong>Development aid:</strong> 개발 시 실수 방지를 위한 도구</p>
            <p>• <strong>Not encryption:</strong> 암호화가 아닌 전송 방지 메커니즘</p>
            <p>• <strong>Complementary to taintUniqueValue:</strong> 개별 값이 아닌 객체 전체 보호</p>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Comparison</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-red-400 mb-2">❌ Without Taint</p>
              <pre className="text-xs text-gray-400 overflow-x-auto"><code>{`// Easy to accidentally expose
async function getUser(id) {
  const user = await db.query();
  // Oops! Sending password
  return user;
}

// Client receives everything
<ClientComponent user={user} />
// password, ssn exposed!`}</code></pre>
            </div>
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-green-400 mb-2">✓ With Taint</p>
              <pre className="text-xs text-gray-400 overflow-x-auto"><code>{`// Protected automatically
async function getUser(id) {
  const user = await db.query();
  taintObjectReference(user);
  return user;
}

// Error at runtime!
<ClientComponent user={user} />
// Forced to create safe copy`}</code></pre>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-yellow-900/30 p-4 rounded border border-yellow-700">
        <h3 className="font-semibold mb-2 text-yellow-400">⚠️ Experimental API</h3>
        <p className="text-sm text-gray-300">
          experimental_taintObjectReference()는 실험적 API로 Server Components와
          React Server Actions에서만 사용 가능합니다. 이 데모는 개념 설명을 위한 시뮬레이션입니다.
        </p>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>객체 전체를 오염된 것으로 표시</li>
          <li>클라이언트로 전송 시 런타임 에러 발생</li>
          <li>민감한 데이터 노출 방지</li>
          <li>개발 중 보안 실수 조기 발견</li>
          <li>서버 컴포넌트 전용 API</li>
          <li>새 객체 생성 시 오염 상태 전파 안 됨</li>
        </ul>
      </div>
    </div>
  )
}