import { useState, useDebugValue } from 'react'

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  // This value shows in React DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline')

  return { isOnline, setIsOnline }
}

export default function UseDebugValueDemo() {
  const { isOnline, setIsOnline } = useOnlineStatus()

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useDebugValue</h2>
      <p className="text-gray-400">Adds a label to custom hooks in React DevTools</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">Online Status (Check React DevTools)</h3>
        <p className="mb-4">
          Status:{' '}
          <span className={isOnline ? 'text-green-400' : 'text-red-400'}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </p>
        <button
          onClick={() => setIsOnline(!isOnline)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          Toggle Status
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Open React DevTools to see the debug value for useOnlineStatus hook
        </p>
      </div>
    </div>
  )
}