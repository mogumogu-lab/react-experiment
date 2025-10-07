import { useState } from 'react'

// Simulated captureOwnerStack functionality
// Note: This is a conceptual demo as captureOwnerStack is an internal debugging API
function simulateCaptureOwnerStack(): string[] {
  const stack = []

  // Simulate component hierarchy
  stack.push('at App (/src/App.tsx:10:5)')
  stack.push('at Router (/src/Router.tsx:25:8)')
  stack.push('at Layout (/src/Layout.tsx:15:12)')
  stack.push('at MainContent (/src/MainContent.tsx:42:3)')
  stack.push('at CaptureOwnerStackDemo (/src/pages/react/apis/CaptureOwnerStackDemo.tsx:5:1)')

  return stack
}

// Simulated component tree
function DeepNestedComponent({ onCapture }: { onCapture: (stack: string[]) => void }) {
  const captureStack = () => {
    const stack = simulateCaptureOwnerStack()
    onCapture(stack)
  }

  return (
    <div className="bg-gray-700 p-4 rounded border-l-4 border-purple-500">
      <p className="text-sm font-semibold mb-2">Deeply Nested Component</p>
      <button
        onClick={captureStack}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm"
      >
        Capture Owner Stack
      </button>
    </div>
  )
}

function MiddleComponent({ onCapture }: { onCapture: (stack: string[]) => void }) {
  return (
    <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-500 ml-4">
      <p className="text-sm font-semibold mb-2">Middle Component</p>
      <DeepNestedComponent onCapture={onCapture} />
    </div>
  )
}

function ParentComponent({ onCapture }: { onCapture: (stack: string[]) => void }) {
  return (
    <div className="bg-gray-900 p-4 rounded border-l-4 border-green-500">
      <p className="text-sm font-semibold mb-2">Parent Component</p>
      <MiddleComponent onCapture={onCapture} />
    </div>
  )
}

export default function CaptureOwnerStackDemo() {
  const [capturedStack, setCapturedStack] = useState<string[] | null>(null)
  const [showTree, setShowTree] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">captureOwnerStack() (Internal)</h1>
        <p className="text-gray-400 mb-6">
          captureOwnerStack()는 React 내부 디버깅 API로, 컴포넌트의 소유자(owner) 스택을
          캡처합니다. 주로 React DevTools와 내부 디버깅 목적으로 사용됩니다.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Interactive Demo</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => setShowTree(!showTree)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                {showTree ? 'Hide' : 'Show'} Component Tree
              </button>
              {capturedStack && (
                <button
                  onClick={() => setCapturedStack(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Clear Stack
                </button>
              )}
            </div>

            {showTree && (
              <ParentComponent onCapture={setCapturedStack} />
            )}

            {capturedStack && (
              <div className="bg-gray-900 p-4 rounded">
                <p className="text-sm font-semibold mb-2 text-green-400">Captured Owner Stack:</p>
                <div className="space-y-1 font-mono text-xs">
                  {capturedStack.map((line, i) => (
                    <div key={i} className="text-yellow-400">{line}</div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  이 스택은 컴포넌트가 어디서 생성되었는지 추적합니다.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">What is Owner Stack?</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">Owner vs Parent</p>
              <p className="text-gray-400">
                Parent는 DOM 트리 상의 부모, Owner는 컴포넌트를 생성한(렌더링한) 컴포넌트
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">Debugging Information</p>
              <p className="text-gray-400">
                컴포넌트가 어디서 왔는지 추적하여 디버깅을 돕습니다
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold">DevTools Integration</p>
              <p className="text-gray-400">
                React DevTools에서 컴포넌트 소스 위치 표시에 사용
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example (Conceptual)</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`// This is an internal React API, not for public use
import { captureOwnerStack } from 'react-internal';

function MyComponent() {
  // Capture the component owner stack
  const stack = captureOwnerStack();

  console.log('Owner stack:', stack);
  // Output: Component hierarchy that created this component

  return <div>Component</div>;
}

// Example: Owner vs Parent
function Owner() {
  return <Parent><Child /></Parent>;
}

function Parent({ children }) {
  return <div>{children}</div>;
}

function Child() {
  // Owner: Owner component (who rendered <Child />)
  // Parent: Parent component (DOM parent)
  const stack = captureOwnerStack();
  return <div>Child</div>;
}
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Use Cases</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ React DevTools</p>
              <p className="text-gray-400">컴포넌트 소스 코드 위치 표시</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Internal Debugging</p>
              <p className="text-gray-400">React 내부 디버깅 및 문제 추적</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Error Reporting</p>
              <p className="text-gray-400">더 나은 에러 메시지와 스택 트레이스</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ Production Use</p>
              <p className="text-gray-400">공개 API가 아니므로 프로덕션에서 사용 금지</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ Application Logic</p>
              <p className="text-gray-400">애플리케이션 로직에 의존하면 안 됨</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Owner vs Parent Example</h2>
          <div className="bg-gray-900 p-4 rounded space-y-4">
            <div>
              <p className="text-sm font-semibold text-green-400 mb-2">Owner Relationship:</p>
              <pre className="text-xs font-mono text-gray-400"><code>{`function App() {
  return <Layout><HomePage /></Layout>;
}
// HomePage's owner is App (who created it)`}</code></pre>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-400 mb-2">Parent Relationship:</p>
              <pre className="text-xs font-mono text-gray-400"><code>{`function Layout({ children }) {
  return <div className="layout">{children}</div>;
}
// HomePage's parent is Layout (DOM hierarchy)`}</code></pre>
            </div>
            <div className="bg-yellow-900/30 p-3 rounded border border-yellow-700">
              <p className="text-xs text-yellow-200">
                Owner는 JSX에서 컴포넌트를 작성한 곳, Parent는 실제 DOM 트리 구조
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Practical Applications</h2>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>Component Source Location:</strong> DevTools에서 "Go to definition" 기능</p>
            <p>• <strong>Better Error Messages:</strong> 에러가 어떤 컴포넌트에서 발생했는지 명확히 표시</p>
            <p>• <strong>Performance Profiling:</strong> 컴포넌트 렌더링 경로 추적</p>
            <p>• <strong>Debugging Tools:</strong> 커스텀 디버깅 도구 제작 시 활용</p>
            <p>• <strong>Testing Utilities:</strong> 테스트 실패 시 더 나은 진단 정보</p>
          </div>
        </section>
      </div>

      <div className="bg-red-900/30 p-4 rounded border border-red-700">
        <h3 className="font-semibold mb-2 text-red-400">⚠️ Internal API Warning</h3>
        <p className="text-sm text-gray-300 mb-2">
          captureOwnerStack()는 React 내부 API로, 공개 문서화되지 않았으며 언제든 변경될 수 있습니다.
        </p>
        <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
          <li>프로덕션 코드에서 사용하지 마세요</li>
          <li>API가 변경되거나 제거될 수 있습니다</li>
          <li>디버깅 목적으로만 참고하세요</li>
          <li>React DevTools가 이 정보를 자동으로 제공합니다</li>
        </ul>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>컴포넌트의 owner(생성자) 스택을 캡처</li>
          <li>Owner와 Parent는 다른 개념</li>
          <li>주로 React DevTools와 디버깅에 사용</li>
          <li>내부 API로 공개적으로 사용 불가</li>
          <li>더 나은 에러 메시지와 디버깅 정보 제공</li>
          <li>일반 개발자는 DevTools 사용 권장</li>
        </ul>
      </div>
    </div>
  )
}