import { useState, useCallback, memo, useRef } from 'react'

// Memoized child component with render counter
const Button = memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  const renderCount = useRef(0)
  renderCount.current++
  console.log(`Button "${label}" rendered (${renderCount.current} times)`)

  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
    >
      {label}
      <span className="ml-2 text-xs opacity-60">({renderCount.current})</span>
    </button>
  )
})

export default function UseCallbackDemo() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  // Without useCallback - recreated on every render
  const handleIncrement1 = () => setCount1(count1 + 1)

  // With useCallback - stable reference across renders
  const handleIncrement2 = useCallback(() => {
    setCount2(prev => prev + 1)
  }, [])

  console.log('Parent component rendered')

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useCallback</h2>
      <p className="text-gray-400">Memoizes callback functions to prevent unnecessary re-renders</p>

      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">Without useCallback</h3>
          <p className="mb-2">Count: {count1}</p>
          <Button onClick={handleIncrement1} label="Increment (re-renders every time)" />
          <p className="mt-2 text-sm text-gray-500">
            👆 Clicking this button will also re-render the button below
          </p>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">With useCallback</h3>
          <p className="mb-2">Count: {count2}</p>
          <Button onClick={handleIncrement2} label="Increment (memoized)" />
          <p className="mt-2 text-sm text-gray-500">
            👆 Clicking this button will NOT re-render the button above
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Number next to button = render count | Also check console
        </p>
      </div>
    </div>
  )
}