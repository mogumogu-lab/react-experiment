import { useRef, useState } from 'react'

export default function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  const countRef = useRef(0)
  const [renderCount, setRenderCount] = useState(0)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const incrementRef = () => {
    countRef.current += 1
    console.log('Ref count:', countRef.current)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useRef</h2>
      <p className="text-gray-400">Persists values without causing re-renders & accesses DOM elements</p>

      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">DOM Reference</h3>
          <input
            ref={inputRef}
            type="text"
            className="px-3 py-2 bg-gray-700 rounded text-white mr-2"
            placeholder="Input field"
          />
          <button
            onClick={focusInput}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Focus Input
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">Persistent Value (no re-render)</h3>
          <p className="mb-2">Ref count: {countRef.current} (check console)</p>
          <p className="mb-4 text-gray-400">Render count: {renderCount}</p>
          <div className="space-x-2">
            <button
              onClick={incrementRef}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
            >
              Increment Ref (no re-render)
            </button>
            <button
              onClick={() => setRenderCount(renderCount + 1)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
            >
              Force Re-render
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}