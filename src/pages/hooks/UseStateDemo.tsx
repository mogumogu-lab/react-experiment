import { useState } from 'react'

export default function UseStateDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useState</h2>
      <p className="text-gray-400">Manages component state</p>

      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">Counter</h3>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Count: {count}
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">Text Input</h3>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="px-3 py-2 bg-gray-700 rounded text-white"
            placeholder="Type something..."
          />
          <p className="mt-2 text-gray-400">You typed: {text}</p>
        </div>
      </div>
    </div>
  )
}
