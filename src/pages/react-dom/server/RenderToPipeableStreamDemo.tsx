import { useState } from 'react';

/**
 * renderToPipeableStream Demo
 * Node.js-only streaming API for SSR with Suspense support
 */

// Simulated async component
function AsyncData({ delay, label }: { delay: number; label: string }) {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(`${label} loaded after ${delay}ms`);
      setLoading(false);
    }, delay);
  };

  return (
    <div style={{
      padding: '15px',
      margin: '10px 0',
      backgroundColor: '#e3f2fd',
      borderRadius: '8px',
      border: '2px solid #2196F3'
    }}>
      <h4 style={{ marginTop: 0 }}>{label}</h4>
      {!data && !loading && (
        <button
          onClick={loadData}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Load Data
        </button>
      )}
      {loading && <p>Loading...</p>}
      {data && <p style={{ color: '#1565c0', fontWeight: 'bold' }}>{data}</p>}
    </div>
  );
}

export default function RenderToPipeableStreamDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>renderToPipeableStream Demo</h2>

      <section style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        border: '2px solid #ffc107',
        borderRadius: '8px'
      }}>
        <h3>⚠️ Node.js Only API</h3>
        <p>
          <code>renderToPipeableStream</code>은 <strong>Node.js 환경에서만</strong> 사용 가능한 서버 API입니다.
          브라우저에서는 실행할 수 없으며, 이 데모는 API 사용법과 개념을 설명합니다.
        </p>
      </section>

      <section style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px'
      }}>
        <h3>📘 What is renderToPipeableStream?</h3>
        <p>Node.js에서 React 컴포넌트를 스트리밍 방식으로 렌더링하는 API입니다.</p>
        <ul>
          <li>✅ <strong>스트리밍:</strong> 콘텐츠를 준비되는 대로 전송</li>
          <li>✅ <strong>Suspense 지원:</strong> 비동기 컴포넌트 자연스럽게 처리</li>
          <li>✅ <strong>더 빠른 TTFB:</strong> 초기 HTML을 빠르게 전송</li>
          <li>✅ <strong>Progressive Rendering:</strong> 점진적으로 콘텐츠 표시</li>
          <li>⚠️ <strong>Node.js 전용:</strong> Web Streams 환경에서는 renderToReadableStream 사용</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>💡 Streaming Concept Demo</h3>
        <p>실제 스트리밍 동작을 시뮬레이션한 데모입니다:</p>
        <AsyncData delay={1000} label="Fast Component" />
        <AsyncData delay={2000} label="Medium Component" />
        <AsyncData delay={3000} label="Slow Component" />
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px'
        }}>
          <p><strong>💡 Streaming 개념:</strong></p>
          <p>
            일반 renderToString은 모든 컴포넌트가 로드될 때까지 기다립니다 (3초).
            renderToPipeableStream은 준비된 것부터 즉시 전송합니다 (1초, 2초, 3초).
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>📝 Basic Usage (Node.js Server)</h3>
        <pre style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '15px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { renderToPipeableStream } from 'react-dom/server';
import { Suspense } from 'react';

// Express.js example
app.get('/', (req, res) => {
  const { pipe, abort } = renderToPipeableStream(
    <html>
      <body>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </body>
    </html>,
    {
      // Called when the shell is ready
      onShellReady() {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        pipe(res);
      },

      // Called when all content is ready
      onAllReady() {
        console.log('All content rendered');
      },

      // Called on errors
      onError(error) {
        console.error(error);
        res.statusCode = 500;
      },

      // Called when a segment is ready
      onShellError(error) {
        res.statusCode = 500;
        res.send('<h1>Server Error</h1>');
      }
    }
  );

  // Abort after timeout
  setTimeout(abort, 10000);
});`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🔄 Streaming Process</h3>
        <div style={{ position: 'relative', padding: '20px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {/* Step 1 */}
            <div style={{
              padding: '15px',
              backgroundColor: '#e8f5e9',
              borderLeft: '4px solid #4CAF50',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                1️⃣ Shell Ready (즉시)
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                기본 HTML 구조와 Suspense fallback 전송
              </div>
              <pre style={{
                backgroundColor: '#f5f5f5',
                padding: '8px',
                marginTop: '8px',
                fontSize: '12px',
                borderRadius: '4px'
              }}>
{`<div id="root">
  <div>Loading...</div> <!-- Suspense fallback -->
</div>`}
              </pre>
            </div>

            {/* Step 2 */}
            <div style={{
              padding: '15px',
              backgroundColor: '#e3f2fd',
              borderLeft: '4px solid #2196F3',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                2️⃣ Fast Component Ready (1초 후)
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                빠른 컴포넌트 먼저 스트리밍
              </div>
              <pre style={{
                backgroundColor: '#f5f5f5',
                padding: '8px',
                marginTop: '8px',
                fontSize: '12px',
                borderRadius: '4px'
              }}>
{`<script>
  // Replace suspense boundary with actual content
  document.getElementById('B:0').outerHTML = '<div>Fast Content</div>';
