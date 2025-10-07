import { useState } from 'react'

// Simulated cache function
function cache<T extends (...args: any[]) => any>(fn: T): T {
  const cached = new Map<string, any>()

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    if (cached.has(key)) {
      console.log('Cache hit:', key)
      return cached.get(key)
    }
    console.log('Cache miss, computing:', key)
    const result = fn(...args)
    cached.set(key, result)
    return result
  }) as T
}

// Example: expensive computation
const expensiveComputation = cache((n: number) => {
  let result = 0
  for (let i = 0; i < n * 1000000; i++) {
    result += i
  }
  return result
})


export default function CacheDemo() {
  const [number, setNumber] = useState(10)
  const [result, setResult] = useState<number | null>(null)
  const [computing, setComputing] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const handleCompute = () => {
    setComputing(true)
    const startTime = performance.now()
    const computed = expensiveComputation(number)
    const elapsed = (performance.now() - startTime).toFixed(2)
    setResult(computed)
    setComputing(false)
    setLogs(prev => [...prev.slice(-9), `Computed for ${number}: ${elapsed}ms`])
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">cache() (Experimental)</h1>
        <p className="text-gray-400 mb-6">
          cache() memoizes the result of a data fetch or computation, allowing multiple components
          to share the same cached data.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Cached Computation</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-300">Input (x1M iterations):</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                min="1"
                max="100"
                className="px-3 py-2 bg-gray-700 rounded w-24"
              />
            </div>

            <button
              onClick={handleCompute}
              disabled={computing}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded font-semibold"
            >
              {computing ? 'Computing...' : 'Compute'}
            </button>

            {result !== null && (
              <div className="bg-gray-900 p-4 rounded">
                <p className="text-green-400">Result: {result}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try clicking Compute again with the same number - it will be instant (cached)!
                </p>
              </div>
            )}

            <div className="bg-gray-900 p-4 rounded">
              <p className="text-sm font-semibold mb-2">Performance Logs:</p>
              <div className="space-y-1 text-xs font-mono text-green-400 max-h-40 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-gray-500">Click Compute to see performance</p>
                ) : (
                  logs.map((log, i) => <div key={i}>{log}</div>)
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`import { cache } from 'react';

// Cache expensive computation
const getUser = cache(async (userId) => {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
});

// Multiple components can call this without refetching
function UserProfile({ userId }) {
  const user = use(getUser(userId));
  return <div>{user.name}</div>;
}

function UserAvatar({ userId }) {
  const user = use(getUser(userId)); // Uses cached result!
  return <img src={user.avatar} />;
}
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">How It Works</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">1. First Call</p>
              <p className="text-gray-400">Function executes and result is cached</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">2. Subsequent Calls</p>
              <p className="text-gray-400">Returns cached result instantly (same args)</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold">3. Different Args</p>
              <p className="text-gray-400">New cache entry created for different arguments</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold">4. Per-Request Cache</p>
              <p className="text-gray-400">Cache is cleared between server requests (RSC)</p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-yellow-900/30 p-4 rounded border border-yellow-700">
        <h3 className="font-semibold mb-2 text-yellow-400">⚠️ Experimental API</h3>
        <p className="text-sm text-gray-300">
          cache() is an experimental React API designed for Server Components.
          This demo shows a client-side simulation for educational purposes.
        </p>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>Memoizes function results across components</li>
          <li>Designed for Server Components and data fetching</li>
          <li>Cache is per-request, not global</li>
          <li>Deduplicates identical requests automatically</li>
          <li>Works with async functions</li>
        </ul>
      </div>
    </div>
  )
}