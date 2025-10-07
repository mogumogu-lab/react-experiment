import { useReducer } from 'react'

type State = { count: number }
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useReducer</h2>
      <p className="text-gray-400">Manages complex state logic with actions</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">Counter with Actions</h3>
        <p className="text-2xl mb-4">Count: {state.count}</p>
        <div className="space-x-2">
          <button
            onClick={() => dispatch({ type: 'increment' })}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch({ type: 'decrement' })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            Decrement
          </button>
          <button
            onClick={() => dispatch({ type: 'reset' })}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}