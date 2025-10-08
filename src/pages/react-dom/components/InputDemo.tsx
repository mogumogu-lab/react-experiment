import { useState, useRef } from 'react';

/**
 * InputDemo - Examples of <input> component usage
 * Reference: https://react.dev/reference/react-dom/components/input
 */
export default function InputDemo() {
  const [textValue, setTextValue] = useState('');
  const [numberValue, setNumberValue] = useState(0);
  const [checked, setChecked] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [selectedDate, setSelectedDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;input&gt; Component Examples</h1>

      {/* Text input */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Text Input (Controlled)</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <label htmlFor="text-input" style={{ display: 'block', marginBottom: '8px' }}>
            Text Input:
          </label>
          <input
            id="text-input"
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Enter some text..."
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <p style={{ marginTop: '8px', color: '#666' }}>
            Current value: <strong>{textValue || '(empty)'}</strong>
          </p>
        </div>
      </section>

      {/* Number input */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Number Input</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <label htmlFor="number-input" style={{ display: 'block', marginBottom: '8px' }}>
            Number Input (0-100):
          </label>
          <input
            id="number-input"
            type="number"
            value={numberValue}
            onChange={(e) => setNumberValue(Number(e.target.value))}
            min="0"
            max="100"
            step="5"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <p style={{ marginTop: '8px', color: '#666' }}>
            Current value: <strong>{numberValue}</strong>
          </p>
        </div>
      </section>

      {/* Checkbox input */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Checkbox Input</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <span>I agree to the terms and conditions</span>
          </label>
          <p style={{ marginTop: '8px', color: '#666' }}>
            Status: <strong>{checked ? 'Checked ✓' : 'Unchecked'}</strong>
          </p>
        </div>
      </section>

      {/* Radio buttons */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Radio Input</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <fieldset style={{ border: 'none', padding: 0 }}>
            <legend style={{ marginBottom: '12px', fontWeight: 'bold' }}>
              Choose your favorite color:
            </legend>
            {['Red', 'Green', 'Blue'].map((color) => (
              <label
                key={color}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="color"
                  value={color.toLowerCase()}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{color}</span>
              </label>
            ))}
          </fieldset>
          <p style={{ marginTop: '12px', color: '#666' }}>
            Selected: <strong>{selectedColor || 'None'}</strong>
          </p>
        </div>
      </section>

      {/* Color input */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. Color Input</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <label htmlFor="color-input" style={{ display: 'block', marginBottom: '8px' }}>
            Pick a color:
          </label>
          <input
            id="color-input"
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            style={{ width: '100px', height: '40px', cursor: 'pointer', border: 'none' }}
          />
          <div
            style={{
              marginTop: '12px',
              width: '100%',
              height: '50px',
              backgroundColor: selectedColor,
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <p style={{ marginTop: '8px', color: '#666' }}>
            Selected color: <strong>{selectedColor}</strong>
          </p>
        </div>
      </section>

      {/* Date input */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. Date Input</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <label htmlFor="date-input" style={{ display: 'block', marginBottom: '8px' }}>
            Select a date:
          </label>
          <input
            id="date-input"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <p style={{ marginTop: '8px', color: '#666' }}>
            Selected date: <strong>{selectedDate || 'None'}</strong>
          </p>
        </div>
      </section>

      {/* File input */}
      <section style={{ marginBottom: '40px' }}>
        <h2>7. File Input</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <label htmlFor="file-input" style={{ display: 'block', marginBottom: '8px' }}>
            Upload files:
          </label>
          <input
            id="file-input"
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => setUploadedFiles(e.target.files)}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px'
            }}
          />
          {uploadedFiles && uploadedFiles.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                Uploaded files ({uploadedFiles.length}):
              </p>
              <ul style={{ paddingLeft: '20px' }}>
                {Array.from(uploadedFiles).map((file, index) => (
                  <li key={index}>
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
                setUploadedFiles(null);
              }
            }}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              fontSize: '14px'
            }}
          >
            Clear Files
          </button>
        </div>
      </section>

      {/* Range input */}
      <section style={{ marginBottom: '40px' }}>
        <h2>8. Range Input (Slider)</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e1f5fe'
        }}>
          <label htmlFor="range-input" style={{ display: 'block', marginBottom: '8px' }}>
            Volume: {numberValue}%
          </label>
          <input
            id="range-input"
            type="range"
            value={numberValue}
            onChange={(e) => setNumberValue(Number(e.target.value))}
            min="0"
            max="100"
            step="1"
            style={{
              width: '100%',
              cursor: 'pointer'
            }}
          />
        </div>
      </section>

      {/* Password input */}
      <section style={{ marginBottom: '40px' }}>
        <h2>9. Password Input</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#ffebee'
        }}>
          <label htmlFor="password-input" style={{ display: 'block', marginBottom: '8px' }}>
            Password:
          </label>
          <input
            id="password-input"
            type="password"
            placeholder="Enter password..."
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Password is hidden by default
          </p>
        </div>
      </section>

      {/* Email input */}
      <section style={{ marginBottom: '40px' }}>
        <h2>10. Email Input</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e0f2f1'
        }}>
          <label htmlFor="email-input" style={{ display: 'block', marginBottom: '8px' }}>
            Email:
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="example@email.com"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Includes built-in email validation
          </p>
        </div>
      </section>

      {/* Search input */}
      <section>
        <h2>11. Search Input</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f1f8e9'
        }}>
          <label htmlFor="search-input" style={{ display: 'block', marginBottom: '8px' }}>
            Search:
          </label>
          <input
            id="search-input"
            type="search"
            placeholder="Search..."
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Shows clear button on some browsers
          </p>
        </div>
      </section>
    </div>
  );
}
