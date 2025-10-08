import { useState } from 'react';

/**
 * OptionDemo - Examples of <option> component usage
 * Reference: https://react.dev/reference/react-dom/components/option
 *
 * Note: <option> is typically used within <select> elements
 */
export default function OptionDemo() {
  const [singleValue, setSingleValue] = useState('apple');
  const [multipleValues, setMultipleValues] = useState<string[]>(['react']);
  const [groupValue, setGroupValue] = useState('');

  // Handle multiple select change
  const handleMultipleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleValues(selected);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;option&gt; Component Examples</h1>

      {/* Basic option usage */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Basic Options in Select</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <label htmlFor="basic-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose a fruit:
          </label>
          <select
            id="basic-select"
            value={singleValue}
            onChange={(e) => setSingleValue(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="apple">🍎 Apple</option>
            <option value="banana">🍌 Banana</option>
            <option value="orange">🍊 Orange</option>
            <option value="grape">🍇 Grape</option>
            <option value="strawberry">🍓 Strawberry</option>
          </select>
          <p style={{ marginTop: '12px', color: '#666' }}>
            Selected: <strong>{singleValue}</strong>
          </p>
        </div>
      </section>

      {/* Options with disabled state */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Options with Disabled State</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <label htmlFor="disabled-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose a programming language:
          </label>
          <select
            id="disabled-select"
            defaultValue="javascript"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">-- Select a language --</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="rust" disabled>
              Rust (Coming soon)
            </option>
            <option value="go" disabled>
              Go (Coming soon)
            </option>
          </select>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Some options are disabled and cannot be selected
          </p>
        </div>
      </section>

      {/* Multiple select with options */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Multiple Select with Options</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <label htmlFor="multiple-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose your tech stack (hold Ctrl/Cmd to select multiple):
          </label>
          <select
            id="multiple-select"
            multiple
            value={multipleValues}
            onChange={handleMultipleChange}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minHeight: '120px'
            }}
          >
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
            <option value="svelte">Svelte</option>
            <option value="nextjs">Next.js</option>
            <option value="remix">Remix</option>
            <option value="astro">Astro</option>
          </select>
          <p style={{ marginTop: '12px', color: '#666' }}>
            Selected: <strong>{multipleValues.join(', ') || 'None'}</strong>
          </p>
        </div>
      </section>

      {/* Grouped options (optgroup) */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Grouped Options</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <label htmlFor="grouped-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose a country:
          </label>
          <select
            id="grouped-select"
            value={groupValue}
            onChange={(e) => setGroupValue(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">-- Select a country --</option>
            <optgroup label="Asia">
              <option value="kr">South Korea</option>
              <option value="jp">Japan</option>
              <option value="cn">China</option>
              <option value="sg">Singapore</option>
            </optgroup>
            <optgroup label="Europe">
              <option value="uk">United Kingdom</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
              <option value="es">Spain</option>
            </optgroup>
            <optgroup label="Americas">
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="br">Brazil</option>
              <option value="mx">Mexico</option>
            </optgroup>
          </select>
          <p style={{ marginTop: '12px', color: '#666' }}>
            Selected: <strong>{groupValue || 'None'}</strong>
          </p>
        </div>
      </section>

      {/* Options with custom values and labels */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. Options with Different Value and Label</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <label htmlFor="custom-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose a size:
          </label>
          <select
            id="custom-select"
            defaultValue="medium"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="xs">Extra Small (XS)</option>
            <option value="sm">Small (S)</option>
            <option value="medium">Medium (M)</option>
            <option value="lg">Large (L)</option>
            <option value="xl">Extra Large (XL)</option>
            <option value="xxl">2X Large (XXL)</option>
          </select>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ The value attribute can differ from the displayed text
          </p>
        </div>
      </section>

      {/* Dynamic options */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. Dynamically Generated Options</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <label htmlFor="dynamic-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose a year:
          </label>
          <select
            id="dynamic-select"
            defaultValue={new Date().getFullYear().toString()}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              );
            })}
          </select>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Options generated dynamically using Array.from()
          </p>
        </div>
      </section>

      {/* Options from data */}
      <section>
        <h2>7. Options from Data Array</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <label htmlFor="data-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose a city:
          </label>
          <select
            id="data-select"
            defaultValue=""
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">-- Select a city --</option>
            {[
              { id: 1, name: 'Seoul', country: 'South Korea' },
              { id: 2, name: 'Tokyo', country: 'Japan' },
              { id: 3, name: 'New York', country: 'USA' },
              { id: 4, name: 'London', country: 'UK' },
              { id: 5, name: 'Paris', country: 'France' },
            ].map((city) => (
              <option key={city.id} value={city.id.toString()}>
                {city.name}, {city.country}
              </option>
            ))}
          </select>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Options mapped from an array of objects
          </p>
        </div>
      </section>
    </div>
  );
}
