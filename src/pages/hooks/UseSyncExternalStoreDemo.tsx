import { useSyncExternalStore } from 'react'

// External store (outside React)
let listeners: (() => void)[] = []
let state = { count: 0 }

const store = {
  subscribe(listener: () => void) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  getSnapshot() {
    return state
  },
  increment() {
    state = { count: state.count + 1 }
    listeners.forEach((listener) => listener())
  },
}

export default function UseSyncExternalStoreDemo() {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useSyncExternalStore</h2>
      <p className="text-gray-400">Subscribes to external data stores</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">External Store Counter</h3>
        <p className="text-2xl mb-4">Count: {state.count}</p>
        <button
          onClick={() => store.increment()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          Increment External Store
        </button>
        <p className="text-sm text-gray-500 mt-4">
          State is managed outside React and synced via useSyncExternalStore
        </p>
      </div>
    </div>
  )
}