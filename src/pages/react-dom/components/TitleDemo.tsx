import { useState, useEffect } from 'react';

/**
 * TitleDemo - Examples of <title> component usage
 * Reference: https://react.dev/reference/react-dom/components/title
 *
 * Note: <title> sets the document title shown in the browser tab
 */
export default function TitleDemo() {
  const [pageTitle, setPageTitle] = useState('Title Demo');
  const [counter, setCounter] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // Update counter every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle notification title
  useEffect(() => {
    if (showNotification) {
      const interval = setInterval(() => {
        document.title = document.title.startsWith('🔔') ? pageTitle : `🔔 New Message - ${pageTitle}`;
      }, 1000);

      return () => {
        clearInterval(interval);
        document.title = pageTitle;
      };
    }
  }, [showNotification, pageTitle]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;title&gt; Component Examples</h1>

      {/* Basic title */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Basic Title</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <title>React Title Demo</title>

          <p style={{ marginBottom: '12px' }}>
            The basic &lt;title&gt; tag sets the document title:
          </p>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<title>React Title Demo</title>`}
          </pre>

          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Look at your browser tab to see the title
          </p>
        </div>
      </section>

      {/* Dynamic title */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Dynamic Title</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <label htmlFor="title-input" style={{ display: 'block', marginBottom: '8px' }}>
            Change Page Title:
          </label>
          <input
            id="title-input"
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '12px'
            }}
          />

          {!showNotification && <title>{pageTitle}</title>}

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`const [pageTitle, setPageTitle] = useState('Title Demo');

<title>{pageTitle}</title>`}
          </pre>

          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Type in the input to see the browser tab title change
          </p>
        </div>
      </section>

      {/* Title with counter */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Title with Live Counter</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Counter: <strong style={{ fontSize: '24px' }}>{counter}</strong>
          </p>

          <title>({counter}) Live Counter Demo</title>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`const [counter, setCounter] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCounter(prev => prev + 1);
  }, 1000);
  return () => clearInterval(interval);
}, []);

<title>({counter}) Live Counter Demo</title>`}
          </pre>

          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ The browser tab shows a live counter
          </p>
        </div>
      </section>

      {/* Notification title */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Notification Alert Title</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <button
            onClick={() => setShowNotification(!showNotification)}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              marginBottom: '12px',
              backgroundColor: showNotification ? '#f44336' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showNotification ? '🔕 Stop Notification' : '🔔 Start Notification'}
          </button>

          <p style={{ marginBottom: '12px' }}>
            Status: {showNotification ? '🔔 Notification Active' : '✓ No Notifications'}
          </p>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px'
          }}>
{`useEffect(() => {
  if (showNotification) {
    const interval = setInterval(() => {
      document.title = document.title.startsWith('🔔')
        ? pageTitle
        : \`🔔 New Message - \${pageTitle}\`;
    }, 1000);

    return () => {
      clearInterval(interval);
      document.title = pageTitle;
    };
  }
}, [showNotification, pageTitle]);`}
          </pre>

          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Click the button to see a blinking notification in the title
          </p>
        </div>
      </section>

      {/* Title with emoji */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. Title with Emoji and Branding</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <title>⚛️ React App | My Website</title>

          <p style={{ marginBottom: '12px' }}>
            Use emojis and branding in titles:
          </p>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`<title>⚛️ React App | My Website</title>
<title>🏠 Home - My App</title>
<title>📧 Messages (3) - My App</title>
<title>⚙️ Settings - My App</title>`}
          </pre>

          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Emojis make tabs more recognizable
          </p>
        </div>
      </section>

      {/* Title templates */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. Title Templates and Patterns</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Common title patterns for different page types:
          </p>

          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>Homepage:</h3>
            <code>My Website | Tagline or Description</code>
          </div>

          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>Content Page:</h3>
            <code>Page Title | My Website</code>
          </div>

          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>Article:</h3>
            <code>Article Title | Category | My Website</code>
          </div>

          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '16px',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>Error Page:</h3>
            <code>404 - Page Not Found | My Website</code>
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
{`// Template function
const getPageTitle = (pageName?: string, siteName = 'My Website') => {
  return pageName ? \`\${pageName} | \${siteName}\` : siteName;
};

<title>{getPageTitle('About Us')}</title>
// Output: "About Us | My Website"`}
          </pre>
        </div>
      </section>

      {/* SEO-friendly titles */}
      <section style={{ marginBottom: '40px' }}>
        <h2>7. SEO-Friendly Titles</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Best practices for SEO-optimized titles:
          </p>

          <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              Keep titles under 60 characters
            </li>
            <li style={{ marginBottom: '8px' }}>
              Put important keywords first
            </li>
            <li style={{ marginBottom: '8px' }}>
              Make titles unique for each page
            </li>
            <li style={{ marginBottom: '8px' }}>
              Include brand name consistently
            </li>
            <li style={{ marginBottom: '8px' }}>
              Use separators like | or -
            </li>
          </ul>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px'
          }}>
{`// Good SEO title examples:
<title>Buy Running Shoes Online | Best Prices | MyStore</title>
<title>React Hooks Tutorial - Complete Guide 2024</title>
<title>Contact Us - Get in Touch | Company Name</title>

// Avoid:
<title>Page</title>  // Too generic
<title>Welcome to our website where you can find...</title>  // Too long`}
          </pre>
        </div>
      </section>

      {/* Document title in React Router */}
      <section>
        <h2>8. Title Management in SPAs</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e1f5fe'
        }}>
          <p style={{ marginBottom: '12px' }}>
            Managing titles in Single Page Applications:
          </p>

          <pre style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px'
          }}>
{`// Using useEffect to update title
useEffect(() => {
  document.title = 'New Page Title';

  // Cleanup: restore previous title
  return () => {
    document.title = 'Default Title';
  };
}, []);

// Custom hook for title management
function useDocumentTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}

// Usage
function MyPage() {
  useDocumentTitle('My Page | My App');
  return <div>Page Content</div>;
}`}
          </pre>

          <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
            ℹ️ Consider using libraries like react-helmet-async for complex title management
          </p>
        </div>
      </section>
    </div>
  );
}
