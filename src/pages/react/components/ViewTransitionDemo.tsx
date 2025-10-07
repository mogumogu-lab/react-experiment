import { useState } from 'react'

export default function ViewTransitionDemo() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [items] = useState([
    { id: 1, title: 'Item 1', color: 'bg-red-600', description: 'First item description' },
    { id: 2, title: 'Item 2', color: 'bg-blue-600', description: 'Second item description' },
    { id: 3, title: 'Item 3', color: 'bg-green-600', description: 'Third item description' },
    { id: 4, title: 'Item 4', color: 'bg-yellow-600', description: 'Fourth item description' },
    { id: 5, title: 'Item 5', color: 'bg-purple-600', description: 'Fifth item description' },
    { id: 6, title: 'Item 6', color: 'bg-pink-600', description: 'Sixth item description' },
  ])

  const handleViewChange = (newView: 'grid' | 'list') => {
    // Check if View Transitions API is supported
    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setView(newView)
      })
    } else {
      setView(newView)
    }
  }

  const handleItemClick = (id: number) => {
    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setSelectedItem(selectedItem === id ? null : id)
      })
    } else {
      setSelectedItem(selectedItem === id ? null : id)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">ViewTransition (Experimental)</h1>
        <p className="text-gray-400 mb-6">
          ViewTransition provides smooth animated transitions between different views.
          This uses the View Transitions API with React state changes.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">View Toggle</h2>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleViewChange('grid')}
              className={`px-4 py-2 rounded ${
                view === 'grid'
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => handleViewChange('list')}
              className={`px-4 py-2 rounded ${
                view === 'list'
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              List View
            </button>
          </div>

          <div className={
            view === 'grid'
              ? 'grid grid-cols-3 gap-4'
              : 'space-y-3'
          }>
            {items.map(item => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`${item.color} p-6 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                  selectedItem === item.id ? 'ring-4 ring-white' : ''
                }`}
                style={{
                  viewTransitionName: `item-${item.id}`
                } as any}
              >
                <h3 className="font-bold text-lg">{item.title}</h3>
                {selectedItem === item.id && (
                  <p className="text-sm mt-2">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Browser Support</h2>
          <div className="space-y-2">
            <p className="text-gray-300">
              View Transitions API Support:{' '}
              <span className={'startViewTransition' in document ? 'text-green-400' : 'text-red-400'}>
                {'startViewTransition' in document ? '✓ Supported' : '✗ Not Supported'}
              </span>
            </p>
            {!('startViewTransition' in document) && (
              <p className="text-sm text-yellow-400">
                Your browser doesn't support View Transitions API. Transitions will be instant.
              </p>
            )}
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">How It Works</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">1. Capture Old State</p>
              <p className="text-gray-400">Browser takes screenshot of current view</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">2. Update DOM</p>
              <p className="text-gray-400">React updates state and re-renders</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">3. Capture New State</p>
              <p className="text-gray-400">Browser takes screenshot of new view</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">4. Animate Transition</p>
              <p className="text-gray-400">Browser animates between old and new states</p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-yellow-900/30 p-4 rounded border border-yellow-700">
        <h3 className="font-semibold mb-2 text-yellow-400">⚠️ Experimental Feature</h3>
        <p className="text-sm text-gray-300">
          View Transitions API is experimental and not yet part of stable React.
          Browser support is limited. Check compatibility before using in production.
        </p>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>Provides smooth animations between view states</li>
          <li>Uses browser's View Transitions API</li>
          <li>Requires view-transition-name CSS property</li>
          <li>Automatically handles animation timing and easing</li>
          <li>Falls back to instant transitions if not supported</li>
          <li>Great for SPA navigation and layout changes</li>
        </ul>
      </div>
    </div>
  )
}