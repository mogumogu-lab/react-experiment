import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext<{ theme: string; toggleTheme: () => void } | null>(null)

function ThemedButton() {
  const context = useContext(ThemeContext)
  if (!context) return null

  return (
    <button
      onClick={context.toggleTheme}
      className={`px-4 py-2 rounded transition-colors ${
        context.theme === 'dark'
          ? 'bg-gray-800 hover:bg-gray-700'
          : 'bg-white text-black hover:bg-gray-200'
      }`}
    >
      Current theme: {context.theme}
    </button>
  )
}

export default function UseContextDemo() {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useContext</h2>
      <p className="text-gray-400">Shares data across component tree without props</p>

      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-4">Theme Toggle</h3>
          <ThemedButton />
        </div>
      </ThemeContext.Provider>
    </div>
  )
}