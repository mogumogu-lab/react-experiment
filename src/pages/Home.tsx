import { Link } from 'react-router-dom'

const hooks = [
  { name: 'useActionState', path: '/hooks/use-action-state', description: 'Manage form actions' },
  { name: 'useCallback', path: '/hooks/use-callback', description: 'Memoize callback functions' },
  { name: 'useContext', path: '/hooks/use-context', description: 'Share data across components' },
  { name: 'useDebugValue', path: '/hooks/use-debug-value', description: 'Label custom hooks in DevTools' },
  { name: 'useDeferredValue', path: '/hooks/use-deferred-value', description: 'Defer non-urgent updates' },
  { name: 'useEffect', path: '/hooks/use-effect', description: 'Perform side effects' },
  { name: 'useId', path: '/hooks/use-id', description: 'Generate unique IDs' },
  { name: 'useImperativeHandle', path: '/hooks/use-imperative-handle', description: 'Customize ref exposure' },
  { name: 'useInsertionEffect', path: '/hooks/use-insertion-effect', description: 'Insert styles before layout' },
  { name: 'useLayoutEffect', path: '/hooks/use-layout-effect', description: 'Synchronous effects' },
  { name: 'useMemo', path: '/hooks/use-memo', description: 'Memoize computed values' },
  { name: 'useOptimistic', path: '/hooks/use-optimistic', description: 'Optimistic UI updates' },
  { name: 'useReducer', path: '/hooks/use-reducer', description: 'Manage complex state logic' },
  { name: 'useRef', path: '/hooks/use-ref', description: 'Persist values & access DOM' },
  { name: 'useState', path: '/hooks/use-state', description: 'Manage component state' },
  { name: 'useSyncExternalStore', path: '/hooks/use-sync-external-store', description: 'Subscribe to external stores' },
  { name: 'useTransition', path: '/hooks/use-transition', description: 'Mark updates as transitions' },
]

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">React Hooks API Lab</h1>
        <p className="text-gray-400">Test React Hooks from the official documentation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hooks.map((hook) => (
          <Link
            key={hook.path}
            to={hook.path}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">{hook.name}</h3>
            <p className="text-sm text-gray-400">{hook.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}