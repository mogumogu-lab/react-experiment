import { useState } from 'react';

/**
 * renderToReadableStream Demo
 * Web Streams API for modern edge environments (Cloudflare Workers, Deno, etc.)
 */

// Simulated streaming component
function StreamingContent({ title, delay }: { title: string; delay: number }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setTimeout(() => setLoaded(true), delay);
  };

  return (
    <div style={{
      padding: '15px',
      margin: '10px 0',
      backgroundColor: loaded ? '#e8f5e9' : '#fff3cd',
      borderRadius: '8px',
      border: '2px solid ' + (loaded ? '#4CAF50' : '#ffc107')
    }}>
      <h4 style={{ marginTop: 0 }}>{title}</h4>
      {!loaded ? (
        <button
          onClick={handleLoad}
          style={{
            padding: '8px 16px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Simulate Load ({delay}ms)
        </button>
      ) : (
        <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>✅ Content Loaded</p>
      )}
    </div>
  );
}

export default function RenderToReadableStreamDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>renderToReadableStream Demo</h2>

      <section style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        border: '2px solid #ffc107',
        borderRadius: '8px'
      }}>
        <h3>⚠️ Web Streams API (Edge Runtime)</h3>
        <p>
          <code>renderToReadableStream</code>은 Web Streams API를 사용하는 환경에서만 동작합니다:
        </p>
        <ul>
          <li>✅ Cloudflare Workers</li>
          <li>✅ Deno Deploy</li>
          <li>✅ Vercel Edge Functions</li>
          <li>✅ Modern browsers (for experiments)</li>
          <li>❌ Node.js (use renderToPipeableStream instead)</li>
        </ul>
      </section>

      <section style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px'
      }}>
        <h3>📘 What is renderToReadableStream?</h3>
        <p>Web Streams 표준을 사용하여 React를 스트리밍 렌더링하는 API입니다.</p>
        <ul>
          <li>✅ <strong>Web Standards:</strong> WHATWG Streams API 기반</li>
          <li>✅ <strong>Edge Compatible:</strong> Edge 런타임에서 실행 가능</li>
          <li>✅ <strong>Suspense 지원:</strong> 비동기 컴포넌트 처리</li>
          <li>✅ <strong>Modern:</strong> 최신 웹 플랫폼 표준</li>
          <li>⚠️ <strong>Promise 기반:</strong> async/await 사용</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>💡 Streaming Concept Demo</h3>
        <p>Edge 환경에서의 스트리밍 렌더링 시뮬레이션:</p>
        <StreamingContent title="Hero Section" delay={500} />
        <StreamingContent title="Product List" delay={1500} />
        <StreamingContent title="User Reviews" delay={2500} />
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px'
        }}>
          <p><strong>💡 Edge Streaming:</strong></p>
          <p>
            Edge 환경에서 가까운 위치에서 즉시 응답하고,
            준비되는 대로 콘텐츠를 스트리밍하여 글로벌 사용자 경험을 개선합니다.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>📝 Basic Usage (Cloudflare Workers)</h3>
        <pre style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '15px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { renderToReadableStream } from 'react-dom/server';
import { Suspense } from 'react';

