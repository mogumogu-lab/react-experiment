import { StrictMode, useState, useEffect } from 'react'

export default function StrictModeDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">StrictMode</h1>
        <p className="text-gray-400 mb-6">
          StrictMode enables additional development behaviors and warnings for its descendants.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Without StrictMode</h2>
          <ComponentWithEffects label="Regular" />
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">With StrictMode</h2>
          <p className="text-sm text-yellow-400 mb-4">
            In development, effects run twice to help find bugs
          </p>
          <StrictMode>
            <ComponentWithEffects label="Strict" />
          </StrictMode>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">What StrictMode Does</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Re-renders components twice (development only)</p>
              <p className="text-gray-400">Helps find bugs caused by impure rendering</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Re-runs effects twice (development only)</p>
              <p className="text-gray-400">Ensures cleanup functions work correctly</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Checks for deprecated APIs</p>
              <p className="text-gray-400">Warns about legacy React features</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Detects unexpected side effects</p>
              <p className="text-gray-400">Highlights potential issues in development</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Example: Effect Cleanup</h2>
          <StrictMode>
            <EffectCleanupExample />
          </StrictMode>
        </section>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>StrictMode is development-only (no effect in production)</li>
          <li>Helps catch bugs early by running code twice</li>
          <li>Encourages proper cleanup in useEffect</li>
          <li>Can be applied to entire app or specific components</li>
          <li>All effects run → cleanup → effects run again (in dev)</li>
        </ul>
      </div>
    </div>
  )
}

function ComponentWithEffects({ label }: { label: string }) {
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const log = `${label}: Effect ran at ${new Date().toLocaleTimeString()}`
    setLogs(prev => [...prev, log])

    return () => {
      const cleanupLog = `${label}: Cleanup at ${new Date().toLocaleTimeString()}`
      console.log(cleanupLog)
    }
  }, [label])

  return (
    <div className="space-y-4">
      <div>
        <p className="text-gray-300 mb-2">Count: {count}</p>
        <button
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Increment
        </button>
      </div>
      <div className="bg-gray-900 p-3 rounded">
        <p className="text-sm font-semibold mb-2">Effect Logs:</p>
        <div className="space-y-1 text-xs font-mono text-green-400">
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EffectCleanupExample() {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    console.log('Setting up connection...')
    // Simulate connection setup
    const connection = { status: 'connected' }

    return () => {
      console.log('Cleaning up connection...')
      // Cleanup runs before re-running effect
      connection.status = 'disconnected'
    }
  }, [])

  return (
    <div className="space-y-4">
      <p className="text-gray-300">
        Online Status: <span className={online ? 'text-green-400' : 'text-red-400'}>
          {online ? '🟢 Online' : '🔴 Offline'}
        </span>
      </p>
      <button
        onClick={() => setOnline(!online)}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
      >
        Toggle Status
      </button>
      <p className="text-sm text-gray-400">Check console to see setup/cleanup logs</p>
    </div>
  )
}