import { useState, startTransition } from 'react'

// Simulated slow rendering component
function SlowList({ searchTerm }: { searchTerm: string }) {
  const items = []

  // Generate items based on search term
  for (let i = 0; i < 10000; i++) {
    if (searchTerm === '' || `Item ${i}`.includes(searchTerm)) {
      items.push(`Item ${i}`)
    }
  }

  // Simulate slow rendering
  const startTime = performance.now()
  while (performance.now() - startTime < 100) {
    // Block for 100ms to simulate slow rendering
  }

  return (
    <div className="bg-gray-900 p-4 rounded max-h-60 overflow-y-auto">
      <p className="text-sm text-gray-400 mb-2">
        Found {items.length} items (rendering took ~100ms)
      </p>
      <div className="space-y-1">
        {items.slice(0, 50).map((item, i) => (
          <div key={i} className="text-sm text-gray-300">{item}</div>
        ))}
        {items.length > 50 && (
          <div className="text-sm text-gray-500">... and {items.length - 50} more</div>
        )}
      </div>
    </div>
  )
}

export default function StartTransitionDemo() {
  // Without startTransition - input feels laggy
  const [immediateSearch, setImmediateSearch] = useState('')

  // With startTransition - input stays responsive
  const [deferredSearch, setDeferredSearch] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handleImmediateChange = (value: string) => {
    // Direct state update - blocks UI
    setImmediateSearch(value)
  }

  const handleDeferredChange = (value: string) => {
    // Mark as low-priority with startTransition
    startTransition(() => {
      setIsPending(true)
      setDeferredSearch(value)
      setIsPending(false)
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">startTransition()</h1>
        <p className="text-gray-400 mb-6">
          startTransition()을 사용하면 급하지 않은 state 업데이트를 낮은 우선순위로 표시하여
          UI를 차단하지 않고 반응성을 유지할 수 있습니다.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-red-400">Without startTransition (Blocking)</h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={immediateSearch}
                onChange={(e) => handleImmediateChange(e.target.value)}
                placeholder="Type to search (will feel laggy)..."
                className="w-full px-4 py-2 bg-gray-700 rounded border border-red-500"
              />
              <p className="text-xs text-red-400 mt-1">
                ⚠️ 입력이 느리게 느껴집니다 - UI가 차단됨
              </p>
            </div>
            <SlowList searchTerm={immediateSearch} />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-400">With startTransition (Non-blocking)</h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={deferredSearch}
                onChange={(e) => {
                  // Update input immediately
                  e.persist()
                  const value = e.target.value
                  // Use native input value for immediate feedback
                  e.currentTarget.value = value
                  setDeferredSearch(value)
                  handleDeferredChange(value)
                }}
                placeholder="Type to search (stays responsive)..."
                className="w-full px-4 py-2 bg-gray-700 rounded border border-green-500"
              />
              <p className="text-xs text-green-400 mt-1">
                ✓ 입력이 부드럽습니다 - UI가 반응적으로 유지됨
              </p>
            </div>
            {isPending && (
              <div className="text-sm text-yellow-400">업데이트 중...</div>
            )}
            <SlowList searchTerm={deferredSearch} />
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`import { useState, startTransition } from 'react';

function SearchResults() {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    // Update input immediately - stays responsive
    setInput(e.target.value);

    // Mark search update as non-urgent
    startTransition(() => {
      setSearchTerm(e.target.value);
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      <SlowList searchTerm={searchTerm} />
    </>
  );
}

// With useTransition for isPending state
import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('home');

  const selectTab = (nextTab) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <>
      <button onClick={() => selectTab('home')}>Home</button>
      <button onClick={() => selectTab('posts')}>
        Posts {isPending && '(Loading...)'}
      </button>
    </>
  );
}
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">How It Works</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">1. Priority-based Scheduling</p>
              <p className="text-gray-400">
                startTransition으로 감싼 업데이트는 낮은 우선순위로 표시됨
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">2. Interruptible</p>
              <p className="text-gray-400">
                더 긴급한 업데이트(사용자 입력 등)가 있으면 중단 가능
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold">3. UI Responsiveness</p>
              <p className="text-gray-400">
                UI가 차단되지 않아 부드러운 사용자 경험 제공
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold">4. No Loading States Needed</p>
              <p className="text-gray-400">
                이전 UI를 유지하면서 백그라운드에서 업데이트
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Use Cases</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Search/Filter operations</p>
              <p className="text-gray-400">입력은 즉시, 검색 결과는 천천히</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Tab switching</p>
              <p className="text-gray-400">탭 버튼은 즉시 반응, 컨텐츠 로딩은 뒤에</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Rendering large lists</p>
              <p className="text-gray-400">많은 데이터 렌더링 시 UI 블로킹 방지</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Complex computations</p>
              <p className="text-gray-400">무거운 계산을 낮은 우선순위로</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ Controlled inputs</p>
              <p className="text-gray-400">input value 자체는 즉시 업데이트 필요</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">startTransition vs useTransition</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-blue-400 mb-2">startTransition</p>
              <ul className="space-y-1 text-gray-300">
                <li>• 함수로 직접 사용</li>
                <li>• isPending 상태 없음</li>
                <li>• 간단한 사용 사례</li>
                <li>• 로딩 상태 불필요한 경우</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-green-400 mb-2">useTransition</p>
              <ul className="space-y-1 text-gray-300">
                <li>• Hook으로 사용</li>
                <li>• isPending 상태 제공</li>
                <li>• 로딩 UI 필요한 경우</li>
                <li>• 사용자에게 피드백 제공</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>급하지 않은 업데이트를 낮은 우선순위로 표시</li>
          <li>더 긴급한 업데이트에 의해 중단 가능</li>
          <li>UI 반응성 유지하면서 무거운 렌더링 처리</li>
          <li>isPending 상태가 필요하면 useTransition 사용</li>
          <li>검색, 필터링, 탭 전환 등에 이상적</li>
          <li>제어된 입력의 value는 즉시 업데이트해야 함</li>
        </ul>
      </div>
    </div>
  )
}