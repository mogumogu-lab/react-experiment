import { useState, useDeferredValue } from 'react'

function SlowList({ text }: { text: string }) {
  const items = []
  for (let i = 0; i < 100; i++) {
    items.push(
      <div key={i} className="p-2 bg-gray-700 rounded mb-1">
        {text} - Item {i}
      </div>
    )
  }
  return <div className="max-h-64 overflow-y-auto">{items}</div>
}

export default function UseDeferredValueDemo() {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useDeferredValue</h2>
      <p className="text-gray-400">Defers updating non-urgent parts of the UI</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">Search Filter (Deferred)</h3>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded text-white mb-4"
          placeholder="Type to filter..."
        />
        <p className="text-sm text-gray-400 mb-2">
          Input stays responsive while list updates are deferred
        </p>
        <SlowList text={deferredText} />
      </div>
    </div>
  )
}