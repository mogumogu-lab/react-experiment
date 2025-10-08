import { useState } from 'react';
import { renderToString } from 'react-dom/server';

/**
 * renderToString Demo
 * Renders a React component to HTML string with React attributes for hydration
 */

// Sample components
function ProfileCard({ name, avatar, bio, tags }: {
  name: string;
  avatar: string;
  bio: string;
  tags: string[];
}) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '400px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#4CAF50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          marginRight: '15px'
        }}>
          {avatar}
        </div>
        <h3 style={{ margin: 0, fontSize: '20px' }}>{name}</h3>
      </div>
      <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>{bio}</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {tags.map((tag, idx) => (
          <span
            key={idx}
            style={{
              padding: '4px 12px',
              backgroundColor: '#e3f2fd',
              borderRadius: '16px',
              fontSize: '12px',
              color: '#1976d2'
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function InteractiveCounter({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial);

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #2196F3',
      borderRadius: '8px',
      backgroundColor: '#f5f5f5',
      textAlign: 'center'
    }}>
      <h4 style={{ marginTop: 0 }}>Counter: {count}</h4>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '8px 16px',
          marginRight: '8px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Increment
      </button>
      <button
        onClick={() => setCount(count - 1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Decrement
      </button>
    </div>
  );
}

export default function RenderToStringDemo() {
  const [htmlOutput, setHtmlOutput] = useState('');
  const [renderTime, setRenderTime] = useState(0);
  const [htmlSize, setHtmlSize] = useState(0);
  const [showReactAttrs, setShowReactAttrs] = useState(false);

  const profile = {
    name: 'Sarah Johnson',
    avatar: '👩‍💻',
    bio: 'Full-stack developer passionate about React and TypeScript. Building scalable web applications.',
    tags: ['React', 'TypeScript', 'Node.js', 'GraphQL']
  };

  const renderProfile = () => {
    const startTime = performance.now();
    const html = renderToString(<ProfileCard {...profile} />);
    const endTime = performance.now();

    setHtmlOutput(html);
    setRenderTime(endTime - startTime);
    setHtmlSize(new Blob([html]).size);
  };

  const renderCounter = () => {
    const startTime = performance.now();
    const html = renderToString(<InteractiveCounter initial={10} />);
    const endTime = performance.now();

    setHtmlOutput(html);
    setRenderTime(endTime - startTime);
    setHtmlSize(new Blob([html]).size);
  };

  const renderComplex = () => {
    const startTime = performance.now();
    const html = renderToString(
      <div>
        <ProfileCard {...profile} />
        <div style={{ height: '20px' }} />
        <InteractiveCounter initial={5} />
      </div>
    );
    const endTime = performance.now();

    setHtmlOutput(html);
    setRenderTime(endTime - startTime);
    setHtmlSize(new Blob([html]).size);
  };

  // Extract React attributes from HTML
  const highlightedHtml = showReactAttrs && htmlOutput
    ? htmlOutput.replace(
        /(data-react[a-z-]*="[^"]*")/g,
        '<span style="background-color: #ffeb3b; color: #000;">$1</span>'
      )
    : htmlOutput;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>renderToString Demo</h2>

      <section style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px'
      }}>
        <h3>📘 What is renderToString?</h3>
        <p><code>renderToString</code>은 React 컴포넌트를 HTML 문자열로 렌더링합니다.</p>
        <ul>
          <li>✅ <strong>React 속성 포함:</strong> data-reactroot 등의 속성이 추가됨</li>
          <li>✅ <strong>Hydration 지원:</strong> 클라이언트에서 React가 이어받을 수 있음</li>
          <li>✅ <strong>SSR 앱에 적합:</strong> Server-Side Rendering의 표준 방식</li>
          <li>⚠️ <strong>동기 처리:</strong> 모든 컴포넌트를 즉시 렌더링 (Suspense 미지원)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🎯 Render Examples</h3>
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={renderProfile}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Render Profile Card
          </button>
          <button
            onClick={renderCounter}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Render Counter
          </button>
          <button
            onClick={renderComplex}
            style={{
              padding: '10px 20px',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Render Complex
          </button>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>📊 Output Statistics</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
              {renderTime.toFixed(2)}ms
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Render Time</div>
          </div>
          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
              {htmlSize} bytes
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>HTML Size</div>
          </div>
          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>
              {(htmlSize / 1024).toFixed(2)} KB
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Size in KB</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3>📄 Generated HTML</h3>
          <label style={{ fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={showReactAttrs}
              onChange={(e) => setShowReactAttrs(e.target.checked)}
              style={{ marginRight: '5px' }}
            />
            Highlight React Attributes
          </label>
        </div>
        <div style={{
          padding: '15px',
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px',
          overflow: 'auto',
          maxHeight: '400px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>
          {showReactAttrs ? (
            <div dangerouslySetInnerHTML={{ __html: highlightedHtml || 'Click a render button to see HTML output' }} />
          ) : (
            htmlOutput || 'Click a render button to see HTML output'
          )}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🎨 HTML Preview (Hydrated)</h3>
        <div
          style={{
            padding: '20px',
            border: '2px dashed #2196F3',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            minHeight: '100px'
          }}
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>💡 Use Cases</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginTop: 0, color: '#2196F3' }}>1. Server-Side Rendering (SSR)</h4>
            <p>Express/Next.js 서버에서 초기 HTML 생성</p>
            <pre style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
{`app.get('/', (req, res) => {
  const html = renderToString(<App />);
  res.send(\`
    <!DOCTYPE html>
    <html>
      <body>
        <div id="root">\${html}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  \`);
});`}
            </pre>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginTop: 0, color: '#4CAF50' }}>2. SEO Optimization</h4>
            <p>검색 엔진이 크롤할 수 있는 완전한 HTML 제공</p>
            <pre style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
{`// Meta tags and content are immediately visible
const html = renderToString(
  <ProductPage product={productData} />
);
// SEO crawlers see full content immediately`}
            </pre>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginTop: 0, color: '#FF9800' }}>3. Initial Page Load Performance</h4>
            <p>사용자가 즉시 콘텐츠를 볼 수 있음 (FCP/LCP 개선)</p>
            <pre style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
{`// User sees content immediately
// React hydrates in background
const html = renderToString(<Dashboard data={data} />);
// Then: hydrateRoot(container, <Dashboard data={data} />);`}
            </pre>
          </div>
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
            <li><strong>동기 처리:</strong> 모든 렌더링이 완료될 때까지 블로킹됨</li>
            <li><strong>Suspense 미지원:</strong> 비동기 컴포넌트는 streaming API 사용 필요</li>
            <li><strong>이벤트 핸들러 미작동:</strong> 서버 HTML에서는 클릭 등이 작동 안 함 (hydration 필요)</li>
            <li><strong>useEffect 미실행:</strong> 서버에서는 effect가 실행되지 않음</li>
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
{`import { renderToString } from 'react-dom/server';

const html: string = renderToString(reactNode: ReactNode);

// Example
const html = renderToString(<App />);
// Returns: '<div data-reactroot="">...</div>'`}
        </pre>
      </section>
    </div>
  );
}
