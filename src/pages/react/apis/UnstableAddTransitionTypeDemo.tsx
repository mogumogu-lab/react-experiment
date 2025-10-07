import { useState, startTransition } from 'react'

// Simulated transition type tracking
const transitionTypes = new Map<string, { priority: number; description: string }>()

// Simulated unstable_addTransitionType
function simulateAddTransitionType(type: string, priority: number, description: string) {
  transitionTypes.set(type, { priority, description })
  console.log(`[TRANSITION TYPE] Registered: ${type} (priority: ${priority})`)
}

// Register some transition types
simulateAddTransitionType('navigation', 1, 'High priority page navigation')
simulateAddTransitionType('search', 2, 'Medium priority search updates')
simulateAddTransitionType('background-sync', 3, 'Low priority background operations')

// Simulated component that tracks transitions
function TransitionLogger() {
  const [logs, setLogs] = useState<Array<{ type: string; timestamp: string; priority: number }>>([])

  const logTransition = (type: string) => {
    const transitionInfo = transitionTypes.get(type)
    if (transitionInfo) {
      const log = {
        type,
        timestamp: new Date().toLocaleTimeString(),
        priority: transitionInfo.priority
      }
      setLogs(prev => [...prev.slice(-9), log])
    }
  }

  return { logs, logTransition }
}

