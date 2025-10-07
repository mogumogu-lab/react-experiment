import { useState, useEffect } from 'react'

export default function ActivityDemo() {
  const [isActive, setIsActive] = useState(false)
  const [activityLog, setActivityLog] = useState<string[]>([])

  // Simulate activity tracking
  useEffect(() => {
    if (isActive) {
      const startTime = Date.now()
      const interval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
        setActivityLog(prev => [...prev.slice(-9), `Active for ${elapsed}s`])
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isActive])

  const handleToggle = () => {
    const action = !isActive ? 'started' : 'stopped'
    setActivityLog(prev => [...prev, `Activity ${action} at ${new Date().toLocaleTimeString()}`])
    setIsActive(!isActive)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Activity (Experimental)</h1>
        <p className="text-gray-400 mb-6">
          Activity is an experimental API to track component activity and interactions.
          This demo simulates activity tracking behavior.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Activity Status</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
              <span className="text-lg">
                Status: <span className={isActive ? 'text-green-400' : 'text-gray-400'}>
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </span>
            </div>

            <button
              onClick={handleToggle}
              className={`px-6 py-2 rounded font-semibold ${
                isActive
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isActive ? 'Stop Activity' : 'Start Activity'}
            </button>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Activity Log</h2>
          <div className="bg-gray-900 p-4 rounded font-mono text-sm space-y-1 max-h-64 overflow-y-auto">
            {activityLog.length === 0 ? (
              <p className="text-gray-500">No activity logged yet. Start activity to see logs.</p>
            ) : (
              activityLog.map((log, i) => (
                <div key={i} className="text-green-400">{log}</div>
              ))
            )}
          </div>
          <button
            onClick={() => setActivityLog([])}
            className="mt-4 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Clear Log
          </button>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Use Cases</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">User Interaction Tracking</p>
              <p className="text-gray-400">Monitor user engagement with components</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">Performance Monitoring</p>
              <p className="text-gray-400">Track component lifecycle and activity patterns</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">Analytics Integration</p>
              <p className="text-gray-400">Send activity data to analytics services</p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-yellow-900/30 p-4 rounded border border-yellow-700">
        <h3 className="font-semibold mb-2 text-yellow-400">⚠️ Experimental API</h3>
        <p className="text-sm text-gray-300">
          Activity is an experimental React API and may change in future versions.
          This demo shows a simulated implementation for educational purposes.
        </p>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>Experimental API for tracking component activity</li>
          <li>Can be used for analytics and monitoring</li>
          <li>Helps understand user interaction patterns</li>
          <li>API may change - use with caution in production</li>
        </ul>
      </div>
    </div>
  )
}