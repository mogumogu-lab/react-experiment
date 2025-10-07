import { Profiler, useState, type ProfilerOnRenderCallback } from 'react'

export default function ProfilerDemo() {
  const [count, setCount] = useState(0)
  const [slowCount, setSlowCount] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  // Profiler callback
  const onRenderCallback: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration
  ) => {
    const log = `[${id}] ${phase}: ${actualDuration.toFixed(2)}ms (base: ${baseDuration.toFixed(2)}ms)`
    setLogs(prev => [...prev.slice(-9), log]) // Keep last 10 logs
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Profiler</h1>
        <p className="text-gray-400 mb-6">
          Profiler measures the rendering performance of a React tree programmatically.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Fast Component</h2>
          <Profiler id="fast-component" onRender={onRenderCallback}>
            <div className="space-y-4">
              <p className="text-gray-300">Count: {count}</p>
              <button
                onClick={() => setCount(c => c + 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Increment Fast
              </button>
            </div>
          </Profiler>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Slow Component</h2>
          <Profiler id="slow-component" onRender={onRenderCallback}>
            <div className="space-y-4">
              <SlowComponent count={slowCount} />
              <button
                onClick={() => setSlowCount(c => c + 1)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Increment Slow
              </button>
            </div>
          </Profiler>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Performance Logs</h2>
          <div className="bg-gray-900 p-4 rounded font-mono text-sm space-y-1 max-h-64 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">Click buttons above to see render times...</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-green-400">{log}</div>
              ))
            )}
          </div>
          <button
            onClick={() => setLogs([])}
            className="mt-4 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Clear Logs
          </button>
        </section>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>Profiler measures render time of components</li>
          <li>onRender callback receives timing information</li>
          <li>phase can be "mount" or "update"</li>
          <li>actualDuration: time spent rendering this update</li>
          <li>baseDuration: estimated time to render entire tree without memoization</li>
          <li>Use in development to identify performance bottlenecks</li>
        </ul>
      </div>
    </div>
  )
}

// Simulates a slow component
function SlowComponent({ count }: { count: number }) {
  // Artificial delay
  const startTime = performance.now()
  while (performance.now() - startTime < 100) {
    // Busy wait for 100ms
  }

  return (
    <div className="text-gray-300">
      <p>Slow Count: {count}</p>
      <p className="text-sm text-red-400">(This component has artificial 100ms delay)</p>
    </div>
  )
}