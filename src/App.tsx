import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'

// React Hooks
import UseActionStateDemo from './pages/react/hooks/UseActionStateDemo'
import UseCallbackDemo from './pages/react/hooks/UseCallbackDemo'
import UseContextDemo from './pages/react/hooks/UseContextDemo'
import UseDebugValueDemo from './pages/react/hooks/UseDebugValueDemo'
import UseDeferredValueDemo from './pages/react/hooks/UseDeferredValueDemo'
import UseEffectDemo from './pages/react/hooks/UseEffectDemo'
import UseIdDemo from './pages/react/hooks/UseIdDemo'
import UseImperativeHandleDemo from './pages/react/hooks/UseImperativeHandleDemo'
import UseInsertionEffectDemo from './pages/react/hooks/UseInsertionEffectDemo'
import UseLayoutEffectDemo from './pages/react/hooks/UseLayoutEffectDemo'
import UseMemoDemo from './pages/react/hooks/UseMemoDemo'
import UseOptimisticDemo from './pages/react/hooks/UseOptimisticDemo'
import UseReducerDemo from './pages/react/hooks/UseReducerDemo'
import UseRefDemo from './pages/react/hooks/UseRefDemo'
import UseStateDemo from './pages/react/hooks/UseStateDemo'
import UseSyncExternalStoreDemo from './pages/react/hooks/UseSyncExternalStoreDemo'
import UseTransitionDemo from './pages/react/hooks/UseTransitionDemo'

// React Components
import FragmentDemo from './pages/react/components/FragmentDemo'
import ProfilerDemo from './pages/react/components/ProfilerDemo'
import StrictModeDemo from './pages/react/components/StrictModeDemo'
import SuspenseDemo from './pages/react/components/SuspenseDemo'
import ActivityDemo from './pages/react/components/ActivityDemo'
import ViewTransitionDemo from './pages/react/components/ViewTransitionDemo'

// React APIs
import ActDemo from './pages/react/apis/ActDemo'
import CacheDemo from './pages/react/apis/CacheDemo'
import CaptureOwnerStackDemo from './pages/react/apis/CaptureOwnerStackDemo'
import CreateContextDemo from './pages/react/apis/CreateContextDemo'
import LazyDemo from './pages/react/apis/LazyDemo'
import MemoDemo from './pages/react/apis/MemoDemo'
import StartTransitionDemo from './pages/react/apis/StartTransitionDemo'
import UseDemo from './pages/react/apis/UseDemo'
import ExperimentalTaintObjectReferenceDemo from './pages/react/apis/ExperimentalTaintObjectReferenceDemo'
import ExperimentalTaintUniqueValueDemo from './pages/react/apis/ExperimentalTaintUniqueValueDemo'
import UnstableAddTransitionTypeDemo from './pages/react/apis/UnstableAddTransitionTypeDemo'

// React-DOM Hooks
import UseFormStatusDemo from './pages/react-dom/hooks/UseFormStatusDemo'

// React-DOM Components
import DivDemo from './pages/react-dom/components/DivDemo'
import FormDemo from './pages/react-dom/components/FormDemo'
import InputDemo from './pages/react-dom/components/InputDemo'
import OptionDemo from './pages/react-dom/components/OptionDemo'
import ProgressDemo from './pages/react-dom/components/ProgressDemo'
import SelectDemo from './pages/react-dom/components/SelectDemo'
import TextareaDemo from './pages/react-dom/components/TextareaDemo'
import LinkDemo from './pages/react-dom/components/LinkDemo'
import MetaDemo from './pages/react-dom/components/MetaDemo'
import ScriptDemo from './pages/react-dom/components/ScriptDemo'
import StyleDemo from './pages/react-dom/components/StyleDemo'
import TitleDemo from './pages/react-dom/components/TitleDemo'

// React-DOM API
import CreatePortalDemo from './pages/react-dom/api/CreatePortalDemo'
import FlushSyncDemo from './pages/react-dom/api/FlushSyncDemo'
import ResourceHintsDemo from './pages/react-dom/api/ResourceHintsDemo'

// React-DOM Client API
import CreateRootDemo from './pages/react-dom/client/CreateRootDemo'
import HydrateRootDemo from './pages/react-dom/client/HydrateRootDemo'

// React-DOM Server API
import ServerAPIsDemo from './pages/react-dom/server/ServerAPIsDemo'

