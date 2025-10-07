import { useState, useEffect } from 'react'

export default function UseEffectDemo() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  // Run on every render
  useEffect(() => {
    document.title = `Count: ${count}`
  })

  // Run once on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    // Cleanup on unmount
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useEffect</h2>
      <p className="text-gray-400">Performs side effects in function components</p>

      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">Document Title Update</h3>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Increment (check tab title): {count}
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">Clock (with cleanup)</h3>
          <p className="text-2xl font-mono">{time}</p>
        </div>
      </div>
    </div>
  )
}
