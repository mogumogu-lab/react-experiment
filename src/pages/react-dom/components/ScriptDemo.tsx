import { useState, useEffect } from 'react';

/**
 * ScriptDemo - Examples of <script> component usage
 * Reference: https://react.dev/reference/react-dom/components/script
 *
 * Note: <script> tags can be used to load external JavaScript
 */
export default function ScriptDemo() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadInlineScript, setLoadInlineScript] = useState(false);
  const [asyncScriptLoaded, setAsyncScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if external script loaded
    const checkScript = setInterval(() => {
      // @ts-ignore - checking for global variable from external script
      if (window.externalLibraryLoaded) {
        setScriptLoaded(true);
        clearInterval(checkScript);
      }
    }, 100);

    return () => clearInterval(checkScript);
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;script&gt; Component Examples</h1>

      {/* External script */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. External Script</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Load external JavaScript file:
          </p>

          <script src="https://cdn.example.com/library.js" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<script src="https://cdn.example.com/library.js" />`}
          </pre>
          <p style={{ marginTop: '12px', color: scriptLoaded ? '#4caf50' : '#666' }}>
            Status: {scriptLoaded ? '✓ Loaded' : 'Loading...'}
          </p>
        </div>
      </section>

      {/* Async script */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Async Script Loading</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Load script asynchronously (non-blocking):
          </p>

          <script
            src="https://cdn.example.com/analytics.js"
            async
            onLoad={() => setAsyncScriptLoaded(true)}
          />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<script
  src="https://cdn.example.com/analytics.js"
  async
  onLoad={() => console.log('Script loaded!')}
/>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ The async attribute allows the script to load without blocking page rendering
          </p>
        </div>
      </section>

      {/* Defer script */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Defer Script Loading</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Defer script execution until page is parsed:
          </p>

          <script
            src="https://cdn.example.com/widgets.js"
            defer
          />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<script
  src="https://cdn.example.com/widgets.js"
  defer
/>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Deferred scripts execute in order after the DOM is ready
          </p>
        </div>
      </section>

      {/* Inline script */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Inline Script</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Inline JavaScript code:
          </p>

          <button
            onClick={() => setLoadInlineScript(!loadInlineScript)}
            style={{
              padding: '8px 16px',
              marginBottom: '12px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {loadInlineScript ? 'Remove' : 'Load'} Inline Script
          </button>

          {loadInlineScript && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  console.log('Inline script executed!');
                  window.inlineScriptRan = true;
                `
              }}
            />
          )}

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<script
  dangerouslySetInnerHTML={{
    __html: \`
      console.log('Inline script executed!');
      window.myVariable = 'hello';
    \`
  }}
/>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#f57c00' }}>
            ⚠️ Use with caution - can be a security risk with untrusted content
          </p>
        </div>
      </section>

      {/* Module script */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. ES Module Script</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Load ES6 module:
          </p>

          <script type="module" src="/src/main.js" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<script type="module" src="/src/main.js" />

// Or inline module
<script type="module">
  import { myFunction } from './utils.js';
  myFunction();
</script>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Module scripts are deferred by default and can use import/export
          </p>
        </div>
      </section>

      {/* JSON-LD structured data */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. Structured Data (JSON-LD)</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Add structured data for SEO:
          </p>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Amazing Article Title",
                "author": {
                  "@type": "Person",
                  "name": "John Doe"
                },
                "datePublished": "2024-01-01",
                "image": "https://example.com/image.jpg"
              }, null, 2)
            }}
          />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px'
          }}>
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Amazing Article Title",
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
  "datePublished": "2024-01-01",
  "image": "https://example.com/image.jpg"
}
</script>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Helps search engines understand your content
          </p>
        </div>
      </section>

      {/* Script with integrity */}
      <section style={{ marginBottom: '40px' }}>
        <h2>7. Script with Integrity Check (SRI)</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Subresource Integrity for security:
          </p>

          <script
            src="https://cdn.example.com/library.min.js"
            integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..."
            crossOrigin="anonymous"
          />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px'
          }}>
{`<script
  src="https://cdn.example.com/library.min.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..."
  crossOrigin="anonymous"
/>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Ensures the fetched file hasn't been tampered with
          </p>
        </div>
      </section>

      {/* Third-party scripts */}
      <section>
        <h2>8. Common Third-Party Scripts</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e1f5fe'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Examples of popular third-party integrations:
          </p>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px'
          }}>
{`// Google Analytics
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
/>

// Google Maps
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"
  async
  defer
/>

// Stripe
<script src="https://js.stripe.com/v3/" />

// Facebook Pixel
<script>
  !function(f,b,e,v,n,t,s) {
    // Facebook Pixel code
  }
</script>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Always use async/defer for third-party scripts to avoid blocking
          </p>
        </div>
      </section>
    </div>
  );
}
