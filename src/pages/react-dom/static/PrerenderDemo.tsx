import { useState } from 'react';

/**
 * prerender Demo
 * Demonstrates the prerender API for static site generation
 */

export default function PrerenderDemo() {
  const [showExample, setShowExample] = useState<'basic' | 'suspense' | 'build'>('basic');

  return (
    <div style={{ padding: '20px' }}>
      <h2>prerender API Demo</h2>

      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        border: '1px solid #ffc107'
      }}>
        <p><strong>⚠️ Experimental API:</strong></p>
        <p>
          <code>prerender</code>는 실험적 API로, React의 static site generation을 위한 기능입니다.
        </p>
        <p>이 API는 브라우저 환경에서 직접 실행할 수 없으며, 빌드 타임에 Node.js 환경에서 사용됩니다.</p>
      </div>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. What is prerender?</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <p>
            <strong>prerender</strong>는 React 컴포넌트를 정적 HTML로 사전 렌더링하는 API입니다.
          </p>
          <p><strong>목적:</strong> Static Site Generation (SSG), 빌드 타임 렌더링</p>
          <p><strong>반환값:</strong> Promise&lt;{'{ prelude: string }'}&gt;</p>
          <p><strong>용도:</strong> 중소형 정적 페이지 생성</p>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>2. Code Examples</h3>
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={() => setShowExample('basic')}
            style={{
              marginRight: '10px',
              padding: '8px 16px',
              backgroundColor: showExample === 'basic' ? '#2196f3' : '#f0f0f0',
              color: showExample === 'basic' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Basic Usage
          </button>
          <button
            onClick={() => setShowExample('suspense')}
            style={{
              marginRight: '10px',
              padding: '8px 16px',
              backgroundColor: showExample === 'suspense' ? '#2196f3' : '#f0f0f0',
              color: showExample === 'suspense' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            With Suspense
          </button>
          <button
            onClick={() => setShowExample('build')}
            style={{
              padding: '8px 16px',
              backgroundColor: showExample === 'build' ? '#2196f3' : '#f0f0f0',
              color: showExample === 'build' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Build Script
          </button>
        </div>

        {showExample === 'basic' && (
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f8f8',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            <h4>Basic Usage:</h4>
            <pre style={{
              overflow: 'auto',
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '4px',
              fontSize: '13px'
            }}>
{`import { prerender } from 'react-dom/static';

// Component to prerender
function BlogPost({ title, content }) {
  return (
    <article>
      <h1>{title}</h1>
      <div>{content}</div>
    </article>
  );
}

// Prerender at build time
async function generateStaticPage() {
  const result = await prerender(
    <BlogPost
      title="My First Post"
      content="Hello World!"
    />
  );

  // result.prelude contains prerendered HTML
  const { prelude } = result;

  console.log(prelude);
  // Output: <article><h1>My First Post</h1><div>Hello World!</div></article>

  return prelude;
}`}
            </pre>
          </div>
        )}

        {showExample === 'suspense' && (
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f8f8',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            <h4>With Suspense & Async Data:</h4>
            <pre style={{
              overflow: 'auto',
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '4px',
              fontSize: '13px'
            }}>
{`import { prerender } from 'react-dom/static';
import { Suspense } from 'react';

// Async component
async function UserProfile({ userId }) {
  const user = await fetchUser(userId);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

// Prerender with Suspense
async function prerenderWithSuspense() {
  const result = await prerender(
    <Suspense fallback={<Loading />}>
      <UserProfile userId={123} />
    </Suspense>,
    {
      // Optional: timeout signal
      signal: AbortSignal.timeout(5000) // 5 second timeout
    }
  );

  return result.prelude;
}

// Usage
try {
  const html = await prerenderWithSuspense();
  console.log('Generated HTML:', html);
} catch (error) {
  console.error('Prerender failed:', error);
}`}
            </pre>
          </div>
        )}

        {showExample === 'build' && (
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f8f8',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            <h4>Complete Build Script Example:</h4>
            <pre style={{
              overflow: 'auto',
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '4px',
              fontSize: '13px'
            }}>
{`// scripts/build-static.js
import { prerender } from 'react-dom/static';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Pages to generate
const pages = [
  { path: '/', component: <HomePage />, title: 'Home' },
  { path: '/about', component: <AboutPage />, title: 'About' },
  { path: '/blog', component: <BlogPage />, title: 'Blog' },
];

// HTML template
function createHTML(content, title) {
  return \`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>\${title} - My Site</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <div id="root">\${content}</div>
    <script src="/bundle.js"></script>
  </body>
</html>\`;
}

// Build function
async function buildStaticSite() {
  console.log('🏗️  Building static site...');

  for (const page of pages) {
    try {
      console.log(\`📄 Generating \${page.path}...\`);

      // Prerender component
      const result = await prerender(page.component);

      // Create output directory
      const outputDir = join('dist', page.path);
      mkdirSync(outputDir, { recursive: true });

      // Create full HTML
      const html = createHTML(result.prelude, page.title);

      // Write to file
      const outputPath = join(outputDir, 'index.html');
      writeFileSync(outputPath, html);

      console.log(\`✅ Generated \${page.path}\`);
    } catch (error) {
      console.error(\`❌ Failed to generate \${page.path}:\`, error);
      process.exit(1);
    }
  }

  console.log('✨ Static site built successfully!');
}

// Run build
buildStaticSite().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});`}
            </pre>
          </div>
        )}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>3. Use Cases</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px'
        }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px',
            border: '2px solid #4caf50'
          }}>
            <h4>📝 Blog Posts</h4>
            <p>정적 블로그 포스트 페이지 생성</p>
            <ul style={{ fontSize: '14px', marginBottom: 0 }}>
              <li>빠른 로딩</li>
              <li>SEO 최적화</li>
              <li>CDN 캐싱</li>
            </ul>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            border: '2px solid #2196f3'
          }}>
            <h4>📚 Documentation</h4>
            <p>문서 사이트 페이지 생성</p>
            <ul style={{ fontSize: '14px', marginBottom: 0 }}>
              <li>빌드 타임 렌더링</li>
              <li>검색 최적화</li>
              <li>버전 관리</li>
            </ul>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#fff3e0',
            borderRadius: '8px',
            border: '2px solid #ff9800'
          }}>
            <h4>🏪 Product Pages</h4>
            <p>E-commerce 상품 페이지</p>
            <ul style={{ fontSize: '14px', marginBottom: 0 }}>
              <li>즉시 로딩</li>
              <li>검색 노출</li>
              <li>공유 최적화</li>
            </ul>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f3e5f5',
            borderRadius: '8px',
            border: '2px solid #9c27b0'
          }}>
            <h4>🎨 Marketing Pages</h4>
            <p>랜딩 페이지 생성</p>
            <ul style={{ fontSize: '14px', marginBottom: 0 }}>
              <li>빠른 FCP</li>
              <li>전환율 최적화</li>
              <li>A/B 테스트</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>4. Features & Benefits</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#e8f5e9',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <h4>✅ Advantages:</h4>
          <ul>
            <li><strong>Fast Loading:</strong> 사전 렌더링된 HTML로 즉시 표시</li>
            <li><strong>SEO Friendly:</strong> 검색 엔진이 콘텐츠 크롤링 가능</li>
            <li><strong>CDN Cache:</strong> 정적 파일로 CDN 캐싱 가능</li>
            <li><strong>Suspense Support:</strong> Suspense를 사용한 데이터 로딩</li>
            <li><strong>React Native:</strong> 순수 React API, 별도 프레임워크 불필요</li>
          </ul>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#fff3e0',
          borderRadius: '4px'
        }}>
          <h4>⚠️ Limitations:</h4>
          <ul style={{ marginBottom: 0 }}>
            <li><strong>Node.js Only:</strong> 브라우저에서 실행 불가</li>
            <li><strong>Build Time:</strong> 빌드 시에만 실행 (런타임 X)</li>
            <li><strong>No Client State:</strong> 클라이언트 전용 상태/이벤트 비활성</li>
            <li><strong>Memory Usage:</strong> 전체 HTML을 메모리에 로드</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>5. vs Other Solutions</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Solution</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Approach</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><strong>prerender</strong></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>React 네이티브 SSG</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>순수 React 정적 사이트</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><strong>Next.js</strong></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>프레임워크 통합</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>풀스택 애플리케이션</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><strong>Gatsby</strong></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>GraphQL 기반</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>콘텐츠 중심 사이트</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}><strong>renderToString</strong></td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>동기 렌더링</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>레거시 SSR</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>6. Important Notes</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          border: '1px solid #f44336'
        }}>
          <ul style={{ marginBottom: 0 }}>
            <li><strong>Experimental API:</strong> 프로덕션 사용 시 주의 (API 변경 가능)</li>
            <li><strong>Node.js Environment:</strong> Node.js v18+ 필요</li>
            <li><strong>Async Components:</strong> Suspense와 함께 async 컴포넌트 지원</li>
            <li><strong>Error Handling:</strong> try-catch로 에러 처리 필수</li>
            <li><strong>Data Fetching:</strong> 모든 데이터는 빌드 시 fetch되어야 함</li>
          </ul>
        </div>
      </section>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px'
      }}>
        <h4>Quick Reference:</h4>
        <pre style={{ overflow: 'auto' }}>
{`import { prerender } from 'react-dom/static';

// Basic usage
const { prelude } = await prerender(<App />);

// With options
const { prelude } = await prerender(<App />, {
  signal: AbortSignal.timeout(5000)
});

// With Suspense
const { prelude } = await prerender(
  <Suspense fallback={<Loading />}>
    <AsyncComponent />
  </Suspense>
);`}
        </pre>
      </div>
    </div>
  );
}