export default function UnstableAddTransitionTypeDemo() {
  const [tab, setTab] = useState<'home' | 'search' | 'settings'>('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [syncStatus, setSyncStatus] = useState('idle')
  const { logs, logTransition } = TransitionLogger()

  const handleNavigation = (newTab: 'home' | 'search' | 'settings') => {
    logTransition('navigation')
    startTransition(() => {
      setTab(newTab)
    })
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    logTransition('search')
    startTransition(() => {
      // Simulated search operation
    })
  }

  const handleBackgroundSync = () => {
    logTransition('background-sync')
    setSyncStatus('syncing')
    startTransition(() => {
      setTimeout(() => {
        setSyncStatus('completed')
        setTimeout(() => setSyncStatus('idle'), 2000)
      }, 1500)
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">unstable_addTransitionType() (Internal)</h1>
        <p className="text-gray-400 mb-6">
          unstable_addTransitionType()는 React 내부 API로, 다양한 transition 타입에 우선순위를
          할당할 수 있습니다. 여러 종류의 비동기 업데이트를 더 세밀하게 제어하는 데 사용됩니다.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Interactive Demo</h2>
          <div className="space-y-4">
            {/* Navigation Transitions */}
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-sm font-semibold mb-2 text-purple-400">High Priority - Navigation</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleNavigation('home')}
                  className={`px-4 py-2 rounded ${
                    tab === 'home' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation('search')}
                  className={`px-4 py-2 rounded ${
                    tab === 'search' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Search
                </button>
                <button
                  onClick={() => handleNavigation('settings')}
                  className={`px-4 py-2 rounded ${
                    tab === 'settings' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Settings
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Priority: 1 (Highest)</p>
            </div>

            {/* Search Transitions */}
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-sm font-semibold mb-2 text-blue-400">Medium Priority - Search</p>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Type to search..."
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
              <p className="text-xs text-gray-500 mt-2">Priority: 2 (Medium)</p>
            </div>

            {/* Background Sync Transitions */}
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-sm font-semibold mb-2 text-green-400">Low Priority - Background Sync</p>
              <button
                onClick={handleBackgroundSync}
                disabled={syncStatus === 'syncing'}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded"
              >
                {syncStatus === 'idle' && 'Start Background Sync'}
                {syncStatus === 'syncing' && 'Syncing...'}
                {syncStatus === 'completed' && 'Sync Completed!'}
              </button>
              <p className="text-xs text-gray-500 mt-2">Priority: 3 (Lowest)</p>
            </div>

            {/* Transition Logs */}
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-sm font-semibold mb-2">Transition Log:</p>
              <div className="space-y-1 text-xs font-mono max-h-40 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-gray-500">No transitions logged yet</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="flex justify-between text-gray-400">
                      <span className={
                        log.priority === 1 ? 'text-purple-400' :
                        log.priority === 2 ? 'text-blue-400' : 'text-green-400'
                      }>
                        [{log.timestamp}]
                      </span>
                      <span>{log.type}</span>
                      <span>P{log.priority}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example (Conceptual)</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`// This is an internal React API
import { unstable_addTransitionType } from 'react';

// Register different transition types with priorities
unstable_addTransitionType('navigation', 1);  // Highest priority
unstable_addTransitionType('search', 2);      // Medium priority
unstable_addTransitionType('analytics', 3);   // Low priority

// Use with startTransition
function handleNavigation(route) {
  startTransition(() => {
    // This transition would be marked as 'navigation' type
    navigate(route);
  }, { type: 'navigation' });
}

function handleSearch(query) {
  startTransition(() => {
    // This transition would be marked as 'search' type
    setSearchResults(query);
  }, { type: 'search' });
}

// React can now prioritize:
// 1. Navigation transitions (most important)
// 2. Search transitions (medium)
// 3. Analytics transitions (least important)
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Transition Priority System</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold">Priority 1 - Critical (Navigation)</p>
              <p className="text-gray-400">
                • 페이지 전환, 라우트 변경<br/>
                • 사용자가 직접 요청한 즉각적인 피드백<br/>
                • 최우선으로 처리
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">Priority 2 - Important (Search/Filter)</p>
              <p className="text-gray-400">
                • 검색 결과 업데이트<br/>
                • 필터링, 정렬<br/>
                • 사용자가 기다리는 작업이지만 입력은 차단하지 않음
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">Priority 3 - Background (Analytics/Sync)</p>
              <p className="text-gray-400">
                • 분석 데이터 전송<br/>
                • 백그라운드 동기화<br/>
                • 사용자가 직접 보지 않는 작업
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Use Cases</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Complex Applications</p>
              <p className="text-gray-400">여러 종류의 비동기 작업이 있는 대규모 앱</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Performance Tuning</p>
              <p className="text-gray-400">세밀한 성능 최적화가 필요한 경우</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Framework Development</p>
              <p className="text-gray-400">프레임워크나 라이브러리 개발</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ General Application Development</p>
              <p className="text-gray-400">일반 앱 개발에는 startTransition으로 충분</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ Production Use</p>
              <p className="text-gray-400">불안정한 API로 프로덕션 사용 권장하지 않음</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">How It Works</h2>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>Type Registration:</strong> 다양한 transition 타입을 우선순위와 함께 등록</p>
            <p>• <strong>Priority Assignment:</strong> 각 타입에 숫자 우선순위 할당 (낮을수록 높은 우선순위)</p>
            <p>• <strong>Scheduler Integration:</strong> React Scheduler가 우선순위에 따라 작업 스케줄링</p>
            <p>• <strong>Concurrent Rendering:</strong> 여러 transition이 동시에 있을 때 우선순위로 결정</p>
            <p>• <strong>Interruption:</strong> 높은 우선순위 transition이 낮은 우선순위를 중단 가능</p>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Comparison with Standard Transitions</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-blue-400 mb-2">Standard startTransition</p>
              <ul className="space-y-1 text-gray-300">
                <li>• 단일 우선순위 레벨</li>
                <li>• 모든 transition 동등하게 처리</li>
                <li>• 대부분의 앱에 충분</li>
                <li>• 간단하고 안정적</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-green-400 mb-2">With Transition Types</p>
              <ul className="space-y-1 text-gray-300">
                <li>• 다중 우선순위 레벨</li>
                <li>• 타입별 차별화된 처리</li>
                <li>• 복잡한 앱에 유용</li>
                <li>• 더 세밀한 제어</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Real-World Scenario</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`// E-commerce app with multiple transitions
unstable_addTransitionType('checkout', 1);     // Critical
unstable_addTransitionType('cart-update', 2);  // Important
unstable_addTransitionType('search', 3);       // Normal
unstable_addTransitionType('recommendations', 4); // Background

// User is checking out (highest priority)
function handleCheckout() {
  startTransition(() => {
    processPayment();
  }, { type: 'checkout' });
}

// While also typing in search (lower priority)
function handleSearch(query) {
  startTransition(() => {
    searchProducts(query);
  }, { type: 'search' });
}

// React ensures checkout completes first
// Search updates happen when checkout is done
`}</code>
          </pre>
        </section>
      </div>

      <div className="bg-red-900/30 p-4 rounded border border-red-700">
        <h3 className="font-semibold mb-2 text-red-400">⚠️ Unstable API Warning</h3>
        <p className="text-sm text-gray-300 mb-2">
          unstable_addTransitionType()는 불안정한(unstable) 내부 API입니다.
        </p>
        <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
          <li>공식 문서화되지 않았으며 API가 변경될 수 있습니다</li>
          <li>프로덕션 코드에서 사용하지 마세요</li>
          <li>대부분의 경우 기본 startTransition으로 충분합니다</li>
          <li>프레임워크/라이브러리 개발자용 API입니다</li>
        </ul>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>다양한 transition 타입에 우선순위 할당</li>
          <li>여러 비동기 업데이트의 세밀한 제어</li>
          <li>React Scheduler와 통합하여 작업 우선순위 관리</li>
          <li>복잡한 앱의 성능 최적화에 유용</li>
          <li>불안정한 내부 API로 사용 권장하지 않음</li>
          <li>일반 개발에는 기본 startTransition 사용</li>
        </ul>
      </div>
    </div>
  )
}