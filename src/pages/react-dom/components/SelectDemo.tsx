import { useState } from 'react';

/**
 * SelectDemo - Examples of <select> component usage
 * Reference: https://react.dev/reference/react-dom/components/select
 */
export default function SelectDemo() {
  const [singleValue, setSingleValue] = useState('apple');
  const [multipleValues, setMultipleValues] = useState<string[]>(['react']);
  const [country, setCountry] = useState('');
  const [size, setSize] = useState<number>(3);

  // Handle multiple select
  const handleMultipleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleValues(selected);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;select&gt; Component Examples</h1>

      {/* Basic controlled select */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Basic Controlled Select</h2>
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
              padding: '10px',
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
            <option value="watermelon">🍉 Watermelon</option>
          </select>
          <p style={{ marginTop: '12px', color: '#666' }}>
            Selected: <strong>{singleValue}</strong>
          </p>
        </div>
      </section>

      {/* Uncontrolled select with defaultValue */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Uncontrolled Select</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <label htmlFor="uncontrolled-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose a language:
          </label>
          <select
            id="uncontrolled-select"
            defaultValue="javascript"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">-- Select a language --</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="rust">Rust</option>
          </select>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Uses defaultValue prop (uncontrolled component)
          </p>
        </div>
      </section>

      {/* Multiple select */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Multiple Select</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <label htmlFor="multiple-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose frameworks (hold Ctrl/Cmd to select multiple):
          </label>
          <select
            id="multiple-select"
            multiple
            value={multipleValues}
            onChange={handleMultipleChange}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minHeight: '150px'
            }}
          >
            <option value="react">React</option>
            <option value="vue">Vue.js</option>
            <option value="angular">Angular</option>
            <option value="svelte">Svelte</option>
            <option value="solid">Solid.js</option>
            <option value="nextjs">Next.js</option>
            <option value="nuxt">Nuxt.js</option>
            <option value="remix">Remix</option>
          </select>
          <p style={{ marginTop: '12px', color: '#666' }}>
            Selected ({multipleValues.length}): <strong>{multipleValues.join(', ') || 'None'}</strong>
          </p>
        </div>
      </section>

      {/* Select with optgroup */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Select with Grouped Options</h2>
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">-- Select a country --</option>
            <optgroup label="Asia">
              <option value="kr">🇰🇷 South Korea</option>
              <option value="jp">🇯🇵 Japan</option>
              <option value="cn">🇨🇳 China</option>
              <option value="in">🇮🇳 India</option>
              <option value="sg">🇸🇬 Singapore</option>
            </optgroup>
            <optgroup label="Europe">
              <option value="uk">🇬🇧 United Kingdom</option>
              <option value="de">🇩🇪 Germany</option>
              <option value="fr">🇫🇷 France</option>
              <option value="es">🇪🇸 Spain</option>
              <option value="it">🇮🇹 Italy</option>
            </optgroup>
            <optgroup label="Americas">
              <option value="us">🇺🇸 United States</option>
              <option value="ca">🇨🇦 Canada</option>
              <option value="br">🇧🇷 Brazil</option>
              <option value="mx">🇲🇽 Mexico</option>
              <option value="ar">🇦🇷 Argentina</option>
            </optgroup>
          </select>
          <p style={{ marginTop: '12px', color: '#666' }}>
            Selected: <strong>{country || 'None'}</strong>
          </p>
        </div>
      </section>

      {/* Select with disabled options */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. Select with Disabled Options</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <label htmlFor="disabled-options-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose a subscription plan:
          </label>
          <select
            id="disabled-options-select"
            defaultValue="free"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="free">Free - $0/month</option>
            <option value="basic">Basic - $9/month</option>
            <option value="pro">Pro - $29/month</option>
            <option value="enterprise" disabled>
              Enterprise - Contact us (Coming soon)
            </option>
            <option value="unlimited" disabled>
              Unlimited - $99/month (Sold out)
            </option>
          </select>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Some options are disabled and cannot be selected
          </p>
        </div>
      </section>

      {/* Select with size attribute */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. Select with Size Attribute</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              Size: {size}
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <label htmlFor="sized-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose programming languages:
          </label>
          <select
            id="sized-select"
            size={size}
            defaultValue="javascript"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="kotlin">Kotlin</option>
            <option value="swift">Swift</option>
            <option value="ruby">Ruby</option>
          </select>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ The size attribute controls how many options are visible
          </p>
        </div>
      </section>

      {/* Dynamically generated options */}
      <section style={{ marginBottom: '40px' }}>
        <h2>7. Dynamically Generated Options</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <label htmlFor="dynamic-select" style={{ display: 'block', marginBottom: '8px' }}>
            Select a year:
          </label>
          <select
            id="dynamic-select"
            defaultValue={new Date().getFullYear().toString()}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            {Array.from({ length: 20 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              );
            })}
          </select>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Options generated from current year backwards
          </p>
        </div>
      </section>

      {/* Select from data array */}
      <section>
        <h2>8. Select from Data Array</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e1f5fe'
        }}>
          <label htmlFor="data-select" style={{ display: 'block', marginBottom: '8px' }}>
            Choose a city:
          </label>
          <select
            id="data-select"
            defaultValue=""
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">-- Select a city --</option>
            {[
              { id: 1, name: 'Seoul', country: 'South Korea', population: 9.7 },
              { id: 2, name: 'Tokyo', country: 'Japan', population: 14 },
              { id: 3, name: 'New York', country: 'USA', population: 8.3 },
              { id: 4, name: 'London', country: 'UK', population: 9.0 },
              { id: 5, name: 'Paris', country: 'France', population: 2.2 },
              { id: 6, name: 'Berlin', country: 'Germany', population: 3.6 },
              { id: 7, name: 'Singapore', country: 'Singapore', population: 5.7 },
            ].map((city) => (
              <option key={city.id} value={city.id.toString()}>
                {city.name}, {city.country} ({city.population}M)
              </option>
            ))}
          </select>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Options generated from array of objects with .map()
          </p>
        </div>
      </section>
    </div>
  );
}
