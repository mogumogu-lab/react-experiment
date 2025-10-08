import { useState } from 'react';

/**
 * StyleDemo - Examples of <style> component usage
 * Reference: https://react.dev/reference/react-dom/components/style
 *
 * Note: <style> tags can inject CSS into the document
 */
export default function StyleDemo() {
  const [primaryColor, setPrimaryColor] = useState('#2196f3');
  const [showCustomStyles, setShowCustomStyles] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;style&gt; Component Examples</h1>

      {/* Basic inline style tag */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Basic Inline Style</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <style>
            {`
              .basic-styled-element {
                padding: 16px;
                background-color: #e3f2fd;
                border-radius: 8px;
                color: #1565c0;
                font-weight: bold;
              }
            `}
          </style>

          <div className="basic-styled-element">
            This element is styled using a &lt;style&gt; tag
          </div>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            marginTop: '12px'
          }}>
{`<style>
  {{\`
    .basic-styled-element {
      padding: 16px;
      background-color: #e3f2fd;
      border-radius: 8px;
      color: #1565c0;
      font-weight: bold;
    }
  \`}}
</style>

<div className="basic-styled-element">
  Styled content
</div>`}
          </pre>
        </div>
      </section>

      {/* Dynamic styles */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Dynamic Styles</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="color-picker" style={{ display: 'block', marginBottom: '8px' }}>
              Choose Primary Color:
            </label>
            <input
              id="color-picker"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ width: '60px', height: '40px', cursor: 'pointer', border: 'none' }}
            />
          </div>

          <style>
            {`
              .dynamic-button {
                padding: 12px 24px;
                background-color: ${primaryColor};
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: opacity 0.2s;
              }
              .dynamic-button:hover {
                opacity: 0.8;
              }
            `}
          </style>

          <button className="dynamic-button">
            Dynamically Styled Button
          </button>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            marginTop: '12px'
          }}>
{`<style>
  {{\`
    .dynamic-button {
      background-color: \${primaryColor};
      padding: 12px 24px;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  \`}}
</style>`}
          </pre>
        </div>
      </section>

      {/* Conditional styles */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Conditional Styles</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <button
            onClick={() => setShowCustomStyles(!showCustomStyles)}
            style={{
              padding: '8px 16px',
              marginBottom: '16px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showCustomStyles ? 'Disable' : 'Enable'} Custom Styles
          </button>

          {showCustomStyles && (
            <style>
              {`
                .conditional-box {
                  padding: 20px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  border-radius: 12px;
                  text-align: center;
                  font-size: 18px;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
              `}
            </style>
          )}

          <div className="conditional-box" style={!showCustomStyles ? {
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '12px',
            textAlign: 'center'
          } : {}}>
            {showCustomStyles ? 'Custom styles applied!' : 'Default styles'}
          </div>
        </div>
      </section>

      {/* Media queries */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Media Queries</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <style>
            {`
              .responsive-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
              }

              .responsive-grid-item {
                padding: 20px;
                background-color: #e1bee7;
                border-radius: 8px;
                text-align: center;
              }

              @media (max-width: 768px) {
                .responsive-grid {
                  grid-template-columns: repeat(2, 1fr);
                }
              }

              @media (max-width: 480px) {
                .responsive-grid {
                  grid-template-columns: 1fr;
                }
              }
            `}
          </style>

          <div className="responsive-grid">
            <div className="responsive-grid-item">Item 1</div>
            <div className="responsive-grid-item">Item 2</div>
            <div className="responsive-grid-item">Item 3</div>
          </div>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            marginTop: '12px',
            fontSize: '11px'
          }}>
{`<style>
  {{\`
    .responsive-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    @media (max-width: 768px) {
      .responsive-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .responsive-grid {
        grid-template-columns: 1fr;
      }
    }
  \`}}
</style>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Resize your browser to see responsive changes
          </p>
        </div>
      </section>

      {/* CSS animations */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. CSS Animations</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <style>
            {`
              @keyframes fadeInScale {
                0% {
                  opacity: 0;
                  transform: scale(0.8);
                }
                100% {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              @keyframes rotate {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }

              .animated-box {
                padding: 30px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                color: white;
                border-radius: 12px;
                text-align: center;
                animation: fadeInScale 1s ease-out;
                margin-bottom: 16px;
              }

              .rotating-element {
                display: inline-block;
                font-size: 32px;
                animation: rotate 3s linear infinite;
              }
            `}
          </style>

          <div className="animated-box">
            <span className="rotating-element">⭐</span>
            <div>Animated Content</div>
          </div>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px'
          }}>
{`<style>
  {{\`
    @keyframes fadeInScale {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }

    .animated-box {
      animation: fadeInScale 1s ease-out;
    }
  \`}}
</style>`}
          </pre>
        </div>
      </section>

      {/* CSS variables */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. CSS Variables (Custom Properties)</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="font-size-slider" style={{ display: 'block', marginBottom: '8px' }}>
              Font Size: {fontSize}px
            </label>
            <input
              id="font-size-slider"
              type="range"
              min="12"
              max="32"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <style>
            {`
              :root {
                --custom-font-size: ${fontSize}px;
                --custom-spacing: ${fontSize / 2}px;
              }

              .css-vars-demo {
                font-size: var(--custom-font-size);
                padding: var(--custom-spacing);
                background-color: #e1f5fe;
                border-radius: 8px;
                transition: all 0.3s ease;
              }
            `}
          </style>

          <div className="css-vars-demo">
            Text with custom CSS variables
          </div>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            marginTop: '12px',
            fontSize: '11px'
          }}>
{`<style>
  {{\`
    :root {
      --custom-font-size: \${fontSize}px;
      --custom-spacing: \${fontSize / 2}px;
    }

    .css-vars-demo {
      font-size: var(--custom-font-size);
      padding: var(--custom-spacing);
    }
  \`}}
</style>`}
          </pre>
        </div>
      </section>

      {/* Scoped styles */}
      <section style={{ marginBottom: '40px' }}>
        <h2>7. Pseudo-classes and Pseudo-elements</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e1f5fe'
        }}>
          <style>
            {`
              .styled-list {
                list-style: none;
                padding: 0;
              }

              .styled-list li {
                padding: 12px;
                margin-bottom: 8px;
                background-color: #f5f5f5;
                border-left: 4px solid #2196f3;
                transition: all 0.2s;
              }

              .styled-list li:hover {
                background-color: #e3f2fd;
                transform: translateX(4px);
              }

              .styled-list li:first-child {
                border-radius: 8px 8px 0 0;
              }

              .styled-list li:last-child {
                border-radius: 0 0 8px 8px;
              }

              .styled-list li::before {
                content: "✓ ";
                color: #4caf50;
                font-weight: bold;
              }
            `}
          </style>

          <ul className="styled-list">
            <li>First item with hover effect</li>
            <li>Second item with check mark</li>
            <li>Third item with custom styling</li>
            <li>Last item with border radius</li>
          </ul>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            marginTop: '12px',
            fontSize: '11px'
          }}>
{`<style>
  {{\`
    .styled-list li:hover {
      background-color: #e3f2fd;
      transform: translateX(4px);
    }

    .styled-list li::before {
      content: "✓ ";
      color: #4caf50;
    }
  \`}}
</style>`}
          </pre>
        </div>
      </section>

      {/* Global styles */}
      <section>
        <h2>8. Global Styles with Precedence</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#ffebee'
        }}>
          <style precedence="default">
            {`
              .global-styled {
                padding: 16px;
                background-color: #ffcdd2;
                border-radius: 8px;
                margin-bottom: 12px;
              }
            `}
          </style>

          <div className="global-styled">
            Styled with precedence attribute
          </div>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px'
          }}>
{`<style precedence="default">
  {{\`
    .global-styled {
      padding: 16px;
      background-color: #ffcdd2;
      border-radius: 8px;
    }
  \`}}
</style>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ The precedence attribute helps control style ordering in React
          </p>
        </div>
      </section>
    </div>
  );
}
