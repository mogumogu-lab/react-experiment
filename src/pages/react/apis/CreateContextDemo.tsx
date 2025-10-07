import { createContext, useContext, useState } from 'react'

// Create a theme context
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Create a user context
interface User {
  name: string
  role: string
}

interface UserContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export default function CreateContextDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [user, setUser] = useState<User | null>(null)

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  const login = (newUser: User) => setUser(newUser)
  const logout = () => setUser(null)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">createContext()</h1>
        <p className="text-gray-400 mb-6">
          createContext lets you create a context that components can provide or read.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Theme Context Example</h2>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`p-6 rounded-lg transition-colors ${
              theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-900 text-white'
            }`}>
              <ThemeConsumer />
            </div>
          </ThemeContext.Provider>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">User Context Example</h2>
          <UserContext.Provider value={{ user, login, logout }}>
            <div className="space-y-4">
              <UserConsumer />
            </div>
          </UserContext.Provider>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`import { createContext, useContext } from 'react';

// 1. Create context
const ThemeContext = createContext('light');

// 2. Provide context value
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}

// 3. Consume context
function Page() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Content</div>;
}
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Context Best Practices</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Use for global data</p>
              <p className="text-gray-400">Theme, user auth, language preferences</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Provide default value</p>
              <p className="text-gray-400">For better TypeScript support and fallback</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Split contexts by concern</p>
              <p className="text-gray-400">Separate theme, user, and data contexts</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ Avoid for frequently changing data</p>
              <p className="text-gray-400">Can cause unnecessary re-renders</p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>createContext creates a context object</li>
          <li>Provider supplies value to descendants</li>
          <li>useContext reads the context value</li>
          <li>Context value can be any type</li>
          <li>Components re-render when context value changes</li>
          <li>Can nest multiple providers</li>
        </ul>
      </div>
    </div>
  )
}

function ThemeConsumer() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('ThemeConsumer must be used within ThemeContext.Provider')

  return (
    <div className="space-y-4">
      <p className="font-semibold">Current Theme: {context.theme}</p>
      <button
        onClick={context.toggleTheme}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        Toggle Theme
      </button>
      <p className="text-sm opacity-75">This component reads theme from context</p>
    </div>
  )
}

function UserConsumer() {
  const context = useContext(UserContext)
  if (!context) throw new Error('UserConsumer must be used within UserContext.Provider')

  return (
    <div className="space-y-4">
      {context.user ? (
        <>
          <div className="bg-gray-700 p-4 rounded">
            <p className="font-semibold text-green-400">Logged in as: {context.user.name}</p>
            <p className="text-sm text-gray-400">Role: {context.user.role}</p>
          </div>
          <button
            onClick={context.logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-400">Not logged in</p>
          <div className="flex space-x-2">
            <button
              onClick={() => context.login({ name: 'Alice', role: 'Admin' })}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Login as Alice
            </button>
            <button
              onClick={() => context.login({ name: 'Bob', role: 'User' })}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Login as Bob
            </button>
          </div>
        </>
      )}
    </div>
  )
}