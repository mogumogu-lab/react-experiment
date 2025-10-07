import { lazy, Suspense, useState } from 'react'

// Simulate a heavy component with lazy loading
const HeavyComponent = lazy(() => {
  return new Promise<{ default: React.ComponentType }>((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Heavy Component Loaded!</h3>
            <p className="text-gray-300">This component was loaded lazily after a 2s delay.</p>
            <div className="mt-4 text-sm text-gray-400">
              <p>• Reduces initial bundle size</p>
              <p>• Improves page load performance</p>
              <p>• Only loads when needed</p>
            </div>
          </div>
        )
      })
    }, 2000)
  })
})

const ChartComponent = lazy(() => {
  return new Promise<{ default: React.ComponentType }>((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div className="bg-gray-700 p-4 rounded">
            <div className="text-sm font-mono text-green-400">
              <div className="mb-2">Performance Chart:</div>
              <div>█████████████ 90%</div>
              <div>████████ 55%</div>
              <div>████████████████ 100%</div>
              <div>██████ 40%</div>
            </div>
          </div>
        )
      })
    }, 1500)
  })
})

export default function LazyDemo() {
  const [showHeavy, setShowHeavy] = useState(false)
  const [showChart, setShowChart] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">lazy()</h1>
        <p className="text-gray-400 mb-6">
          lazy()를 사용하면 컴포넌트를 처음 렌더링할 때까지 로딩을 지연시킬 수 있습니다.
          코드 분할(code splitting)을 통해 초기 번들 크기를 줄이고 성능을 개선합니다.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Interactive Demo</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowHeavy(!showHeavy)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
              >
                {showHeavy ? 'Hide' : 'Load'} Heavy Component
              </button>
              <button
                onClick={() => setShowChart(!showChart)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
              >
                {showChart ? 'Hide' : 'Load'} Chart Component
              </button>
            </div>

            {showHeavy && (
              <Suspense fallback={
                <div className="bg-gray-700 p-6 rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                </div>
              }>
                <HeavyComponent />
              </Suspense>
            )}

            {showChart && (
              <Suspense fallback={
                <div className="bg-gray-700 p-4 rounded">
                  <div className="text-sm text-gray-400">Loading chart...</div>
                </div>
              }>
                <ChartComponent />
              </Suspense>
            )}

            <div className="bg-gray-900 p-4 rounded">
              <p className="text-sm text-gray-400">
                컴포넌트를 로드하면 2초의 지연 후 표시됩니다. 실제 앱에서는 네트워크를 통해
                별도의 JavaScript 번들을 다운로드하게 됩니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`import { lazy, Suspense } from 'react';

// Define lazy-loaded component
const MarkdownEditor = lazy(() => import('./MarkdownEditor'));

function App() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <MarkdownEditor />
    </Suspense>
  );
}

// Multiple lazy components
const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));

function AdminPanel() {
  const [view, setView] = useState('dashboard');

  return (
    <Suspense fallback={<Loading />}>
      {view === 'dashboard' ? <Dashboard /> : <Analytics />}
    </Suspense>
  );
}
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Usage Patterns</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Route-based code splitting</p>
              <p className="text-gray-400">각 라우트를 별도 번들로 분리</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Heavy libraries</p>
              <p className="text-gray-400">차트, 에디터 등 큰 라이브러리를 lazy로 로드</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Conditional features</p>
              <p className="text-gray-400">조건부로만 표시되는 기능</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ Above-the-fold content</p>
              <p className="text-gray-400">첫 화면에 바로 보이는 컨텐츠는 피하기</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ Small components</p>
              <p className="text-gray-400">작은 컴포넌트는 lazy 오버헤드가 더 클 수 있음</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Best Practices</h2>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>Always wrap with Suspense:</strong> lazy 컴포넌트는 Suspense 필요</p>
            <p>• <strong>Provide meaningful fallback:</strong> 로딩 UI를 명확하게 표시</p>
            <p>• <strong>Default export only:</strong> lazy는 default export만 지원</p>
            <p>• <strong>Named exports workaround:</strong> re-export 파일 생성</p>
            <p>• <strong>Preload when possible:</strong> 사용자 액션 예측하여 미리 로드</p>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>lazy()로 컴포넌트 동적 import 지연</li>
          <li>코드 분할을 통해 초기 번들 크기 감소</li>
          <li>Suspense와 함께 사용 필수</li>
          <li>라우트 기반 분할에 매우 효과적</li>
          <li>default export만 지원</li>
          <li>개발 시에도 실제 분할 시뮬레이션</li>
        </ul>
      </div>
    </div>
  )
}