</script>`}
              </pre>
            </div>

            {/* Step 3 */}
            <div style={{
              padding: '15px',
              backgroundColor: '#f3e5f5',
              borderLeft: '4px solid #9C27B0',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                3️⃣ Slow Component Ready (3초 후)
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                느린 컴포넌트 마지막에 스트리밍
              </div>
              <pre style={{
                backgroundColor: '#f5f5f5',
                padding: '8px',
                marginTop: '8px',
                fontSize: '12px',
                borderRadius: '4px'
              }}>
{`<script>
  // Replace remaining suspense boundary
  document.getElementById('B:1').outerHTML = '<div>Slow Content</div>';
</script>`}
              </pre>
            </div>

            {/* Step 4 */}
            <div style={{
              padding: '15px',
              backgroundColor: '#fce4ec',
              borderLeft: '4px solid #E91E63',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                4️⃣ All Ready
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                모든 콘텐츠 전송 완료, 스트림 종료
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🎯 Advanced Example with Suspense</h3>
        <pre style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '15px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { renderToPipeableStream } from 'react-dom/server';
import { Suspense, lazy } from 'react';

// Lazy components
const Comments = lazy(() => import('./Comments'));
const Recommendations = lazy(() => import('./Recommendations'));

function App() {
  return (
    <div>
      {/* Critical content - rendered immediately */}
      <Header />
      <MainContent />

      {/* Non-critical - can be streamed later */}
      <Suspense fallback={<CommentsLoader />}>
        <Comments />
      </Suspense>

      <Suspense fallback={<RecsLoader />}>
        <Recommendations />
      </Suspense>

      <Footer />
    </div>
  );
}

// Server
app.get('/', (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    // Stream as soon as shell is ready
    onShellReady() {
      res.setHeader('Content-Type', 'text/html');
      pipe(res);
    },

    // Bootstrap scripts for hydration
    bootstrapScripts: ['/client.js'],

    // Error handling
    onError(err) {
      console.error(err);
    }
  });
});`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>⚖️ renderToString vs renderToPipeableStream</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>renderToString</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>renderToPipeableStream</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>렌더링 방식</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>동기 (모두 기다림)</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>스트리밍 (준비되는 대로)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Suspense</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>❌ 미지원</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>✅ 지원</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>TTFB</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>느림 (모든 렌더링 후)</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>빠름 (shell 즉시)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>복잡도</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>낮음</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>높음</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>사용 사례</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>간단한 SSR</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>대규모, 복잡한 SSR</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>💡 Best Practices</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginTop: 0, color: '#4CAF50' }}>✅ DO</h4>
            <ul>
              <li>중요 콘텐츠는 shell에 포함</li>
              <li>무거운 컴포넌트는 Suspense로 래핑</li>
              <li>적절한 timeout 설정 (abort)</li>
              <li>에러 처리 콜백 구현</li>
              <li>Bootstrap scripts로 hydration 준비</li>
            </ul>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginTop: 0, color: '#f44336' }}>❌ DON'T</h4>
            <ul>
              <li>모든 것을 Suspense로 래핑하지 말 것</li>
              <li>브라우저에서 실행 시도하지 말 것</li>
              <li>에러 핸들링 생략하지 말 것</li>
              <li>onShellError 무시하지 말 것</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🔧 Framework Support</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px'
        }}>
          <p><strong>Next.js:</strong> App Router에서 자동으로 사용됨</p>
          <p><strong>Remix:</strong> 기본 렌더링 방식</p>
          <p><strong>Custom:</strong> Express/Fastify 등에서 직접 구현 가능</p>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>⚠️ Important Notes</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px'
        }}>
          <ul style={{ marginBottom: 0 }}>
            <li><strong>Node.js 전용:</strong> 브라우저나 Edge 런타임에서는 사용 불가</li>
            <li><strong>복잡도 증가:</strong> 디버깅과 에러 처리가 어려울 수 있음</li>
            <li><strong>Hydration 필수:</strong> 클라이언트 JS 없으면 인터랙션 불가</li>
            <li><strong>SEO:</strong> 스트리밍 중에도 크롤러가 대기할 수 있음</li>
          </ul>
        </div>
      </section>

      <section>
        <h3>📚 API Signature</h3>
        <pre style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '15px',
          borderRadius: '8px',
          overflow: 'auto'
        }}>
{`import { renderToPipeableStream } from 'react-dom/server';

const { pipe, abort } = renderToPipeableStream(
  reactNode: ReactNode,
  options?: {
    onShellReady?: () => void;
    onShellError?: (error: Error) => void;
    onAllReady?: () => void;
    onError?: (error: Error) => void;
    bootstrapScripts?: string[];
    bootstrapScriptContent?: string;
    identifierPrefix?: string;
    namespaceURI?: string;
    nonce?: string;
    progressiveChunkSize?: number;
  }
): {
  pipe: (destination: NodeJS.WritableStream) => void;
  abort: (reason?: any) => void;
};`}
        </pre>
      </section>
    </div>
  );
}
