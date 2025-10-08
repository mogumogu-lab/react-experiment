import { useState, useRef } from 'react';

/**
 * TextareaDemo - Examples of <textarea> component usage
 * Reference: https://react.dev/reference/react-dom/components/textarea
 */
export default function TextareaDemo() {
  const [controlledText, setControlledText] = useState('');
  const [comment, setComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Insert text at cursor position
  const insertText = (text: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const currentText = controlledText;
      const newText = currentText.substring(0, start) + text + currentText.substring(end);
      setControlledText(newText);

      // Set cursor position after inserted text
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(start + text.length, start + text.length);
        }
      }, 0);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;textarea&gt; Component Examples</h1>

      {/* Basic controlled textarea */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Basic Controlled Textarea</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <label htmlFor="basic-textarea" style={{ display: 'block', marginBottom: '8px' }}>
            Enter your text:
          </label>
          <textarea
            id="basic-textarea"
            ref={textareaRef}
            value={controlledText}
            onChange={(e) => setControlledText(e.target.value)}
            placeholder="Type something here..."
            rows={5}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ color: '#666', fontSize: '12px' }}>
              Characters: <strong>{controlledText.length}</strong>
            </p>
            <p style={{ color: '#666', fontSize: '12px' }}>
              Words: <strong>{controlledText.trim() ? controlledText.trim().split(/\s+/).length : 0}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Textarea with max length */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Textarea with Character Limit</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <label htmlFor="limited-textarea" style={{ display: 'block', marginBottom: '8px' }}>
            Tweet (max 280 characters):
          </label>
          <textarea
            id="limited-textarea"
            maxLength={280}
            placeholder="What's happening?"
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Maximum 280 characters allowed
          </p>
        </div>
      </section>

      {/* Uncontrolled textarea */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Uncontrolled Textarea</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <label htmlFor="uncontrolled-textarea" style={{ display: 'block', marginBottom: '8px' }}>
            Description:
          </label>
          <textarea
            id="uncontrolled-textarea"
            name="description"
            defaultValue="This is a default value"
            rows={5}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Uses defaultValue prop (uncontrolled component)
          </p>
        </div>
      </section>

      {/* Auto-resizing textarea */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Auto-Resizing Textarea</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <label htmlFor="auto-resize-textarea" style={{ display: 'block', marginBottom: '8px' }}>
            Comment (auto-expands):
          </label>
          <textarea
            id="auto-resize-textarea"
            value={comment}
            onChange={handleAutoResize}
            placeholder="Type to see the textarea expand..."
            rows={3}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'inherit',
              resize: 'none',
              overflow: 'hidden'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Automatically adjusts height based on content
          </p>
        </div>
      </section>

      {/* Textarea with toolbar */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. Textarea with Insert Buttons</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <label htmlFor="toolbar-textarea" style={{ display: 'block', marginBottom: '8px' }}>
            Message:
          </label>
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '8px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => insertText('**bold**')}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => insertText('*italic*')}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <em>I</em>
            </button>
            <button
              onClick={() => insertText('[link](url)')}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              🔗
            </button>
            <button
              onClick={() => insertText('```\ncode\n```')}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              &lt;/&gt;
            </button>
          </div>
          <textarea
            id="toolbar-textarea"
            ref={textareaRef}
            value={controlledText}
            onChange={(e) => setControlledText(e.target.value)}
            placeholder="Use the buttons to insert markdown..."
            rows={6}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'monospace',
              resize: 'vertical'
            }}
          />
        </div>
      </section>

      {/* Disabled textarea */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. Disabled Textarea</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <label htmlFor="disabled-textarea" style={{ display: 'block', marginBottom: '8px' }}>
            Terms and Conditions:
          </label>
          <textarea
            id="disabled-textarea"
            disabled
            value="This textarea is disabled and cannot be edited. It displays read-only content that users cannot modify."
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'inherit',
              backgroundColor: '#f5f5f5',
              color: '#666',
              cursor: 'not-allowed',
              resize: 'none'
            }}
          />
        </div>
      </section>

      {/* Read-only textarea */}
      <section style={{ marginBottom: '40px' }}>
        <h2>7. Read-Only Textarea</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <label htmlFor="readonly-textarea" style={{ display: 'block', marginBottom: '8px' }}>
            Code Output:
          </label>
          <textarea
            id="readonly-textarea"
            readOnly
            value={`// This is read-only
const message = "Hello, World!";
console.log(message);

// You can select and copy this text
// but you cannot edit it`}
            rows={7}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'monospace',
              backgroundColor: '#f9f9f9',
              resize: 'vertical'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Read-only: selectable but not editable
          </p>
        </div>
      </section>

      {/* Textarea with spell check disabled */}
      <section style={{ marginBottom: '40px' }}>
        <h2>8. Textarea with Spell Check Disabled</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e1f5fe'
        }}>
          <label htmlFor="no-spellcheck-textarea" style={{ display: 'block', marginBottom: '8px' }}>
            Code Snippet (no spell check):
          </label>
          <textarea
            id="no-spellcheck-textarea"
            spellCheck={false}
            placeholder="const myVariable = 'hello';"
            rows={5}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontFamily: 'monospace',
              resize: 'vertical'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Spell check is disabled for code input
          </p>
        </div>
      </section>

      {/* Required textarea */}
      <section>
        <h2>9. Required Textarea</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#ffebee'
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted!');
            }}
          >
            <label htmlFor="required-textarea" style={{ display: 'block', marginBottom: '8px' }}>
              Feedback (required):
            </label>
            <textarea
              id="required-textarea"
              required
              placeholder="Please provide your feedback..."
              rows={5}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <button
              type="submit"
              style={{
                marginTop: '12px',
                padding: '10px 20px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
          </form>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Try submitting without filling the textarea
          </p>
        </div>
      </section>
    </div>
  );
}