export default {
  async fetch(request) {
    const stream = await renderToReadableStream(
      <html>
        <body>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </body>
      </html>,
      {
        // Error handling
        onError(error) {
          console.error(error);
        },

        // Scripts to load for hydration
        bootstrapScripts: ['/client.js'],
      }
    );

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
};`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🌐 Vercel Edge Functions Example</h3>
        <pre style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '15px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`// api/ssr.tsx
import { renderToReadableStream } from 'react-dom/server';
import { App } from '../components/App';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/static/client.js'],
    onError(err) {
      console.error('SSR Error:', err);
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🦕 Deno Deploy Example</h3>
        <pre style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '15px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { renderToReadableStream } from 'react-dom/server';
import { serve } from 'https://deno.land/std/http/server.ts';

async function handler(req: Request): Promise<Response> {
  const stream = await renderToReadableStream(
    <html>
      <head>
        <title>Deno SSR</title>
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </body>
    </html>
  );

  return new Response(stream, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
}

serve(handler, { port: 8000 });`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🔄 Advanced: Streaming with Suspense</h3>
        <pre style={{
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '15px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { renderToReadableStream } from 'react-dom/server';
import { Suspense, lazy } from 'react';

// Lazy-loaded components
const UserProfile = lazy(() => import('./UserProfile'));
const Recommendations = lazy(() => import('./Recommendations'));
const Comments = lazy(() => import('./Comments'));

function App({ userId }: { userId: string }) {
  return (
    <div>
      {/* Critical - rendered immediately */}
      <Header />
      <Navigation />

      {/* Important - high priority suspense */}
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile userId={userId} />
      </Suspense>

      {/* Less critical - lower priority */}
      <Suspense fallback={<RecsSkeleton />}>
        <Recommendations userId={userId} />
      </Suspense>

      {/* Non-critical - lowest priority */}
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments userId={userId} />
      </Suspense>

      <Footer />
    </div>
  );
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId') || 'default';

  const stream = await renderToReadableStream(
    <App userId={userId} />,
    {
      onError(error) {
        console.error('Streaming error:', error);
      }
    }
  );

  return new Response(stream, {
    headers: { 'Content-Type': 'text/html' },
  });
}`}
        </pre>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>⚖️ renderToPipeableStream vs renderToReadableStream</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>renderToPipeableStream</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>renderToReadableStream</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>환경</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Node.js</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Web Streams (Edge)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>API 스타일</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Callback 기반</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Promise 기반</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>스트리밍</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>✅ Node Streams</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>✅ Web Streams</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Suspense</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>✅ 지원</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>✅ 지원</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>사용 사례</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>전통적 서버</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Edge 환경</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🌍 Edge Computing Benefits</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px',
            borderLeft: '4px solid #4CAF50'
          }}>
            <h4 style={{ marginTop: 0, color: '#2e7d32' }}>⚡ Lower Latency</h4>
            <p>사용자와 가까운 엣지 서버에서 실행되어 응답 시간 단축</p>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            borderLeft: '4px solid #2196F3'
          }}>
            <h4 style={{ marginTop: 0, color: '#1565c0' }}>🌐 Global Distribution</h4>
            <p>전 세계에 분산된 엣지 네트워크에서 자동 실행</p>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f3e5f5',
            borderRadius: '8px',
            borderLeft: '4px solid #9C27B0'
          }}>
            <h4 style={{ marginTop: 0, color: '#7b1fa2' }}>💰 Cost Effective</h4>
            <p>사용량 기반 과금, 유휴 비용 없음</p>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#fff3e0',
            borderRadius: '8px',
            borderLeft: '4px solid #FF9800'
          }}>
            <h4 style={{ marginTop: 0, color: '#e65100' }}>📈 Auto Scaling</h4>
            <p>트래픽에 따라 자동으로 확장/축소</p>
          </div>
        </div>
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
              <li>Static shell을 빠르게 전송</li>
              <li>비중요 콘텐츠는 Suspense로 래핑</li>
              <li>적절한 캐싱 헤더 설정</li>
              <li>에러 처리 구현</li>
              <li>Bootstrap scripts 최적화</li>
            </ul>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginTop: 0, color: '#f44336' }}>❌ DON'T</h4>
            <ul>
              <li>Node.js에서 사용하지 말 것</li>
              <li>과도한 Suspense boundary 생성하지 말 것</li>
              <li>대용량 데이터를 inline하지 말 것</li>
              <li>에러를 무시하지 말 것</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🔧 Platform Support</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#e0e0e0' }}>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Platform</th>
                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Support</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>Cloudflare Workers</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>✅ Full</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>Deno Deploy</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>✅ Full</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>Vercel Edge Functions</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>✅ Full</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>Netlify Edge Functions</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>✅ Full</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>Node.js</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>❌ Use renderToPipeableStream</td>
              </tr>
            </tbody>
          </table>
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
            <li><strong>Web Streams 전용:</strong> Node.js Streams와 호환 불가</li>
            <li><strong>Promise 기반:</strong> await을 사용해야 함</li>
            <li><strong>제한된 런타임:</strong> Edge 환경은 일부 Node API 미지원</li>
            <li><strong>cold start:</strong> 첫 요청이 약간 느릴 수 있음</li>
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
{`import { renderToReadableStream } from 'react-dom/server';

const stream: ReadableStream = await renderToReadableStream(
  reactNode: ReactNode,
  options?: {
    onError?: (error: Error) => void;
    bootstrapScripts?: string[];
    bootstrapScriptContent?: string;
    identifierPrefix?: string;
    namespaceURI?: string;
    nonce?: string;
    progressiveChunkSize?: number;
    signal?: AbortSignal;
  }
);

// Usage in Response
return new Response(stream, {
  headers: { 'Content-Type': 'text/html' }
});`}
        </pre>
      </section>
    </div>
  );
}
