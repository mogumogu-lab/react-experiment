import { useState, useDeferredValue } from 'react'

function SlowList({ text }: { text: string }) {
  const items = []
  for (let i = 0; i < 500; i++) {
    // Simulate heavy computation for each item (intentional lag)
    const startTime = performance.now()
    while (performance.now() - startTime < 0.2) {
      // Block for 0.2ms per item = 100ms total
    }

    items.push(
      <div key={i} className="p-2 bg-gray-700 rounded mb-1">
        {text} - Item {i}
      </div>
    )
  }
  return <div className="max-h-64 overflow-y-auto">{items}</div>
}

export default function UseDeferredValueDemo() {
  // Separate states for clear comparison
  const [textWithDeferred, setTextWithDeferred] = useState('')
  const deferredText = useDeferredValue(textWithDeferred)
  const [textWithout, setTextWithout] = useState('')

  // Check if the deferred value is lagging behind
  const isStale = textWithDeferred !== deferredText

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useDeferredValue</h2>
      <p className="text-gray-400">Defers updating non-urgent parts of the UI</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WITH useDeferredValue */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-4">✅ With useDeferredValue</h3>
          <input
            type="text"
            value={textWithDeferred}
            onChange={(e) => setTextWithDeferred(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded text-white mb-2"
            placeholder="Type fast here..."
          />
          <div className="flex gap-2 mb-2 text-sm">
            <span className="text-green-400">Input: {textWithDeferred}</span>
            <span className="text-blue-400">List: {deferredText}</span>
            {isStale && <span className="text-yellow-400">⏳ Updating...</span>}
          </div>
          <p className="text-xs text-gray-400 mb-2">
            ⚡ Input responds immediately, list updates are deferred
          </p>
          <div className={isStale ? 'opacity-50' : ''}>
            <SlowList text={deferredText} />
          </div>
        </div>

        {/* WITHOUT useDeferredValue (comparison) */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-4">❌ Without useDeferredValue</h3>
          <input
            type="text"
            value={textWithout}
            onChange={(e) => setTextWithout(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded text-white mb-2"
            placeholder="Type fast here too..."
          />
          <div className="text-sm text-red-400 mb-2">
            Input: {textWithout}
          </div>
          <p className="text-xs text-gray-400 mb-2">
            🐌 Input also lags (blocked by slow rendering)
          </p>
          <SlowList text={textWithout} />
        </div>
      </div>

      <div className="p-4 bg-blue-900/30 border border-blue-500 rounded">
        <h4 className="font-bold mb-2">🧪 How to test:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li><strong>Left input</strong>: Type "abcdefghijk" rapidly → smooth, responsive typing</li>
          <li><strong>Right input</strong>: Type "abcdefghijk" rapidly → laggy, each keystroke feels delayed</li>
          <li>Focus on <strong>typing experience</strong>, not list update speed</li>
          <li>On the left, "Input" and "List" values will differ during typing (batched updates)</li>
        </ol>
        <p className="text-xs text-gray-400 mt-2">
          💡 <strong>Key difference:</strong> Left keeps input responsive by deferring list updates.
          Right blocks input until list finishes rendering.
          useDeferredValue ≠ debounce (time-based) — it's React's automatic priority management.
        </p>
      </div>
    </div>
  )
}