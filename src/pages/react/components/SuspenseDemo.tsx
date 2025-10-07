import { Suspense, useState, lazy } from 'react'

// Lazy load a component
const LazyComponent = lazy(() => {
  return new Promise<{ default: React.ComponentType }>(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="p-6 bg-green-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Lazy Loaded Component</h3>
            <p className="text-gray-300">This component was loaded after a 2 second delay!</p>
          </div>
        )
      })
    }, 2000)
  })
})

export default function SuspenseDemo() {
  const [showLazy, setShowLazy] = useState(false)
  const [showData, setShowData] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Suspense</h1>
        <p className="text-gray-400 mb-6">
          Suspense lets you display a fallback until its children have finished loading.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Lazy Loading Components</h2>
          <div className="space-y-4">
            <button
              onClick={() => setShowLazy(true)}
              disabled={showLazy}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded"
            >
              Load Lazy Component
            </button>

            {showLazy && (
              <Suspense fallback={<LoadingFallback message="Loading component..." />}>
                <LazyComponent />
              </Suspense>
            )}
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Loading Data</h2>
          <div className="space-y-4">
            <button
              onClick={() => setShowData(true)}
              disabled={showData}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded"
            >
              Fetch Data
            </button>

            {showData && (
              <Suspense fallback={<LoadingFallback message="Fetching data..." />}>
                <DataComponent />
              </Suspense>
            )}
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Nested Suspense</h2>
          <Suspense fallback={<LoadingFallback message="Loading outer content..." />}>
            <div className="space-y-4">
              <div className="p-4 bg-blue-900/50 rounded">
                <p className="font-semibold">Outer Content Loaded</p>
              </div>
              <Suspense fallback={<LoadingFallback message="Loading inner content..." />}>
                <NestedContent />
              </Suspense>
            </div>
          </Suspense>
        </section>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>Suspense shows fallback while children are loading</li>
          <li>Works with lazy() for code splitting</li>
          <li>Can wrap data fetching components (with frameworks like Next.js)</li>
          <li>Supports nested Suspense boundaries</li>
          <li>Closest Suspense boundary catches the suspension</li>
          <li>Fallback is shown during the loading state</li>
        </ul>
      </div>
    </div>
  )
}

function LoadingFallback({ message }: { message: string }) {
  return (
    <div className="p-6 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  )
}

function DataComponent() {
  // Simulate data fetching with a promise that resolves after 1.5 seconds
  const data = use(fetchData())

  return (
    <div className="p-6 bg-purple-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Data Loaded</h3>
      <pre className="text-sm text-gray-300">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

function NestedContent() {
  use(fetchData(1000))

  return (
    <div className="p-4 bg-green-900/50 rounded">
      <p className="font-semibold">Inner Content Loaded</p>
      <p className="text-sm text-gray-400">Nested suspense boundary</p>
    </div>
  )
}

// Simple use() implementation for demo
interface PromiseWithState<T> extends Promise<T> {
  status?: 'pending' | 'fulfilled' | 'rejected'
  value?: T
  reason?: any
}

function use<T>(promise: Promise<T>): T {
  const p = promise as PromiseWithState<T>
  // This is a simplified version - React's actual use() is more complex
  if (p.status === 'fulfilled') {
    return p.value!
  } else if (p.status === 'rejected') {
    throw p.reason
  } else if (p.status === 'pending') {
    throw promise
  } else {
    p.status = 'pending';
    promise.then(
      (value) => {
        p.status = 'fulfilled'
        p.value = value
      },
      (reason) => {
        p.status = 'rejected'
        p.reason = reason
      }
    )
    throw promise
  }
}

// Simulate data fetching
let cache = new Map<number, Promise<any>>()

function fetchData(delay: number = 1500) {
  if (!cache.has(delay)) {
    cache.set(
      delay,
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            id: Math.random().toString(36).substring(2, 11),
            timestamp: new Date().toISOString(),
            message: `Data loaded after ${delay}ms`
          })
        }, delay)
      })
    )
  }
  return cache.get(delay)!
}