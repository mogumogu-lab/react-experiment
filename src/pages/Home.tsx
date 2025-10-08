import { Link } from 'react-router-dom'

const apiSections = [
  {
    category: 'React',
    color: 'blue',
    sections: [
      {
        title: 'Hooks',
        items: [
          { name: 'useActionState', path: '/react/hooks/use-action-state', description: 'Manage form actions' },
          { name: 'useCallback', path: '/react/hooks/use-callback', description: 'Memoize callback functions' },
          { name: 'useContext', path: '/react/hooks/use-context', description: 'Share data across components' },
          { name: 'useDebugValue', path: '/react/hooks/use-debug-value', description: 'Label custom hooks in DevTools' },
          { name: 'useDeferredValue', path: '/react/hooks/use-deferred-value', description: 'Defer non-urgent updates' },
          { name: 'useEffect', path: '/react/hooks/use-effect', description: 'Perform side effects' },
          { name: 'useId', path: '/react/hooks/use-id', description: 'Generate unique IDs' },
          { name: 'useImperativeHandle', path: '/react/hooks/use-imperative-handle', description: 'Customize ref exposure' },
          { name: 'useInsertionEffect', path: '/react/hooks/use-insertion-effect', description: 'Insert styles before layout' },
          { name: 'useLayoutEffect', path: '/react/hooks/use-layout-effect', description: 'Synchronous effects' },
          { name: 'useMemo', path: '/react/hooks/use-memo', description: 'Memoize computed values' },
          { name: 'useOptimistic', path: '/react/hooks/use-optimistic', description: 'Optimistic UI updates' },
          { name: 'useReducer', path: '/react/hooks/use-reducer', description: 'Manage complex state logic' },
          { name: 'useRef', path: '/react/hooks/use-ref', description: 'Persist values & access DOM' },
          { name: 'useState', path: '/react/hooks/use-state', description: 'Manage component state' },
          { name: 'useSyncExternalStore', path: '/react/hooks/use-sync-external-store', description: 'Subscribe to external stores' },
          { name: 'useTransition', path: '/react/hooks/use-transition', description: 'Mark updates as transitions' },
        ]
      },
      {
        title: 'Components',
        items: [
          { name: 'Fragment (<>)', path: '/react/components/fragment', description: 'Group elements without wrapper' },
          { name: 'Profiler', path: '/react/components/profiler', description: 'Measure rendering performance' },
          { name: 'StrictMode', path: '/react/components/strict-mode', description: 'Enable development checks' },
          { name: 'Suspense', path: '/react/components/suspense', description: 'Display fallback while loading' },
          { name: 'Activity', path: '/react/components/activity', description: 'Track component activity' },
          { name: 'ViewTransition', path: '/react/components/view-transition', description: 'Smooth view transitions' },
        ]
      },
      {
        title: 'APIs',
        items: [
          { name: 'act', path: '/react/apis/act', description: 'Flush effects in tests' },
          { name: 'cache', path: '/react/apis/cache', description: 'Cache function results' },
          { name: 'captureOwnerStack', path: '/react/apis/capture-owner-stack', description: 'Capture component stack' },
          { name: 'createContext', path: '/react/apis/create-context', description: 'Create context object' },
          { name: 'lazy', path: '/react/apis/lazy', description: 'Lazy load components' },
          { name: 'memo', path: '/react/apis/memo', description: 'Memoize components' },
          { name: 'startTransition', path: '/react/apis/start-transition', description: 'Mark updates as non-urgent' },
          { name: 'use', path: '/react/apis/use', description: 'Read resource value' },
          { name: 'experimental_taintObjectReference', path: '/react/apis/experimental-taint-object-reference', description: 'Prevent object from being passed to Client' },
          { name: 'experimental_taintUniqueValue', path: '/react/apis/experimental-taint-unique-value', description: 'Prevent unique value from being passed to Client' },
          { name: 'unstable_addTransitionType', path: '/react/apis/unstable-add-transition-type', description: 'Add custom transition types' },
        ]
      }
    ]
  },
  {
    category: 'React-DOM',
    color: 'green',
    sections: [
      {
        title: 'Hooks',
        items: [
          { name: 'useFormStatus', path: '/react-dom/hooks/use-form-status', description: 'Get form submission status' },
        ]
      },
      {
        title: 'Components',
        items: [
          { name: '<div>', path: '/react-dom/components/div', description: 'Basic container element' },
          { name: '<form>', path: '/react-dom/components/form', description: 'Form element' },
          { name: '<input>', path: '/react-dom/components/input', description: 'Input element' },
          { name: '<option>', path: '/react-dom/components/option', description: 'Option element for select' },
          { name: '<progress>', path: '/react-dom/components/progress', description: 'Progress bar element' },
          { name: '<select>', path: '/react-dom/components/select', description: 'Select dropdown element' },
          { name: '<textarea>', path: '/react-dom/components/textarea', description: 'Multi-line text input' },
          { name: '<link>', path: '/react-dom/components/link', description: 'External resource link' },
          { name: '<meta>', path: '/react-dom/components/meta', description: 'Metadata element' },
          { name: '<script>', path: '/react-dom/components/script', description: 'Script element' },
          { name: '<style>', path: '/react-dom/components/style', description: 'Style element' },
          { name: '<title>', path: '/react-dom/components/title', description: 'Document title element' },
        ]
      },
      {
        title: 'API',
        items: [
          { name: 'createPortal', path: '/react-dom/api/create-portal', description: 'Render outside parent hierarchy' },
          { name: 'flushSync', path: '/react-dom/api/flush-sync', description: 'Force synchronous updates' },
          { name: 'preconnect', path: '/react-dom/api/resource-hints', description: 'Preconnect to server' },
          { name: 'prefetchDNS', path: '/react-dom/api/resource-hints', description: 'Prefetch DNS lookup' },
          { name: 'preinit', path: '/react-dom/api/resource-hints', description: 'Preinit resources' },
          { name: 'preinitModule', path: '/react-dom/api/resource-hints', description: 'Preinit ES modules' },
          { name: 'preload', path: '/react-dom/api/resource-hints', description: 'Preload resources' },
          { name: 'preloadModule', path: '/react-dom/api/resource-hints', description: 'Preload ES modules' },
        ]
      },
      {
        title: 'Client API',
        items: [
          { name: 'createRoot', path: '/react-dom/client/create-root', description: 'Create React root' },
          { name: 'hydrateRoot', path: '/react-dom/client/hydrate-root', description: 'Hydrate server HTML' },
        ]
      },
      {
        title: 'Server API',
        items: [
          { name: 'renderToString', path: '/react-dom/server/server-apis', description: 'Render to HTML string' },
          { name: 'renderToStaticMarkup', path: '/react-dom/server/server-apis', description: 'Render to static HTML' },
          { name: 'renderToPipeableStream', path: '/react-dom/server/server-apis', description: 'Stream render (Node.js)' },
          { name: 'renderToReadableStream', path: '/react-dom/server/server-apis', description: 'Stream render (Web)' },
        ]
      },
      {
        title: 'Static API',
        items: [
          { name: 'prerender', path: '/react-dom/static/prerender', description: 'Prerender to static HTML' },
          { name: 'prerenderToNodeStream', path: '/react-dom/static/prerender-to-node-stream', description: 'Stream prerender' },
        ]
      }
    ]
  }
]

export default function Home() {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">React & React-DOM Lab</h1>
        <p className="text-gray-400">React와 React-DOM API 실험 공간</p>
      </div>

      {apiSections.map((category) => (
        <div key={category.category} className="space-y-8">
          <h2 className={`text-3xl font-bold text-${category.color}-400 border-b-2 border-${category.color}-600 pb-3`}>
            {category.category}
          </h2>

          {category.sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-300 pl-4 border-l-4 border-gray-600">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 hover:border-gray-600"
                  >
                    <h4 className={`text-xl font-semibold text-${category.color}-400 mb-2`}>{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}