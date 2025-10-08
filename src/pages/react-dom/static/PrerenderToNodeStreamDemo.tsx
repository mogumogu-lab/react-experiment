import { useState } from 'react';

/**
 * prerenderToNodeStream Demo
 * Demonstrates the prerenderToNodeStream API for efficient static site generation
 */

export default function PrerenderToNodeStreamDemo() {
  const [showExample, setShowExample] = useState<'basic' | 'large' | 'pipeline'>('basic');

  return (
    <div style={{ padding: '20px' }}>
      <h2>prerenderToNodeStream API Demo</h2>

      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        border: '1px solid #ffc107'
      }}>
        <p><strong>⚠️ Experimental API:</strong></p>
        <p>
          <code>prerenderToNodeStream</code>은 실험적 API로, 대용량 페이지의 효율적인 정적 생성을 위한 기능입니다.
        </p>
        <p>Node.js Stream을 사용하여 메모리 효율적으로 HTML을 생성합니다.</p>
      </div>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. What is prerenderToNodeStream?</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#f3e5f5',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <p>
            <strong>prerenderToNodeStream</strong>은 React 컴포넌트를 Node.js Stream으로 사전 렌더링하는 API입니다.
          </p>
          <p><strong>목적:</strong> 대용량 정적 페이지를 메모리 효율적으로 생성</p>
          <p><strong>반환값:</strong> Promise&lt;NodeJS.ReadableStream&gt;</p>
          <p><strong>용도:</strong> 대용량 콘텐츠, 보고서, 아카이브 페이지</p>
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
              backgroundColor: showExample === 'basic' ? '#9c27b0' : '#f0f0f0',
              color: showExample === 'basic' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Basic Usage
          </button>
          <button
            onClick={() => setShowExample('large')}
            style={{
              marginRight: '10px',
              padding: '8px 16px',
              backgroundColor: showExample === 'large' ? '#9c27b0' : '#f0f0f0',
              color: showExample === 'large' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Large Document
          </button>
          <button
            onClick={() => setShowExample('pipeline')}
            style={{
              padding: '8px 16px',
              backgroundColor: showExample === 'pipeline' ? '#9c27b0' : '#f0f0f0',
              color: showExample === 'pipeline' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Stream Pipeline
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
{`import { prerenderToNodeStream } from 'react-dom/static';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

// Component to prerender
function Article({ title, content }) {
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}

// Generate static page with streaming
async function generateStaticPage() {
  // Get stream from prerender
  const stream = await prerenderToNodeStream(
    <Article
      title="My Article"
      content="<p>Long content here...</p>"
    />
  );

  // Create output file stream
  const outputFile = createWriteStream('dist/article.html');

  // Pipe prerendered stream to file
  await pipeline(stream, outputFile);

  console.log('✅ Article generated successfully!');
}

// Usage
generateStaticPage().catch(console.error);`}
            </pre>
          </div>
        )}

        {showExample === 'large' && (
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f8f8',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            <h4>Large Document with Progress Tracking:</h4>
            <pre style={{
              overflow: 'auto',
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '4px',
              fontSize: '13px'
            }}>
{`import { prerenderToNodeStream } from 'react-dom/static';
import { createWriteStream } from 'fs';
import { Transform } from 'stream';

// Large data component
function Report({ data }) {
  return (
    <div>
      <h1>Annual Report</h1>
      {data.map(item => (
        <section key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <table>
            {/* Large table data */}
          </table>
        </section>
      ))}
    </div>
  );
}

// Track progress
class ProgressTracker extends Transform {
  constructor() {
    super();
    this.bytes = 0;
  }

  _transform(chunk, encoding, callback) {
    this.bytes += chunk.length;
    console.log(\`Progress: \${(this.bytes / 1024).toFixed(2)} KB\`);
    this.push(chunk);
    callback();
  }
}

// Generate large report
async function generateLargeReport(data) {
  console.log('🏗️  Generating large report...');

  const stream = await prerenderToNodeStream(
    <Report data={data} />,
    {
      signal: AbortSignal.timeout(30000), // 30s timeout
      onError(error) {
        console.error('Prerender error:', error);
      }
    }
  );

  const progressTracker = new ProgressTracker();
  const outputFile = createWriteStream('dist/report.html');

  // Pipeline: prerender -> progress -> file
  await pipeline(
    stream,
    progressTracker,
    outputFile
  );

  console.log(\`✅ Report generated: \${progressTracker.bytes} bytes\`);
}

// Usage with large dataset
const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  title: \`Section \${i + 1}\`,
  description: 'Long description...'
}));

generateLargeReport(largeDataset).catch(console.error);`}
            </pre>
          </div>
        )}

        {showExample === 'pipeline' && (
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f8f8',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            <h4>Advanced Stream Pipeline:</h4>
            <pre style={{
              overflow: 'auto',
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '4px',
              fontSize: '13px'
            }}>
{`import { prerenderToNodeStream } from 'react-dom/static';
import { createWriteStream, createGzip } from 'fs';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

// HTML wrapper transform
class HTMLWrapper extends Transform {
  constructor(title) {
    super();
    this.title = title;
    this.headerSent = false;
  }

  _transform(chunk, encoding, callback) {
    if (!this.headerSent) {
      const header = \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>\${this.title}</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div id="root">\`;

      this.push(header);
      this.headerSent = true;
    }

    this.push(chunk);
    callback();
  }

  _flush(callback) {
    const footer = \`  </div>
  <script src="/bundle.js"></script>
</body>
</html>\`;

    this.push(footer);
    callback();
  }
}

// Generate with compression and HTML wrapping
async function generateCompressedPage() {
  console.log('🏗️  Generating compressed page...');

  // 1. Prerender React component to stream
  const stream = await prerenderToNodeStream(
    <App />
  );

  // 2. Wrap with HTML template
  const wrapper = new HTMLWrapper('My App');

  // 3. Compress with gzip
  const gzip = createGzip({ level: 9 });

  // 4. Output file
  const outputFile = createWriteStream('dist/index.html.gz');

  // Pipeline: prerender -> wrap -> compress -> file
  await pipeline(
    stream,
    wrapper,
    gzip,
    outputFile
  );

  console.log('✅ Compressed page generated!');
}

// Usage
generateCompressedPage().catch(console.error);`}
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
            backgroundColor: '#fff3e0',
            borderRadius: '8px',
            border: '2px solid #ff9800'
          }}>
            <h4>📊 Large Reports</h4>
            <p>대용량 보고서 페이지</p>
            <ul style={{ fontSize: '14px', marginBottom: 0 }}>
              <li>메모리 효율적</li>
              <li>진행 상황 추적</li>
              <li>스트리밍 처리</li>
            </ul>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f3e5f5',
            borderRadius: '8px',
            border: '2px solid #9c27b0'
          }}>
            <h4>🗂️ Data Archives</h4>
            <p>아카이브 페이지 생성</p>
            <ul style={{ fontSize: '14px', marginBottom: 0 }}>
              <li>대용량 데이터</li>
              <li>낮은 메모리 사용</li>
              <li>압축 지원</li>
            </ul>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#e8eaf6',
            borderRadius: '8px',
            border: '2px solid #3f51b5'
          }}>
            <h4>📚 Documentation</h4>
            <p>대규모 문서 사이트</p>
            <ul style={{ fontSize: '14px', marginBottom: 0 }}>
              <li>수천 페이지 생성</li>
              <li>빠른 빌드</li>
              <li>낮은 리소스</li>
            </ul>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#e0f2f1',
            borderRadius: '8px',
            border: '2px solid #009688'
          }}>
            <h4>📈 Analytics Dashboards</h4>
            <p>정적 대시보드 생성</p>
            <ul style={{ fontSize: '14px', marginBottom: 0 }}>
              <li>차트/그래프</li>
              <li>대용량 테이블</li>
              <li>PDF 변환</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>4. prerender vs prerenderToNodeStream</h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '15px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>prerender</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>prerenderToNodeStream</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Return Type</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Promise&lt;Object&gt;</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Promise&lt;Stream&gt;</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Memory Usage</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>전체 메모리 로드</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>⚡ 스트리밍 (효율적)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Best For</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>중소형 페이지</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>대용량 페이지</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Processing</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>한번에 완성</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>청크 단위 처리</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Transform Support</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>❌ No</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>✅ Stream pipeline</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Progress Tracking</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>❌ No</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>✅ Yes</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>5. Stream Benefits</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#e8f5e9',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <h4>✅ Advantages:</h4>
          <ul>
            <li><strong>Memory Efficient:</strong> 전체 HTML을 메모리에 로드하지 않음</li>
            <li><strong>Scalable:</strong> 수 GB 크기의 페이지도 처리 가능</li>
            <li><strong>Pipeline:</strong> 변환, 압축 등 파이프라인 구성 가능</li>
            <li><strong>Progress:</strong> 실시간 진행 상황 추적</li>
            <li><strong>Error Recovery:</strong> 부분 실패 시 재시도 가능</li>
          </ul>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: '#fff3e0',
          borderRadius: '4px'
        }}>
          <h4>📋 Common Pipeline Steps:</h4>
          <ol style={{ marginBottom: 0 }}>
            <li><strong>Prerender:</strong> React → HTML stream</li>
            <li><strong>Wrap:</strong> HTML template 추가</li>
            <li><strong>Transform:</strong> 콘텐츠 변환/처리</li>
            <li><strong>Compress:</strong> Gzip/Brotli 압축</li>
            <li><strong>Output:</strong> 파일/네트워크 출력</li>
          </ol>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>6. Performance Tips</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px'
        }}>
          <ul style={{ marginBottom: 0 }}>
            <li><strong>Use Streams:</strong> 대용량 콘텐츠는 항상 스트리밍 사용</li>
            <li><strong>Timeout:</strong> AbortSignal로 타임아웃 설정</li>
            <li><strong>Compression:</strong> Gzip/Brotli로 파일 크기 절약</li>
            <li><strong>Parallel:</strong> 여러 페이지는 병렬로 생성</li>
            <li><strong>Error Handling:</strong> 각 스트림 단계에서 에러 처리</li>
          </ul>
        </div>
      </section>

      <section>
        <h3>7. Important Notes</h3>
        <div style={{
          padding: '15px',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          border: '1px solid #f44336'
        }}>
          <ul style={{ marginBottom: 0 }}>
            <li><strong>Experimental API:</strong> 프로덕션 사용 시 주의</li>
            <li><strong>Node.js Only:</strong> Node.js v18+ 필요</li>
            <li><strong>Stream Knowledge:</strong> Node.js Stream 이해 필요</li>
            <li><strong>Memory Management:</strong> 대용량 데이터 처리 시 주의</li>
            <li><strong>Backpressure:</strong> Stream backpressure 처리 필요</li>
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
{`import { prerenderToNodeStream } from 'react-dom/static';
import { pipeline } from 'stream/promises';

// Basic
const stream = await prerenderToNodeStream(<App />);
await pipeline(stream, outputFile);

// With options
const stream = await prerenderToNodeStream(<App />, {
  signal: AbortSignal.timeout(30000),
  onError: (error) => console.error(error)
});

// With pipeline
await pipeline(
  stream,
  transformStream,
  gzipStream,
  outputFile
);`}
        </pre>
      </div>
    </div>
  );
}
