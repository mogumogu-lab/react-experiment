import { useInsertionEffect, useState } from 'react'

function useDynamicStyles(color: string) {
  useInsertionEffect(() => {
    // Insert dynamic styles before DOM mutations
    const styleId = 'dynamic-button-style'
    let styleEl = document.getElementById(styleId) as HTMLStyleElement

    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = styleId
      document.head.appendChild(styleEl)
    }

    styleEl.textContent = `
      .dynamic-button {
        background-color: ${color};
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        transition: opacity 0.2s;
      }
      .dynamic-button:hover {
        opacity: 0.8;
      }
    `
  }, [color])
}

export default function UseInsertionEffectDemo() {
  const [color, setColor] = useState('#3b82f6')
  useDynamicStyles(color)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useInsertionEffect</h2>
      <p className="text-gray-400">Inserts styles/DOM before layout effects (for CSS-in-JS libraries)</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">Dynamic Styles Injection</h3>
        <button className="dynamic-button mb-4">Styled with useInsertionEffect</button>
        <div className="space-x-2">
          <button
            onClick={() => setColor('#3b82f6')}
            className="px-3 py-1 bg-blue-600 rounded"
          >
            Blue
          </button>
          <button
            onClick={() => setColor('#10b981')}
            className="px-3 py-1 bg-green-600 rounded"
          >
            Green
          </button>
          <button
            onClick={() => setColor('#f59e0b')}
            className="px-3 py-1 bg-orange-600 rounded"
          >
            Orange
          </button>
        </div>
      </div>
    </div>
  )
}