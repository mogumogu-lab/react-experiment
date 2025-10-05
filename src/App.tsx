import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import UseActionStateDemo from './pages/hooks/UseActionStateDemo'
import UseCallbackDemo from './pages/hooks/UseCallbackDemo'
import UseContextDemo from './pages/hooks/UseContextDemo'
import UseDebugValueDemo from './pages/hooks/UseDebugValueDemo'
import UseDeferredValueDemo from './pages/hooks/UseDeferredValueDemo'
import UseEffectDemo from './pages/hooks/UseEffectDemo'
import UseIdDemo from './pages/hooks/UseIdDemo'
import UseImperativeHandleDemo from './pages/hooks/UseImperativeHandleDemo'
import UseInsertionEffectDemo from './pages/hooks/UseInsertionEffectDemo'
import UseLayoutEffectDemo from './pages/hooks/UseLayoutEffectDemo'
import UseMemoDemo from './pages/hooks/UseMemoDemo'
import UseOptimisticDemo from './pages/hooks/UseOptimisticDemo'
import UseReducerDemo from './pages/hooks/UseReducerDemo'
import UseRefDemo from './pages/hooks/UseRefDemo'
import UseStateDemo from './pages/hooks/UseStateDemo'
import UseSyncExternalStoreDemo from './pages/hooks/UseSyncExternalStoreDemo'
import UseTransitionDemo from './pages/hooks/UseTransitionDemo'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
            React Hooks Lab
          </Link>
        </nav>

        <main className="max-w-7xl mx-auto p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hooks/use-action-state" element={<UseActionStateDemo />} />
            <Route path="/hooks/use-callback" element={<UseCallbackDemo />} />
            <Route path="/hooks/use-context" element={<UseContextDemo />} />
            <Route path="/hooks/use-debug-value" element={<UseDebugValueDemo />} />
            <Route path="/hooks/use-deferred-value" element={<UseDeferredValueDemo />} />
            <Route path="/hooks/use-effect" element={<UseEffectDemo />} />
            <Route path="/hooks/use-id" element={<UseIdDemo />} />
            <Route path="/hooks/use-imperative-handle" element={<UseImperativeHandleDemo />} />
            <Route path="/hooks/use-insertion-effect" element={<UseInsertionEffectDemo />} />
            <Route path="/hooks/use-layout-effect" element={<UseLayoutEffectDemo />} />
            <Route path="/hooks/use-memo" element={<UseMemoDemo />} />
            <Route path="/hooks/use-optimistic" element={<UseOptimisticDemo />} />
            <Route path="/hooks/use-reducer" element={<UseReducerDemo />} />
            <Route path="/hooks/use-ref" element={<UseRefDemo />} />
            <Route path="/hooks/use-state" element={<UseStateDemo />} />
            <Route path="/hooks/use-sync-external-store" element={<UseSyncExternalStoreDemo />} />
            <Route path="/hooks/use-transition" element={<UseTransitionDemo />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App