import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

/**
 * flushSync Demo
 * Forces React to flush updates synchronously before continuing
 */
export default function FlushSyncDemo() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Without flushSync - async update
  const handleAsyncUpdate = () => {
    setCount(prev => prev + 1);
    addLog(`State updated (async) - count will be: ${count + 1}`);

    // This reads the OLD DOM state
    if (listRef.current) {
      addLog(`DOM read (async) - scrollHeight: ${listRef.current.scrollHeight}`);
    }
  };

  // With flushSync - sync update
  const handleSyncUpdate = () => {
    flushSync(() => {
      setCount(prev => prev + 1);
    });
    addLog(`State updated (sync) - count is now: ${count + 1}`);

    // This reads the NEW DOM state
    if (listRef.current) {
      addLog(`DOM read (sync) - scrollHeight: ${listRef.current.scrollHeight}`);
    }
  };

  // Add item and scroll to bottom example
  const addItemWithScroll = () => {
    const newItem = `Item ${items.length + 1}`;

    // Using flushSync ensures DOM is updated before we scroll
    flushSync(() => {
      setItems(prev => [...prev, newItem]);
    });

    // Now we can safely scroll to the new item
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
      addLog(`Added ${newItem} and scrolled to bottom`);
    }
  };

  const addItemWithoutFlushSync = () => {
    const newItem = `Item ${items.length + 1}`;

    // Without flushSync, scroll happens before DOM update
    setItems(prev => [...prev, newItem]);

    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
      addLog(`Added ${newItem} - scroll may not reach bottom!`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>flushSync API Demo</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. Sync vs Async State Updates</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#f8f8f8',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <p><strong>Count: {count}</strong></p>
          <button
            onClick={handleAsyncUpdate}
            style={{ marginRight: '10px' }}
          >
            Update (Async)
          </button>
          <button onClick={handleSyncUpdate}>
            Update with flushSync (Sync)
          </button>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>2. Scroll to Bottom Example</h3>
        <p>flushSync를 사용하여 DOM 업데이트 후 즉시 스크롤</p>

        <div
          ref={listRef}
          style={{
            height: '150px',
            overflow: 'auto',
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#fff',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '8px',
                marginBottom: '5px',
                backgroundColor: '#e3f2fd',
                borderRadius: '4px'
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <button
          onClick={addItemWithScroll}
          style={{ marginRight: '10px' }}
        >
          Add Item (with flushSync)
        </button>
        <button onClick={addItemWithoutFlushSync}>
          Add Item (without flushSync)
        </button>
        <button
          onClick={() => {
            flushSync(() => {
              setItems([]);
            });
            addLog('Cleared all items');
          }}
          style={{ marginLeft: '10px' }}
        >
          Clear
        </button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>3. Event Log</h3>
        <div style={{
          height: '150px',
          overflow: 'auto',
          border: '1px solid #ccc',
          padding: '10px',
          backgroundColor: '#f8f8f8',
          fontFamily: 'monospace',
          fontSize: '12px',
        }}>
          {logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              {log}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            flushSync(() => {
              setLogs([]);
            });
          }}
          style={{ marginTop: '10px' }}
        >
          Clear Logs
        </button>
      </section>

      <section>
        <h3>⚠️ Important Notes</h3>
        <ul>
          <li><strong>Performance Impact:</strong> flushSync는 성능에 영향을 줄 수 있으므로 꼭 필요한 경우에만 사용</li>
          <li><strong>Use Cases:</strong> DOM 측정, 스크롤 위치 조정, 써드파티 라이브러리 통합 시 유용</li>
          <li><strong>Batching:</strong> flushSync 내부의 업데이트는 즉시 동기적으로 처리됨</li>
          <li><strong>Effects:</strong> useEffect는 여전히 비동기적으로 실행됨</li>
        </ul>
      </section>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        border: '1px solid #ffc107'
      }}>
        <h4>Usage:</h4>
        <pre style={{ overflow: 'auto' }}>
{`import { flushSync } from 'react-dom';

flushSync(() => {
  setState(newValue);
});

// DOM is now updated synchronously
const element = document.getElementById('...');
element.scrollIntoView();`}
        </pre>
      </div>
    </div>
  );
}
