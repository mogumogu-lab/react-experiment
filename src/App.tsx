import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">React API Experiment</h1>
        <p className="text-gray-400 mb-8">Experimenting with React APIs from the documentation</p>

        <div className="p-6 bg-gray-800 rounded-lg">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            count is {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
