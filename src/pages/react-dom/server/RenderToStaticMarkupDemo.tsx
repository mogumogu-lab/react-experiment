import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * renderToStaticMarkup Demo
 * Renders React components to clean HTML without React attributes
 */

// Email template component
function EmailTemplate({ userName, actionUrl, expiryHours }: {
  userName: string;
  actionUrl: string;
  expiryHours: number;
}) {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#333',
          fontSize: '24px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Welcome, {userName}!
        </h1>
        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
          Thank you for signing up. Please verify your email address by clicking the button below.
        </p>
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={actionUrl}
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              backgroundColor: '#2196F3',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Verify Email
          </a>
        </div>
        <p style={{
          color: '#999',
          fontSize: '14px',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          This link expires in {expiryHours} hours.
        </p>
      </div>
    </div>
  );
}

// Static blog post component
function BlogPost({ title, author, date, content }: {
  title: string;
  author: string;
  date: string;
  content: string;
}) {
  return (
    <article style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Georgia, serif'
    }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px', color: '#333' }}>{title}</h1>
        <div style={{ color: '#666', fontSize: '14px' }}>
          By <strong>{author}</strong> on {date}
        </div>
      </header>
      <div style={{
        fontSize: '18px',
        lineHeight: '1.8',
        color: '#444',
        whiteSpace: 'pre-wrap'
      }}>
        {content}
      </div>
    </article>
  );
}

