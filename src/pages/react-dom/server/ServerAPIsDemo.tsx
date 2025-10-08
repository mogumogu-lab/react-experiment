import { useState } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

/**
 * Server APIs Demo
 * Demonstrates renderToString, renderToStaticMarkup
 * Note: renderToPipeableStream and renderToReadableStream are Node.js only
 */

// Sample components for rendering
function UserCard({ name, email, role }: { name: string; email: string; role: string }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{name}</h3>
      <p style={{ margin: '5px 0', color: '#666' }}>📧 {email}</p>
      <p style={{ margin: '5px 0', color: '#666' }}>💼 {role}</p>
    </div>
  );
}

function ProductList({ products }: { products: Array<{ id: number; name: string; price: number }> }) {
  return (
    <div style={{ padding: '10px' }}>
      <h3>Products</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li
            key={product.id}
            style={{
              padding: '10px',
              marginBottom: '8px',
              backgroundColor: '#e3f2fd',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>{product.name}</span>
            <strong>${product.price}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServerAPIsDemo() {
  const [renderType, setRenderType] = useState<'string' | 'static'>('string');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [htmlSize, setHtmlSize] = useState(0);

  const sampleUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Software Engineer'
  };

  const sampleProducts = [
    { id: 1, name: 'Laptop', price: 1299 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
  ];

  const renderUserCard = () => {
    const component = <UserCard {...sampleUser} />;
    let html = '';

    if (renderType === 'string') {
      html = renderToString(component);
    } else {
      html = renderToStaticMarkup(component);
    }

    setHtmlOutput(html);
    setHtmlSize(new Blob([html]).size);
  };

  const renderProductList = () => {
    const component = <ProductList products={sampleProducts} />;
    let html = '';

    if (renderType === 'string') {
      html = renderToString(component);
    } else {
      html = renderToStaticMarkup(component);
    }

    setHtmlOutput(html);
    setHtmlSize(new Blob([html]).size);
  };

  const renderComplexComponent = () => {
    const component = (
      <div>
        <UserCard {...sampleUser} />
        <ProductList products={sampleProducts} />
      </div>
    );
    let html = '';

    if (renderType === 'string') {
      html = renderToString(component);
    } else {
      html = renderToStaticMarkup(component);
    }

    setHtmlOutput(html);
    setHtmlSize(new Blob([html]).size);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Server APIs Demo</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. Render Method Selection</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <label style={{ marginRight: '20px' }}>
            <input
              type="radio"
              checked={renderType === 'string'}
              onChange={() => setRenderType('string')}
              style={{ marginRight: '5px' }}
            />
            renderToString (with React attributes)
          </label>
          <label>
            <input
              type="radio"
              checked={renderType === 'static'}
              onChange={() => setRenderType('static')}
              style={{ marginRight: '5px' }}
            />
            renderToStaticMarkup (clean HTML)
          </label>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>2. Render Examples</h3>
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={renderUserCard}
            style={{ marginRight: '10px' }}
          >
            Render User Card
          </button>
          <button
            onClick={renderProductList}
            style={{ marginRight: '10px' }}
          >
            Render Product List
          </button>
          <button onClick={renderComplexComponent}>
            Render Complex Component
          </button>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>3. Generated HTML</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#f8f8f8',
          border: '1px solid #ddd',
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          <p><strong>Size:</strong> {htmlSize} bytes</p>
          <p><strong>Method:</strong> {renderType === 'string' ? 'renderToString' : 'renderToStaticMarkup'}</p>
        </div>
        <div style={{
          padding: '15px',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '12px',
          overflow: 'auto',
          maxHeight: '300px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>
          {htmlOutput || 'Click a render button to see HTML output'}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>4. HTML Preview (Rendered)</h3>
        <div
          style={{
            padding: '15px',
            border: '2px dashed #666',
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>5. API Comparison</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>API</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Output</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Use Case</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Hydration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><code>renderToString</code></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>HTML with React attributes</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>SSR apps (with hydration)</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>✅ 가능</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><code>renderToStaticMarkup</code></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Clean HTML (no React)</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Static sites, emails</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>❌ 불가</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><code>renderToPipeableStream</code></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Streaming (Node.js)</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>SSR with Suspense</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>✅ 가능</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><code>renderToReadableStream</code></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Streaming (Web Streams)</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Edge/Deno/Cloudflare</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>✅ 가능</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>6. Key Differences</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <h4>renderToString</h4>
          <ul>
            <li>React 속성 포함 (data-reactroot 등)</li>
            <li>클라이언트에서 hydration 가능</li>
            <li>SSR 앱에 적합</li>
            <li>파일 크기 더 큼</li>
          </ul>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#f3e5f5',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <h4>renderToStaticMarkup</h4>
          <ul>
            <li>순수 HTML만 출력</li>
            <li>React 속성 없음</li>
            <li>정적 사이트, 이메일 템플릿에 적합</li>
            <li>파일 크기 더 작음</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>7. Streaming APIs (Node.js Only)</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          border: '1px solid #ffc107'
        }}>
          <p><strong>⚠️ Note:</strong> 다음 API들은 Node.js 환경에서만 사용 가능합니다:</p>

          <h4>renderToPipeableStream (Node.js)</h4>
          <pre style={{
            backgroundColor: '#f8f8f8',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    response.setHeader('content-type', 'text/html');
    pipe(response);
  },
  onError(error) {
    console.error(error);
  }
});`}
          </pre>

          <h4>renderToReadableStream (Web Streams)</h4>
          <pre style={{
            backgroundColor: '#f8f8f8',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`import { renderToReadableStream } from 'react-dom/server';

const stream = await renderToReadableStream(<App />, {
  onError(error) {
    console.error(error);
  }
});

return new Response(stream, {
  headers: { 'content-type': 'text/html' }
});`}
          </pre>
        </div>
      </section>

      <section>
        <h3>8. Performance Tips</h3>
        <ul>
          <li><strong>Streaming:</strong> 큰 앱은 renderToPipeableStream 사용 권장</li>
          <li><strong>Suspense:</strong> Streaming과 함께 사용하여 점진적 렌더링</li>
          <li><strong>Static:</strong> 정적 콘텐츠는 renderToStaticMarkup으로 크기 절약</li>
          <li><strong>Caching:</strong> 자주 사용되는 컴포넌트는 캐싱 고려</li>
        </ul>
      </section>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px'
      }}>
        <h4>Basic Usage:</h4>
        <pre style={{ overflow: 'auto' }}>
{`import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// With React attributes (for hydration)
const html = renderToString(<App />);

// Clean HTML (no hydration)
const staticHtml = renderToStaticMarkup(<EmailTemplate />);`}
        </pre>
      </div>
    </div>
  );
}