// React-DOM Static API
import PrerenderDemo from './pages/react-dom/static/PrerenderDemo'
import PrerenderToNodeStreamDemo from './pages/react-dom/static/PrerenderToNodeStreamDemo'

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

            {/* React Hooks */}
            <Route path="/react/hooks/use-action-state" element={<UseActionStateDemo />} />
            <Route path="/react/hooks/use-callback" element={<UseCallbackDemo />} />
            <Route path="/react/hooks/use-context" element={<UseContextDemo />} />
            <Route path="/react/hooks/use-debug-value" element={<UseDebugValueDemo />} />
            <Route path="/react/hooks/use-deferred-value" element={<UseDeferredValueDemo />} />
            <Route path="/react/hooks/use-effect" element={<UseEffectDemo />} />
            <Route path="/react/hooks/use-id" element={<UseIdDemo />} />
            <Route path="/react/hooks/use-imperative-handle" element={<UseImperativeHandleDemo />} />
            <Route path="/react/hooks/use-insertion-effect" element={<UseInsertionEffectDemo />} />
            <Route path="/react/hooks/use-layout-effect" element={<UseLayoutEffectDemo />} />
            <Route path="/react/hooks/use-memo" element={<UseMemoDemo />} />
            <Route path="/react/hooks/use-optimistic" element={<UseOptimisticDemo />} />
            <Route path="/react/hooks/use-reducer" element={<UseReducerDemo />} />
            <Route path="/react/hooks/use-ref" element={<UseRefDemo />} />
            <Route path="/react/hooks/use-state" element={<UseStateDemo />} />
            <Route path="/react/hooks/use-sync-external-store" element={<UseSyncExternalStoreDemo />} />
            <Route path="/react/hooks/use-transition" element={<UseTransitionDemo />} />

            {/* React Components */}
            <Route path="/react/components/fragment" element={<FragmentDemo />} />
            <Route path="/react/components/profiler" element={<ProfilerDemo />} />
            <Route path="/react/components/strict-mode" element={<StrictModeDemo />} />
            <Route path="/react/components/suspense" element={<SuspenseDemo />} />
            <Route path="/react/components/activity" element={<ActivityDemo />} />
            <Route path="/react/components/view-transition" element={<ViewTransitionDemo />} />

            {/* React APIs */}
            <Route path="/react/apis/act" element={<ActDemo />} />
            <Route path="/react/apis/cache" element={<CacheDemo />} />
            <Route path="/react/apis/capture-owner-stack" element={<CaptureOwnerStackDemo />} />
            <Route path="/react/apis/create-context" element={<CreateContextDemo />} />
            <Route path="/react/apis/lazy" element={<LazyDemo />} />
            <Route path="/react/apis/memo" element={<MemoDemo />} />
            <Route path="/react/apis/start-transition" element={<StartTransitionDemo />} />
            <Route path="/react/apis/use" element={<UseDemo />} />
            <Route path="/react/apis/experimental-taint-object-reference" element={<ExperimentalTaintObjectReferenceDemo />} />
            <Route path="/react/apis/experimental-taint-unique-value" element={<ExperimentalTaintUniqueValueDemo />} />
            <Route path="/react/apis/unstable-add-transition-type" element={<UnstableAddTransitionTypeDemo />} />

            {/* React-DOM Hooks */}
            <Route path="/react-dom/hooks/use-form-status" element={<UseFormStatusDemo />} />

            {/* React-DOM Components */}
            <Route path="/react-dom/components/div" element={<DivDemo />} />
            <Route path="/react-dom/components/form" element={<FormDemo />} />
            <Route path="/react-dom/components/input" element={<InputDemo />} />
            <Route path="/react-dom/components/option" element={<OptionDemo />} />
            <Route path="/react-dom/components/progress" element={<ProgressDemo />} />
            <Route path="/react-dom/components/select" element={<SelectDemo />} />
            <Route path="/react-dom/components/textarea" element={<TextareaDemo />} />
            <Route path="/react-dom/components/link" element={<LinkDemo />} />
            <Route path="/react-dom/components/meta" element={<MetaDemo />} />
            <Route path="/react-dom/components/script" element={<ScriptDemo />} />
            <Route path="/react-dom/components/style" element={<StyleDemo />} />
            <Route path="/react-dom/components/title" element={<TitleDemo />} />

            {/* React-DOM API */}
            <Route path="/react-dom/api/create-portal" element={<CreatePortalDemo />} />
            <Route path="/react-dom/api/flush-sync" element={<FlushSyncDemo />} />
            <Route path="/react-dom/api/resource-hints" element={<ResourceHintsDemo />} />

            {/* React-DOM Client API */}
            <Route path="/react-dom/client/create-root" element={<CreateRootDemo />} />
            <Route path="/react-dom/client/hydrate-root" element={<HydrateRootDemo />} />

            {/* React-DOM Server API */}
            <Route path="/react-dom/server/server-apis" element={<ServerAPIsDemo />} />

            {/* React-DOM Static API */}
            <Route path="/react-dom/static/prerender" element={<PrerenderDemo />} />
            <Route path="/react-dom/static/prerender-to-node-stream" element={<PrerenderToNodeStreamDemo />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App