// Invoice component
function Invoice({ invoiceNumber, items, total }: {
  invoiceNumber: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
}) {
  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #ddd'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>INVOICE</h1>
      <p style={{ fontSize: '14px', color: '#666' }}>Invoice #: {invoiceNumber}</p>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Item</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Qty</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Price</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{item.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>
                ${(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: '2px solid #333' }}>
            <td colSpan={3} style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
              TOTAL:
            </td>
            <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', fontSize: '18px' }}>
              ${total.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default function RenderToStaticMarkupDemo() {
  const [htmlOutput, setHtmlOutput] = useState('');
  const [renderTime, setRenderTime] = useState(0);
  const [htmlSize, setHtmlSize] = useState(0);
  const [selectedExample, setSelectedExample] = useState('');

  const emailData = {
    userName: 'John Doe',
    actionUrl: 'https://example.com/verify?token=abc123',
    expiryHours: 24
  };

  const blogData = {
    title: 'Understanding React Server-Side Rendering',
    author: 'Jane Smith',
    date: 'October 7, 2025',
    content: `Server-Side Rendering (SSR) has become an essential technique in modern web development. It allows applications to render React components on the server and send fully formed HTML to the client.

This approach offers several benefits:
- Improved SEO as search engines can crawl the content
- Faster initial page load times
- Better performance on low-powered devices

When using renderToStaticMarkup, you get clean HTML without any React-specific attributes, making it perfect for static content, email templates, and scenarios where you don't need client-side hydration.`
  };

  const invoiceData = {
    invoiceNumber: 'INV-2025-001',
    items: [
      { name: 'Web Development Service', quantity: 40, price: 150 },
      { name: 'Design Consultation', quantity: 10, price: 200 },
      { name: 'Server Hosting (Annual)', quantity: 1, price: 500 }
    ],
    total: 8500
  };

  const renderEmail = () => {
    setSelectedExample('email');
    const startTime = performance.now();
    const html = renderToStaticMarkup(<EmailTemplate {...emailData} />);
    const endTime = performance.now();

    setHtmlOutput(html);
    setRenderTime(endTime - startTime);
    setHtmlSize(new Blob([html]).size);
  };

  const renderBlog = () => {
    setSelectedExample('blog');
    const startTime = performance.now();
    const html = renderToStaticMarkup(<BlogPost {...blogData} />);
    const endTime = performance.now();

    setHtmlOutput(html);
    setRenderTime(endTime - startTime);
    setHtmlSize(new Blob([html]).size);
  };

  const renderInvoice = () => {
    setSelectedExample('invoice');
    const startTime = performance.now();
    const html = renderToStaticMarkup(<Invoice {...invoiceData} />);
    const endTime = performance.now();

    setHtmlOutput(html);
    setRenderTime(endTime - startTime);
    setHtmlSize(new Blob([html]).size);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>renderToStaticMarkup Demo</h2>

      <section style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f3e5f5',
        borderRadius: '8px'
      }}>
        <h3>📘 What is renderToStaticMarkup?</h3>
        <p><code>renderToStaticMarkup</code>은 React 컴포넌트를 순수 HTML로 렌더링합니다.</p>
        <ul>
          <li>✅ <strong>순수 HTML:</strong> React 속성이 전혀 포함되지 않음</li>
          <li>✅ <strong>작은 크기:</strong> 불필요한 속성이 없어 파일 크기 감소</li>
          <li>✅ <strong>정적 콘텐츠에 최적:</strong> 이메일, PDF, RSS 피드 등</li>
          <li>❌ <strong>Hydration 불가:</strong> 클라이언트에서 React로 이어받을 수 없음</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🎯 Example Templates</h3>
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={renderEmail}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📧 Email Template
          </button>
          <button
            onClick={renderBlog}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: '#673AB7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📝 Blog Post
          </button>
          <button
            onClick={renderInvoice}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3F51B5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🧾 Invoice
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
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9C27B0' }}>
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
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#673AB7' }}>
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
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3F51B5' }}>
              {(htmlSize / 1024).toFixed(2)} KB
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Size in KB</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>📄 Generated HTML (Clean)</h3>
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
          {htmlOutput || 'Click a template button to see HTML output'}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>🎨 HTML Preview</h3>
        <div
          style={{
            padding: '20px',
            border: '2px dashed #9C27B0',
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
            <h4 style={{ marginTop: 0, color: '#9C27B0' }}>1. Email Templates</h4>
            <p>HTML 이메일 생성 - React로 작성, 깔끔한 HTML로 전송</p>
            <pre style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
{`import { renderToStaticMarkup } from 'react-dom/server';

const emailHtml = renderToStaticMarkup(
  <WelcomeEmail userName="John" />
);

await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: emailHtml
});`}
            </pre>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginTop: 0, color: '#673AB7' }}>2. Static Site Generation</h4>
            <p>블로그, 문서 사이트 등 정적 HTML 생성</p>
            <pre style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
{`// Generate static HTML files
posts.forEach(post => {
  const html = renderToStaticMarkup(
    <BlogLayout>
      <BlogPost {...post} />
    </BlogLayout>
  );

  fs.writeFileSync(\`dist/\${post.slug}.html\`, html);
});`}
            </pre>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginTop: 0, color: '#3F51B5' }}>3. PDF Generation</h4>
            <p>인보이스, 리포트 등 PDF로 변환할 HTML 생성</p>
            <pre style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
{`const html = renderToStaticMarkup(
  <Invoice data={invoiceData} />
);

// Convert to PDF using puppeteer or similar
const pdf = await htmlToPdf(html);
await fs.writeFile('invoice.pdf', pdf);`}
            </pre>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px'
          }}>
            <h4 style={{ marginTop: 0, color: '#009688' }}>4. RSS/XML Feeds</h4>
            <p>RSS 피드, sitemap 등 XML 기반 콘텐츠 생성</p>
            <pre style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
{`const rss = renderToStaticMarkup(
  <rss version="2.0">
    <channel>
      <title>My Blog</title>
      {posts.map(post => (
        <item key={post.id}>
          <title>{post.title}</title>
          <link>{post.url}</link>
        </item>
      ))}
    </channel>
  </rss>
);`}
            </pre>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>⚖️ renderToString vs renderToStaticMarkup</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>renderToString</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>renderToStaticMarkup</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>React 속성</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>✅ 포함</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>❌ 없음</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Hydration</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>✅ 가능</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>❌ 불가</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>파일 크기</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>큼</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>작음</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>사용 사례</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>SSR 앱</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>이메일, 정적 사이트</td>
            </tr>
          </tbody>
        </table>
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
            <li><strong>Hydration 불가:</strong> 클라이언트에서 React가 이어받을 수 없음</li>
            <li><strong>이벤트 핸들러 무효:</strong> onClick 등이 작동하지 않음</li>
            <li><strong>State 관리 불가:</strong> useState, useEffect 등이 의미 없음</li>
            <li><strong>완전 정적:</strong> 한 번 렌더링된 HTML은 변경 불가</li>
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
{`import { renderToStaticMarkup } from 'react-dom/server';

const html: string = renderToStaticMarkup(reactNode: ReactNode);

// Example
const html = renderToStaticMarkup(<EmailTemplate />);
// Returns: '<div><h1>Hello</h1></div>' (no React attributes)`}
        </pre>
      </section>
    </div>
  );
}
