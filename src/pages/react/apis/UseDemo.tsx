import { Suspense, useState } from 'react'

// Simulated resource type
interface Resource<T> {
  read(): T
}

// Create a resource that can be "used"
function createResource<T>(promise: Promise<T>): Resource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending'
  let result: T
  let error: any

  const suspender = promise.then(
    (data) => {
      status = 'success'
      result = data
    },
    (err) => {
      status = 'error'
      error = err
    }
  )

  return {
    read() {
      if (status === 'pending') {
        throw suspender // Suspends the component
      } else if (status === 'error') {
        throw error
      } else {
        return result
      }
    }
  }
}

// Simulated API calls
const fetchUser = (userId: number): Promise<{ id: number; name: string; email: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`
      })
    }, 1000)
  })
}

const fetchPosts = (): Promise<Array<{ id: number; title: string }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'First Post' },
        { id: 2, title: 'Second Post' },
        { id: 3, title: 'Third Post' }
      ])
    }, 1500)
  })
}

// Component that uses the resource
function UserProfile({ userResource }: { userResource: Resource<any> }) {
  const user = userResource.read() // This will suspend if not ready

  return (
    <div className="bg-gray-900 p-4 rounded">
      <h3 className="text-lg font-semibold text-green-400">{user.name}</h3>
      <p className="text-sm text-gray-400">Email: {user.email}</p>
      <p className="text-xs text-gray-500">ID: {user.id}</p>
    </div>
  )
}

function UserPosts({ postsResource }: { postsResource: Resource<any> }) {
  const posts = postsResource.read() // This will suspend if not ready

  return (
    <div className="bg-gray-900 p-4 rounded space-y-2">
      <h3 className="text-lg font-semibold text-blue-400 mb-2">Posts</h3>
      {posts.map((post: any) => (
        <div key={post.id} className="bg-gray-800 p-2 rounded">
          <p className="text-sm text-gray-300">{post.title}</p>
        </div>
      ))}
    </div>
  )
}

export default function UseDemo() {
  const [userResource, setUserResource] = useState(() => createResource(fetchUser(1)))
  const [postsResource, setPostsResource] = useState(() => createResource(fetchPosts()))

  const loadUser = (id: number) => {
    setUserResource(createResource(fetchUser(id)))
    setPostsResource(createResource(fetchPosts()))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">use() (Experimental)</h1>
        <p className="text-gray-400 mb-6">
          use()는 Promise나 Context와 같은 리소스의 값을 읽을 수 있는 실험적 React API입니다.
          Suspense와 함께 작동하여 데이터 로딩을 선언적으로 처리합니다.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Interactive Demo</h2>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <button
                onClick={() => loadUser(1)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
              >
                Load User 1
              </button>
              <button
                onClick={() => loadUser(2)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
              >
                Load User 2
              </button>
              <button
                onClick={() => loadUser(3)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
              >
                Load User 3
              </button>
            </div>

            <div className="space-y-4">
              <Suspense fallback={
                <div className="bg-gray-900 p-4 rounded animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              }>
                <UserProfile userResource={userResource} />
              </Suspense>

              <Suspense fallback={
                <div className="bg-gray-900 p-4 rounded">
                  <div className="text-sm text-gray-400">Loading posts...</div>
                </div>
              }>
                <UserPosts postsResource={postsResource} />
              </Suspense>
            </div>

            <div className="bg-yellow-900/30 p-3 rounded border border-yellow-700">
              <p className="text-sm text-yellow-200">
                <strong>참고:</strong> 버튼을 클릭하면 새로운 데이터를 로드합니다.
                각 리소스는 독립적으로 Suspense 경계 내에서 로딩됩니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`import { use, Suspense } from 'react';

// Using with Promises
function UserProfile({ userPromise }) {
  // use() suspends until promise resolves
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

// Using with Context
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  // Can be called conditionally!
  const theme = use(ThemeContext);
  return <button className={theme}>Click me</button>;
}

// Parent component
function App() {
  const userPromise = fetchUser(1);

  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}

// Unlike hooks, use() can be called conditionally
function Message({ messageId }) {
  const message = messageId
    ? use(fetchMessage(messageId))  // Conditional!
    : null;

  if (!message) return null;
  return <div>{message.text}</div>;
}
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">How use() Works</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">1. Reading Promises</p>
              <p className="text-gray-400">
                Promise가 pending이면 컴포넌트를 suspend, resolve되면 값 반환
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">2. Reading Context</p>
              <p className="text-gray-400">
                useContext와 유사하지만 조건부 호출 가능
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold">3. Suspense Integration</p>
              <p className="text-gray-400">
                자동으로 가장 가까운 Suspense 경계로 전파
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold">4. Error Boundaries</p>
              <p className="text-gray-400">
                Promise가 reject되면 Error Boundary로 전파
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">use() vs useEffect for Data Fetching</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-red-400 mb-2">❌ useEffect Pattern (Old)</p>
              <pre className="text-xs text-gray-400 overflow-x-auto"><code>{`const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);

if (loading) return <Loading />;
if (error) return <Error />;
return <div>{data}</div>;`}</code></pre>
            </div>
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-green-400 mb-2">✓ use() Pattern (New)</p>
              <pre className="text-xs text-gray-400 overflow-x-auto"><code>{`const data = use(dataPromise);

return <div>{data}</div>;





// Suspense and Error Boundary
// handle loading and errors`}</code></pre>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Key Differences from Hooks</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Can be called conditionally</p>
              <p className="text-gray-400">if문, loop 내부에서 호출 가능</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Works with Suspense</p>
              <p className="text-gray-400">선언적 로딩 상태 관리</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Simpler code</p>
              <p className="text-gray-400">loading, error state를 수동으로 관리할 필요 없음</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold">⚠️ Requires Suspense setup</p>
              <p className="text-gray-400">Suspense와 Error Boundary 필요</p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-yellow-900/30 p-4 rounded border border-yellow-700">
        <h3 className="font-semibold mb-2 text-yellow-400">⚠️ Experimental API</h3>
        <p className="text-sm text-gray-300">
          use()는 실험적 API입니다. 이 데모는 개념을 설명하기 위한 시뮬레이션이며,
          실제 React 19+에서는 내장 use() 함수를 사용할 수 있습니다.
        </p>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>Promise와 Context를 읽을 수 있는 새로운 API</li>
          <li>Hooks와 달리 조건부 호출 가능</li>
          <li>Suspense와 함께 작동하여 로딩 처리</li>
          <li>Error Boundary와 통합되어 에러 처리</li>
          <li>더 간결하고 선언적인 데이터 로딩</li>
          <li>Server Components와 함께 사용하면 더욱 강력</li>
        </ul>
      </div>
    </div>
  )
}