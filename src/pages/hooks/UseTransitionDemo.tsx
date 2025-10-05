import { useState, useTransition } from 'react'

function SlowComponent({ filter }: { filter: string }) {
  const items = []
  for (let i = 0; i < 200; i++) {
    if (filter && !`Item ${i}`.toLowerCase().includes(filter.toLowerCase())) {
      continue
    }
    items.push(
      <div key={i} className="p-2 bg-gray-700 rounded mb-1">
        Item {i}
      </div>
    )
  }
  return <div className="max-h-64 overflow-y-auto">{items}</div>
}

export default function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition()
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('')

  const handleChange = (value: string) => {
    setInput(value)
    // Mark the filter update as a low-priority transition
    startTransition(() => {
      setFilter(value)
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useTransition</h2>
      <p className="text-gray-400">Marks state updates as non-urgent transitions</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">Filtered List with Transition</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded text-white mb-4"
          placeholder="Type to filter..."
        />
        {isPending && <p className="text-yellow-400 mb-2">Updating...</p>}
        <SlowComponent filter={filter} />
      </div>
    </div>
  )
}