import { useState } from 'react';
import { preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule } from 'react-dom';

/**
 * Resource Hints API Demo
 * Demonstrates preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule
 */
export default function ResourceHintsDemo() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // DNS Prefetch
  const handlePrefetchDNS = () => {
    prefetchDNS('https://api.example.com');
    addLog('DNS prefetch initiated for api.example.com');

    // Check in Network tab
    const link = document.querySelector('link[rel="dns-prefetch"][href="https://api.example.com"]');
    addLog(link ? '✓ DNS prefetch link added to DOM' : '✗ DNS prefetch failed');
  };

  // Preconnect
  const handlePreconnect = () => {
    preconnect('https://cdn.example.com', { crossOrigin: 'anonymous' });
    addLog('Preconnect initiated for cdn.example.com');

    const link = document.querySelector('link[rel="preconnect"][href="https://cdn.example.com"]');
    addLog(link ? '✓ Preconnect link added to DOM' : '✗ Preconnect failed');
  };

  // Preload Resource
  const handlePreload = () => {
    // Preload a stylesheet
    preload('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap', {
      as: 'style',
    });
    addLog('Preload stylesheet initiated');

    // Preload an image
    preload('/images/hero.jpg', {
      as: 'image',
      fetchPriority: 'high',
    });
    addLog('Preload image initiated with high priority');

    // Preload a font
    preload('/fonts/custom-font.woff2', {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    });
    addLog('Preload font initiated');
  };

  // Preload Module
  const handlePreloadModule = () => {
    preloadModule('/modules/chart-library.js', {
      as: 'script',
      crossOrigin: 'anonymous',
    });
    addLog('Preload ES module initiated');

    const link = document.querySelector('link[rel="modulepreload"]');
    addLog(link ? '✓ Module preload link added to DOM' : '✗ Module preload failed');
  };

  // Preinit Stylesheet
  const handlePreinit = () => {
    preinit('https://cdn.example.com/styles/theme.css', {
      as: 'style',
      precedence: 'high',
    });
    addLog('Preinit stylesheet initiated (will fetch and execute)');

    // Preinit script
    preinit('https://cdn.example.com/analytics.js', {
      as: 'script',
      crossOrigin: 'anonymous',
    });
    addLog('Preinit script initiated');
  };

  // Preinit Module
  const handlePreinitModule = () => {
    preinitModule('/modules/app-bundle.js', {
      as: 'script',
      crossOrigin: 'anonymous',
    });
    addLog('Preinit ES module initiated');
  };

  // Complex scenario: Progressive loading
  const handleProgressiveLoad = () => {
    addLog('=== Starting Progressive Load ===');

    // Step 1: DNS lookup for external domains
    prefetchDNS('https://api.example.com');
    prefetchDNS('https://cdn.example.com');
    addLog('Step 1: DNS prefetch for external domains');

    // Step 2: Establish connection
    setTimeout(() => {
      preconnect('https://cdn.example.com');
      addLog('Step 2: Preconnect to CDN');
    }, 100);

    // Step 3: Preload critical resources
    setTimeout(() => {
      preload('/critical.css', { as: 'style' });
      preload('/critical.js', { as: 'script' });
      addLog('Step 3: Preload critical resources');
    }, 200);

    // Step 4: Preinit resources (fetch + execute)
    setTimeout(() => {
      preinit('/app.css', { as: 'style', precedence: 'high' });
      addLog('Step 4: Preinit application styles');
    }, 300);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Resource Hints API Demo</h2>

      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px'
      }}>
        <p><strong>💡 Tip:</strong> Open Network tab in DevTools to see resource hints in action</p>
      </div>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. DNS Prefetch</h3>
        <p>DNS 조회를 미리 수행하여 나중에 발생할 요청의 지연시간 감소</p>
        <button onClick={handlePrefetchDNS}>
          Prefetch DNS
        </button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>2. Preconnect</h3>
        <p>DNS 조회 + TCP 핸드셰이크 + TLS 협상을 미리 수행</p>
        <button onClick={handlePreconnect}>
          Preconnect
        </button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>3. Preload</h3>
        <p>리소스를 미리 다운로드 (실행하지 않음)</p>
        <button onClick={handlePreload}>
          Preload Resources
        </button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>4. Preload Module</h3>
        <p>ES 모듈을 미리 다운로드</p>
        <button onClick={handlePreloadModule}>
          Preload Module
        </button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>5. Preinit</h3>
        <p>리소스를 다운로드하고 즉시 실행</p>
        <button onClick={handlePreinit}>
          Preinit Resources
        </button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>6. Preinit Module</h3>
        <p>ES 모듈을 다운로드하고 즉시 실행</p>
        <button onClick={handlePreinitModule}>
          Preinit Module
        </button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>7. Progressive Loading Scenario</h3>
        <p>실제 애플리케이션에서 사용하는 순차적 리소스 로딩 전략</p>
        <button onClick={handleProgressiveLoad}>
          Run Progressive Load
        </button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>Event Log</h3>
        <div style={{
          height: '200px',
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
        <button onClick={clearLogs} style={{ marginTop: '10px' }}>
          Clear Logs
        </button>
      </section>

      <section>
        <h3>API Comparison</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>API</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Purpose</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>When to Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><code>prefetchDNS</code></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>DNS 조회만 수행</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>외부 도메인에 대한 요청이 예상될 때</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><code>preconnect</code></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>DNS + TCP + TLS</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>곧 사용할 외부 리소스가 있을 때</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><code>preload</code></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>다운로드만</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>페이지 로드 중 필요한 리소스</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><code>preinit</code></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>다운로드 + 실행</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>즉시 필요한 스크립트/스타일</td>
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
        <h4>Usage Examples:</h4>
        <pre style={{ overflow: 'auto' }}>
{`// DNS Prefetch
prefetchDNS('https://api.example.com');

// Preconnect
preconnect('https://cdn.example.com', {
  crossOrigin: 'anonymous'
});

// Preload
preload('/critical.css', {
  as: 'style',
  fetchPriority: 'high'
});

// Preinit
preinit('/app.js', {
  as: 'script',
  precedence: 'high'
});`}
        </pre>
      </div>
    </div>
  );
}
