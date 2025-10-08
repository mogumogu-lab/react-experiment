import { useState } from 'react';

/**
 * DivDemo - Examples of <div> component usage
 * Reference: https://react.dev/reference/react-dom/components/div
 */
export default function DivDemo() {
  const [activeSection, setActiveSection] = useState<string>('intro');

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;div&gt; Component Examples</h1>

      {/* Basic div usage */}
      <section>
        <h2>1. Basic Usage</h2>
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <p>This is a simple div with some styling.</p>
        </div>
      </section>

      {/* Div with event handlers */}
      <section>
        <h2>2. Interactive Div with Event Handlers</h2>
        <div
          onClick={() => alert('Div clicked!')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          style={{
            padding: '20px',
            border: '2px dashed #666',
            cursor: 'pointer',
            borderRadius: '8px',
            marginBottom: '16px',
            transition: 'background-color 0.3s'
          }}
        >
          <p>Hover over me or click me!</p>
        </div>
      </section>

      {/* Div with ref */}
      <section>
        <h2>3. Conditional Rendering with Divs</h2>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => setActiveSection('intro')}
            style={{ marginRight: '8px', padding: '8px 16px' }}
          >
            Intro
          </button>
          <button
            onClick={() => setActiveSection('details')}
            style={{ marginRight: '8px', padding: '8px 16px' }}
          >
            Details
          </button>
          <button
            onClick={() => setActiveSection('summary')}
            style={{ padding: '8px 16px' }}
          >
            Summary
          </button>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          {activeSection === 'intro' && (
            <div>
              <h3>Introduction</h3>
              <p>This is the introduction section.</p>
            </div>
          )}
          {activeSection === 'details' && (
            <div>
              <h3>Details</h3>
              <p>Here are the detailed information.</p>
            </div>
          )}
          {activeSection === 'summary' && (
            <div>
              <h3>Summary</h3>
              <p>This is the summary of everything.</p>
            </div>
          )}
        </div>
      </section>

      {/* Nested divs for layout */}
      <section>
        <h2>4. Layout with Nested Divs</h2>
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div style={{
            flex: 1,
            padding: '16px',
            backgroundColor: '#ffebee',
            borderRadius: '8px'
          }}>
            <h3>Column 1</h3>
            <p>First column content</p>
          </div>
          <div style={{
            flex: 1,
            padding: '16px',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px'
          }}>
            <h3>Column 2</h3>
            <p>Second column content</p>
          </div>
          <div style={{
            flex: 1,
            padding: '16px',
            backgroundColor: '#fff3e0',
            borderRadius: '8px'
          }}>
            <h3>Column 3</h3>
            <p>Third column content</p>
          </div>
        </div>
      </section>

      {/* Div with className and data attributes */}
      <section>
        <h2>5. Div with Data Attributes</h2>
        <div
          data-testid="custom-div"
          data-section="example"
          className="custom-container"
          style={{
            padding: '16px',
            border: '1px solid #9c27b0',
            borderRadius: '8px',
            marginBottom: '16px'
          }}
        >
          <p>This div has data attributes for testing and custom attributes.</p>
          <code>data-testid="custom-div" data-section="example"</code>
        </div>
      </section>

      {/* Div with dangerouslySetInnerHTML (use with caution) */}
      <section>
        <h2>6. Div with HTML Content (dangerouslySetInnerHTML)</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: '<strong>Bold text</strong> and <em>italic text</em> rendered from HTML string'
          }}
          style={{
            padding: '16px',
            backgroundColor: '#fff9c4',
            borderRadius: '8px',
            marginBottom: '16px'
          }}
        />
        <p style={{ fontSize: '12px', color: '#666' }}>
          ⚠️ Use dangerouslySetInnerHTML carefully - only with trusted content!
        </p>
      </section>

      {/* Scrollable div */}
      <section>
        <h2>7. Scrollable Div</h2>
        <div style={{
          height: '150px',
          overflowY: 'scroll',
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fafafa'
        }}>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>Line {i + 1}: This is scrollable content</p>
          ))}
        </div>
      </section>
    </div>
  );
}
