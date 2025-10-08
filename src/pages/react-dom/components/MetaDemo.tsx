import { useState } from 'react';

/**
 * MetaDemo - Examples of <meta> component usage
 * Reference: https://react.dev/reference/react-dom/components/meta
 *
 * Note: <meta> tags are typically used in the document <head> for metadata
 */
export default function MetaDemo() {
  const [pageTitle, setPageTitle] = useState('My Awesome Page');
  const [description, setDescription] = useState('This is an example page demonstrating meta tags');

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;meta&gt; Component Examples</h1>

      {/* Basic meta tags */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Basic Meta Tags</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="A comprehensive guide to meta tags in React" />
          <meta name="keywords" content="react, meta tags, SEO, html" />
          <meta name="author" content="Your Name" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<meta charSet="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="..." />
<meta name="keywords" content="react, meta tags, SEO" />
<meta name="author" content="Your Name" />`}
          </pre>
        </div>
      </section>

      {/* Dynamic meta tags */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Dynamic Meta Tags</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="title-input" style={{ display: 'block', marginBottom: '8px' }}>
              Page Title:
            </label>
            <input
              id="title-input"
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="description-input" style={{ display: 'block', marginBottom: '8px' }}>
              Description:
            </label>
            <textarea
              id="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <meta name="description" content={description} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={description} />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<meta name="description" content="${description}" />
<meta property="og:title" content="${pageTitle}" />
<meta property="og:description" content="${description}" />`}
          </pre>
        </div>
      </section>

      {/* Open Graph meta tags */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Open Graph (OG) Meta Tags</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Open Graph tags for social media sharing:
          </p>

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://example.com/page" />
          <meta property="og:title" content="Amazing Article Title" />
          <meta property="og:description" content="This article will change your life" />
          <meta property="og:image" content="https://example.com/image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="My Website" />
          <meta property="og:locale" content="en_US" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '12px'
          }}>
{`<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:title" content="Amazing Article Title" />
<meta property="og:description" content="This article will change your life" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="My Website" />
<meta property="og:locale" content="en_US" />`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Used by Facebook, LinkedIn, and other platforms
          </p>
        </div>
      </section>

      {/* Twitter Card meta tags */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Twitter Card Meta Tags</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Twitter-specific meta tags:
          </p>

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@yourusername" />
          <meta name="twitter:creator" content="@yourusername" />
          <meta name="twitter:title" content="Amazing Article Title" />
          <meta name="twitter:description" content="This article will change your life" />
          <meta name="twitter:image" content="https://example.com/image.jpg" />
          <meta name="twitter:image:alt" content="Description of image" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '12px'
          }}>
{`<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@yourusername" />
<meta name="twitter:title" content="Amazing Article Title" />
<meta name="twitter:description" content="This article will change your life" />
<meta name="twitter:image" content="https://example.com/image.jpg" />
<meta name="twitter:image:alt" content="Description of image" />`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Card types: summary, summary_large_image, app, player
          </p>
        </div>
      </section>

      {/* Robots meta tag */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. Robots Meta Tag</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Control search engine crawling and indexing:
          </p>

          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`// Allow indexing and following
<meta name="robots" content="index, follow" />

// Block indexing
<meta name="robots" content="noindex, nofollow" />

// Google-specific
<meta name="googlebot" content="index, follow, max-snippet:-1" />`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Values: index, noindex, follow, nofollow, noarchive, nosnippet
          </p>
        </div>
      </section>

      {/* Theme color meta tag */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. Theme Color</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Set browser theme color (mobile):
          </p>

          <meta name="theme-color" content="#2196f3" />
          <meta name="msapplication-TileColor" content="#2196f3" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<meta name="theme-color" content="#2196f3" />
<meta name="msapplication-TileColor" content="#2196f3" />`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Affects mobile browser UI color
          </p>
        </div>
      </section>

      {/* HTTP-equiv meta tags */}
      <section style={{ marginBottom: '40px' }}>
        <h2>7. HTTP-Equiv Meta Tags</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <p style={{ marginBottom: '12px' }}>
            HTTP header equivalents:
          </p>

          <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="refresh" content="30" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`// Content type
<meta httpEquiv="content-type" content="text/html; charset=UTF-8" />

// IE compatibility
<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

// Auto refresh (30 seconds)
<meta httpEquiv="refresh" content="30" />

// Redirect after 5 seconds
<meta httpEquiv="refresh" content="5; url=https://example.com" />`}
          </pre>
        </div>
      </section>

      {/* Security meta tags */}
      <section>
        <h2>8. Security Meta Tags</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e1f5fe'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Content Security Policy and other security headers:
          </p>

          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'self'; script-src 'self' 'unsafe-inline'"
          />
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta name="referrer" content="strict-origin-when-cross-origin" />

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '12px'
          }}>
{`// Content Security Policy
<meta
  httpEquiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'"
/>

// Prevent MIME sniffing
<meta httpEquiv="X-Content-Type-Options" content="nosniff" />

// Referrer policy
<meta name="referrer" content="strict-origin-when-cross-origin" />`}
          </pre>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Enhances security by controlling resource loading and referrer information
          </p>
        </div>
      </section>
    </div>
  );
}
