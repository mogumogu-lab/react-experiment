import { useState, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

/**
 * hydrateRoot Demo
 * Hydrates server-rendered HTML with React
 */

// Sample component for SSR simulation
function InteractiveComponent({ title }: { title: string }) {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#e8f5e9',
      borderRadius: '8px',
      border: '2px solid #4caf50'
    }}>
      <h3>{title}</h3>
      <p>Count: <strong>{count}</strong></p>
      <p>Status: <strong>{isClient ? '✅ Hydrated (Interactive)' : '⏳ Server HTML'}</strong></p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(c => c - 1)} style={{ marginLeft: '10px' }}>
        Decrement
      </button>
    </div>
  );
}

function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#fff3e0',
      borderRadius: '8px',
      marginTop: '15px',
      border: '2px solid #ff9800'
    }}>
      <h3>Timer (Hydration Example)</h3>
      <p>Elapsed: <strong>{seconds}s</strong></p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)} style={{ marginLeft: '10px' }}>
        Reset
      </button>
    </div>
  );
}

export default function HydrateRootDemo() {
  const [hydratedContainers, setHydratedContainers] = useState<number[]>([]);
  const [serverHTML, setServerHTML] = useState('');

  // Simulate SSR and hydration
  const simulateSSRAndHydrate = () => {
    // Step 1: Simulate server-side rendering
    const serverRenderedHTML = renderToString(
      <InteractiveComponent title="SSR Component" />
    );

    setServerHTML(serverRenderedHTML);

    // Step 2: Create container with server HTML
    const containerId = Date.now();
    setHydratedContainers(prev => [...prev, containerId]);

    // Step 3: Hydrate after DOM is ready
    setTimeout(() => {
      const container = document.getElementById(`hydrate-container-${containerId}`);
      if (container) {
        // Set server HTML
        container.innerHTML = serverRenderedHTML;

        // Small delay to show server HTML state
        setTimeout(() => {
          // Hydrate with React
          hydrateRoot(
            container,
            <InteractiveComponent title="SSR Component" />
          );
        }, 1000);
      }
    }, 0);
  };

  const simulateTimerHydration = () => {
    const serverRenderedHTML = renderToString(<TimerComponent />);

    const containerId = Date.now();
    setHydratedContainers(prev => [...prev, containerId]);

    setTimeout(() => {
      const container = document.getElementById(`hydrate-container-${containerId}`);
      if (container) {
        container.innerHTML = serverRenderedHTML;

        setTimeout(() => {
          hydrateRoot(container, <TimerComponent />);
        }, 1000);
      }
    }, 0);
  };

  const removeContainer = (id: number) => {
    setHydratedContainers(prev => prev.filter(c => c !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>hydrateRoot API Demo</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. What is Hydration?</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <p>
            <strong>Hydration</strong>은 서버에서 렌더링된 HTML에 React 이벤트 핸들러와 상태를 "붙이는" 과정입니다.
          </p>
          <p>SSR(Server-Side Rendering)된 앱에서 필수적인 과정입니다.</p>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>2. Simulate SSR + Hydration</h3>
        <p>서버 렌더링과 클라이언트 하이드레이션 과정을 시뮬레이션</p>

        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={simulateSSRAndHydrate}
            style={{ marginRight: '10px' }}
          >
            Simulate Counter Hydration
          </button>
          <button onClick={simulateTimerHydration}>
            Simulate Timer Hydration
          </button>
        </div>

        <div>
          {hydratedContainers.map(containerId => (
            <div key={containerId} style={{ marginBottom: '15px', position: 'relative' }}>
              <button
                onClick={() => removeContainer(containerId)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: 10
                }}
              >
                Remove
              </button>
              <div
                id={`hydrate-container-${containerId}`}
                style={{
                  border: '3px dashed #9e9e9e',
                  borderRadius: '8px',
                  padding: '5px'
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>3. Server HTML Preview</h3>
        <p>서버에서 생성된 HTML (React 없이 순수 HTML)</p>
        <div style={{
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '12px',
          overflow: 'auto',
          maxHeight: '200px',
          border: '1px solid #ccc'
        }}>
          {serverHTML || 'Click "Simulate SSR + Hydration" to see server HTML'}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>4. Hydration Process</h3>
        <ol>
          <li><strong>서버:</strong> renderToString()으로 HTML 생성</li>
          <li><strong>전송:</strong> HTML을 클라이언트에 전송</li>
          <li><strong>표시:</strong> 브라우저가 HTML을 즉시 표시 (빠른 FCP)</li>
          <li><strong>하이드레이션:</strong> hydrateRoot()로 React 연결</li>
          <li><strong>Interactive:</strong> 이벤트 핸들러와 상태가 작동</li>
        </ol>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>5. Hydration Mismatch Warning</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          border: '1px solid #ffc107'
        }}>
          <p><strong>⚠️ 주의:</strong> 서버와 클라이언트의 렌더링 결과가 다르면 hydration mismatch 에러 발생!</p>
          <p>피해야 할 것들:</p>
          <ul>
            <li>서버와 다른 날짜/시간 사용</li>
            <li>랜덤 값 사용</li>
            <li>브라우저 전용 API 사용 (window, localStorage 등)</li>
            <li>조건부 렌더링 차이</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>6. hydrateRoot vs createRoot</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>hydrateRoot</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>createRoot</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Purpose</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>SSR 앱 하이드레이션</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>클라이언트 전용 렌더링</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Initial HTML</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>서버 렌더링 HTML 필요</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>빈 컨테이너</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Performance</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>빠른 FCP</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>JS 로드 후 렌더링</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Use Case</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>SSR, SSG, Next.js 등</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>CRA, SPA</td>
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
{`import { hydrateRoot } from 'react-dom/client';

// Server: Generate HTML
const html = renderToString(<App />);

// Client: Hydrate
const container = document.getElementById('root');
hydrateRoot(container, <App />);

// With options
hydrateRoot(container, <App />, {
  onRecoverableError: (error) => {
    console.error('Recoverable error:', error);
  }
});`}
        </pre>
      </div>
    </div>
  );
}
