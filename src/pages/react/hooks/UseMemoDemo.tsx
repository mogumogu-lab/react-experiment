import { useState, useMemo } from 'react'

function expensiveCalculation(num: number) {
  console.log('Calculating...')
  let result = 0
  for (let i = 0; i < 1000000000; i++) {
    result += num
  }
  return result
}

export default function UseMemoDemo() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  // Memoized expensive calculation - only recalculates when count changes
  const expensiveResult = useMemo(() => expensiveCalculation(count), [count])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useMemo</h2>
      <p className="text-gray-400">Memoizes expensive computation results</p>

      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">Expensive Calculation</h3>
          <p className="mb-2">Count: {count}</p>
          <p className="mb-4 text-green-400">Result: {expensiveResult}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Increment (triggers calculation)
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">Other State</h3>
          <p className="mb-4">Other: {other}</p>
          <button
            onClick={() => setOther(other + 1)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
          >
            Increment (doesn't trigger calculation)
          </button>
        </div>

        <p className="text-sm text-gray-500">Check console - calculation only runs when count changes</p>
      </div>
    </div>
  )
}