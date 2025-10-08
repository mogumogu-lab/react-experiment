import { useState } from 'react';

/**
 * LinkDemo - Examples of <link> component usage
 * Reference: https://react.dev/reference/react-dom/components/link
 *
 * Note: <link> is typically used in the document <head> for external resources
 */
export default function LinkDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showFavicon, setShowFavicon] = useState(true);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;link&gt; Component Examples</h1>

      {/* Link for stylesheets */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Stylesheet Link</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Dynamic theme switching with &lt;link&gt; tag:
          </p>
          <div style={{ marginBottom: '12px' }}>
            <button
              onClick={() => setTheme('light')}
              style={{
                padding: '8px 16px',
                marginRight: '8px',
                backgroundColor: theme === 'light' ? '#2196f3' : '#e0e0e0',
                color: theme === 'light' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Light Theme
            </button>
            <button
              onClick={() => setTheme('dark')}
              style={{
                padding: '8px 16px',
                backgroundColor: theme === 'dark' ? '#2196f3' : '#e0e0e0',
                color: theme === 'dark' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Dark Theme
            </button>
          </div>

          {/* Dynamically rendered link for theme */}
          <link
            rel="stylesheet"
            href={`/themes/${theme}.css`}
            key={theme}
          />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {`<link rel="stylesheet" href="/themes/${theme}.css" />`}
          </pre>
        </div>
      </section>

      {/* Favicon link */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Favicon Link</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Toggle favicon visibility:
          </p>
          <button
            onClick={() => setShowFavicon(!showFavicon)}
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
            {showFavicon ? 'Hide' : 'Show'} Favicon
          </button>

          {showFavicon && (
            <link
              rel="icon"
              type="image/png"
              href="/favicon.png"
            />
          )}

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`}
          </pre>
        </div>
      </section>

      {/* Preload links */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Preload Links</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Preload critical resources for better performance:
          </p>

          {/* Preload font */}
          <link
            rel="preload"
            href="/fonts/custom-font.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* Preload image */}
          <link
            rel="preload"
            href="/images/hero-banner.jpg"
            as="image"
          />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`// Preload font
<link
  rel="preload"
  href="/fonts/custom-font.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>

// Preload image
<link
  rel="preload"
  href="/images/hero-banner.jpg"
  as="image"
/>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Preload hints help the browser prioritize resource loading
          </p>
        </div>
      </section>

      {/* DNS prefetch and preconnect */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. DNS Prefetch &amp; Preconnect</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Optimize external resource loading:
          </p>

          {/* DNS prefetch */}
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

          {/* Preconnect */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`// DNS prefetch - resolve domain early
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />

// Preconnect - establish full connection
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossOrigin="anonymous"
/>`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Reduces latency when loading external resources
          </p>
        </div>
      </section>

      {/* Canonical link */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. Canonical Link</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Specify the canonical URL for SEO:
          </p>

          <link rel="canonical" href="https://example.com/page" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<link rel="canonical" href="https://example.com/page" />`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Helps search engines identify the primary version of duplicate content
          </p>
        </div>
      </section>

      {/* Alternate links */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. Alternate Links</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Specify alternate versions (language, media):
          </p>

          <link rel="alternate" href="/en" hrefLang="en" />
          <link rel="alternate" href="/ko" hrefLang="ko" />
          <link rel="alternate" href="/ja" hrefLang="ja" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`// Language alternates
<link rel="alternate" href="/en" hrefLang="en" />
<link rel="alternate" href="/ko" hrefLang="ko" />
<link rel="alternate" href="/ja" hrefLang="ja" />

// RSS feed
<link rel="alternate" type="application/rss+xml" href="/feed.xml" />`}
          </pre>
        </div>
      </section>

      {/* Manifest link */}
      <section style={{ marginBottom: '40px' }}>
        <h2>7. Web App Manifest</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Link to PWA manifest file:
          </p>

          <link rel="manifest" href="/manifest.json" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<link rel="manifest" href="/manifest.json" />`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Required for Progressive Web Apps (PWA)
          </p>
        </div>
      </section>

      {/* Module preload */}
      <section>
        <h2>8. Module Preload</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e1f5fe'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Preload ES modules:
          </p>

          <link rel="modulepreload" href="/src/main.js" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<link rel="modulepreload" href="/src/main.js" />
<link rel="modulepreload" href="/src/utils.js" />`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Optimizes loading of JavaScript modules
          </p>
        </div>
      </section>
    </div>
  );
}
