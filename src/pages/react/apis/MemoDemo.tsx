import { memo, useState, useCallback } from 'react'

// Component WITHOUT memo
function ExpensiveComponentNoMemo({ value, onAction }: { value: number; onAction: () => void }) {
  // Simulate expensive computation
  let computedValue = value
  for (let i = 0; i < 10000000; i++) {
    computedValue += 0.000001
  }

  return (
    <div className="bg-red-900/30 border border-red-500 p-4 rounded">
      <p className="font-semibold text-red-400">Without memo()</p>
      <p className="text-sm text-gray-300">Value: {value}</p>
      <p className="text-xs text-gray-400">Computed: {computedValue.toFixed(2)}</p>
      <p className="text-xs text-yellow-400 mt-2">⚠️ Re-renders on every parent update!</p>
      <button
        onClick={onAction}
        className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
      >
        Action
      </button>
    </div>
  )
}

// Component WITH memo
const ExpensiveComponentMemo = memo(({ value, onAction }: { value: number; onAction: () => void }) => {
  // Simulate expensive computation
  let computedValue = value
  for (let i = 0; i < 10000000; i++) {
    computedValue += 0.000001
  }

  return (
    <div className="bg-green-900/30 border border-green-500 p-4 rounded">
      <p className="font-semibold text-green-400">With memo()</p>
      <p className="text-sm text-gray-300">Value: {value}</p>
      <p className="text-xs text-gray-400">Computed: {computedValue.toFixed(2)}</p>
      <p className="text-xs text-green-400 mt-2">✓ Only re-renders when props change!</p>
      <button
        onClick={onAction}
        className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
      >
        Action
      </button>
    </div>
  )
})

ExpensiveComponentMemo.displayName = 'ExpensiveComponentMemo'

// Custom comparison function demo
interface User {
  id: number
  name: string
  metadata: { lastSeen: string }
}

const UserCardCustomCompare = memo(
  ({ user }: { user: User }) => {
    return (
      <div className="bg-gray-700 p-3 rounded">
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs text-gray-400">ID: {user.id}</p>
        <p className="text-xs text-gray-500">Last seen: {user.metadata.lastSeen}</p>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Custom comparison: only re-render if id or name changes
    // Ignore metadata changes
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name
    )
  }
)

UserCardCustomCompare.displayName = 'UserCardCustomCompare'

export default function MemoDemo() {
  const [count, setCount] = useState(0)
  const [expensiveValue, setExpensiveValue] = useState(10)
  const [user, setUser] = useState<User>({
    id: 1,
    name: 'Alice',
    metadata: { lastSeen: new Date().toISOString() }
  })

  // Memoized callback to prevent unnecessary re-renders
  const handleAction = useCallback(() => {
    console.log('Action executed')
  }, [])

  const updateMetadata = () => {
    setUser(prev => ({
      ...prev,
      metadata: { lastSeen: new Date().toISOString() }
    }))
  }

  const updateName = () => {
    setUser(prev => ({
      ...prev,
      name: prev.name === 'Alice' ? 'Bob' : 'Alice'
    }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">memo()</h1>
        <p className="text-gray-400 mb-6">
          memo()를 사용하면 props가 변경되지 않을 때 컴포넌트의 재렌더링을 건너뛸 수 있습니다.
          성능 최적화를 위한 고차 컴포넌트(HOC)입니다.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Basic Comparison</h2>
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Parent State: {count}</span>
                <button
                  onClick={() => setCount(c => c + 1)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Increment Parent State
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Expensive Value: {expensiveValue}</span>
                <button
                  onClick={() => setExpensiveValue(v => v + 1)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
                >
                  Change Prop
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <ExpensiveComponentNoMemo value={expensiveValue} onAction={handleAction} />
              <ExpensiveComponentMemo value={expensiveValue} onAction={handleAction} />
            </div>

            <div className="bg-yellow-900/30 p-3 rounded border border-yellow-700">
              <p className="text-sm text-yellow-200">
                <strong>실험:</strong> "Increment Parent State" 버튼을 클릭해보세요.
                memo() 없는 컴포넌트는 매번 재계산하지만, memo()를 사용한 컴포넌트는
                props가 동일하므로 재렌더링을 건너뜁니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Custom Comparison Function</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={updateMetadata}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Update Metadata Only
              </button>
              <button
                onClick={updateName}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Update Name
              </button>
            </div>

            <UserCardCustomCompare user={user} />

            <div className="bg-gray-900 p-3 rounded text-sm text-gray-400">
              <p>커스텀 비교 함수를 사용하여 metadata 변경은 무시하고 id와 name만 체크합니다.</p>
              <p className="mt-1">"Update Metadata Only"를 클릭해도 재렌더링되지 않습니다.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`import { memo } from 'react';

// Basic memo usage
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Expensive computation or rendering
  return <div>{data}</div>;
});

// With custom comparison
const UserCard = memo(
  function UserCard({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);

// With named export
export const MemoizedList = memo(({ items }) => {
  return items.map(item => <li key={item.id}>{item.name}</li>);
});
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">When to Use memo()</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Pure components with expensive rendering</p>
              <p className="text-gray-400">복잡한 계산이나 많은 DOM 요소를 렌더링하는 경우</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Props change infrequently</p>
              <p className="text-gray-400">부모는 자주 렌더링되지만 props는 거의 변하지 않을 때</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Large lists with stable items</p>
              <p className="text-gray-400">많은 아이템을 렌더링하고 각 아이템이 독립적일 때</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ Props change frequently</p>
              <p className="text-gray-400">props가 자주 변경되면 memo의 비교 비용이 낭비됨</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ Simple/fast components</p>
              <p className="text-gray-400">렌더링이 빠른 컴포넌트는 memo 오버헤드가 더 클 수 있음</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Important Notes</h2>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>Shallow comparison:</strong> 기본적으로 props를 얕은 비교로 체크</p>
            <p>• <strong>Reference equality:</strong> 객체/배열/함수는 참조로 비교됨</p>
            <p>• <strong>Use with useCallback/useMemo:</strong> 함수 props는 useCallback으로 메모이제이션</p>
            <p>• <strong>Custom comparison:</strong> 두 번째 인자로 커스텀 비교 함수 제공 가능</p>
            <p>• <strong>Profiler first:</strong> 성능 문제를 실제로 측정한 후 적용</p>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>props가 변경되지 않으면 재렌더링 건너뜀</li>
          <li>고차 컴포넌트(HOC)로 컴포넌트를 래핑</li>
          <li>기본적으로 얕은 비교 수행</li>
          <li>커스텀 비교 함수 제공 가능</li>
          <li>useCallback/useMemo와 함께 사용하면 더 효과적</li>
          <li>성능 측정 후 필요한 곳에만 적용</li>
        </ul>
      </div>
    </div>
  )
}