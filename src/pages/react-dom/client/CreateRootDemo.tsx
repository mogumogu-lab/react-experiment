import { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * createRoot Demo
 * Creates a root to display React components inside a browser DOM node
 */

// Sample component to render dynamically
function Counter({ initialValue = 0 }: { initialValue?: number }) {
  const [count, setCount] = useState(initialValue);
  const [renderCount, setRenderCount] = useState(0);

  // Track renders
  useState(() => {
    setRenderCount(prev => prev + 1);
  });

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#e3f2fd',
      borderRadius: '8px',
      marginBottom: '10px'
    }}>
      <h3>Dynamic Counter Component</h3>
      <p>Count: <strong>{count}</strong></p>
      <p>Render Count: <strong>{renderCount}</strong></p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(c => c - 1)} style={{ marginLeft: '10px' }}>
        Decrement
      </button>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState<string[]>(['Learn React', 'Build something awesome']);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f3e5f5',
      borderRadius: '8px'
    }}>
      <h3>Todo List</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              padding: '8px',
              marginBottom: '5px',
              backgroundColor: 'white',
              borderRadius: '4px'
            }}
          >
            {todo}
            <button
              onClick={() => setTodos(todos.filter((_, i) => i !== index))}
              style={{ marginLeft: '10px', fontSize: '12px' }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CreateRootDemo() {
  const [containers, setContainers] = useState<{ id: number; type: string }[]>([]);
  const [nextId, setNextId] = useState(1);
  const rootsRef = useRef<Map<number, ReturnType<typeof createRoot>>>(new Map());

  const createDynamicRoot = (componentType: 'counter' | 'todolist') => {
    const containerId = nextId;
    setNextId(prev => prev + 1);

    // Add container to state
    setContainers(prev => [...prev, { id: containerId, type: componentType }]);

    // Wait for DOM to be ready, then create root
    setTimeout(() => {
      const container = document.getElementById(`dynamic-container-${containerId}`);
      if (container) {
        const root = createRoot(container);

        if (componentType === 'counter') {
          root.render(<Counter initialValue={Math.floor(Math.random() * 10)} />);
        } else {
          root.render(<TodoList />);
        }

        rootsRef.current.set(containerId, root);
      }
    }, 0);
  };

  const unmountRoot = (id: number) => {
    const root = rootsRef.current.get(id);
    if (root) {
      root.unmount();
      rootsRef.current.delete(id);
    }
    setContainers(prev => prev.filter(c => c.id !== id));
  };

  const updateRoot = (id: number) => {
    const root = rootsRef.current.get(id);
    const container = containers.find(c => c.id === id);

    if (root && container) {
      // Re-render with new props
      if (container.type === 'counter') {
        root.render(<Counter initialValue={Math.floor(Math.random() * 100)} />);
      } else {
        root.render(<TodoList />);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>createRoot API Demo</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. Create Dynamic Roots</h3>
        <p>createRoot를 사용하여 동적으로 React 컴포넌트를 렌더링</p>

        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => createDynamicRoot('counter')}
            style={{ marginRight: '10px' }}
          >
            Add Counter Component
          </button>
          <button onClick={() => createDynamicRoot('todolist')}>
            Add TodoList Component
          </button>
        </div>

        <div>
          {containers.map(container => (
            <div
              key={container.id}
              style={{
                marginBottom: '15px',
                border: '2px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <strong>Root #{container.id} ({container.type})</strong>
                <div>
                  <button
                    onClick={() => updateRoot(container.id)}
                    style={{ marginRight: '5px', fontSize: '12px' }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => unmountRoot(container.id)}
                    style={{ fontSize: '12px' }}
                  >
                    Unmount
                  </button>
                </div>
              </div>
              <div id={`dynamic-container-${container.id}`} />
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>2. Key Features</h3>
        <ul>
          <li><strong>Concurrent Rendering:</strong> React 18의 동시성 기능 지원</li>
          <li><strong>Automatic Batching:</strong> 모든 업데이트가 자동으로 배치됨</li>
          <li><strong>Transitions:</strong> useTransition, useDeferredValue 사용 가능</li>
          <li><strong>Suspense:</strong> Suspense를 사용한 데이터 로딩 지원</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>3. API Methods</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px'
        }}>
          <h4>root.render(reactNode)</h4>
          <p>React 컴포넌트를 루트에 렌더링</p>

          <h4>root.unmount()</h4>
          <p>루트에서 렌더링된 트리를 제거하고 이벤트 핸들러와 상태를 정리</p>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>4. createRoot vs ReactDOM.render</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>createRoot (React 18+)</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>ReactDOM.render (Legacy)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Concurrent Features</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>✅ 지원</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>❌ 미지원</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Automatic Batching</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>✅ 모든 곳에서</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>⚠️ 제한적</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Suspense SSR</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>✅ 지원</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>❌ 미지원</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Performance</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>⚡ 향상됨</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>⚠️ 기본</td>
            </tr>
          </tbody>
        </table>
      </section>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px'
      }}>
        <h4>Usage:</h4>
        <pre style={{ overflow: 'auto' }}>
{`import { createRoot } from 'react-dom/client';

// Create root
const container = document.getElementById('root');
const root = createRoot(container);

// Render
root.render(<App />);

// Update (call render again)
root.render(<App newProp="value" />);

// Unmount
root.unmount();`}
        </pre>
      </div>
    </div>
  );
}
