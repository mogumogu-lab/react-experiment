import { useState } from 'react'

export default function ActDemo() {
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  const handleClick = () => {
    // In tests, you would wrap this in act()
    setCount(c => c + 1)
    setLogs(prev => [...prev.slice(-9), `Count updated to ${count + 1} at ${new Date().toLocaleTimeString()}`])
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">act()</h1>
        <p className="text-gray-400 mb-6">
          act() helps you prepare components for assertions by flushing updates in tests.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Interactive Demo</h2>
          <div className="space-y-4">
            <div className="text-2xl text-gray-300">Count: {count}</div>
            <button
              onClick={handleClick}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
            >
              Increment
            </button>
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-sm font-semibold mb-2">Update Logs:</p>
              <div className="space-y-1 text-xs font-mono text-green-400 max-h-40 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-gray-500">Click increment to see logs</p>
                ) : (
                  logs.map((log, i) => <div key={i}>{log}</div>)
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Test Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`import { act } from 'react';
import { render, screen } from '@testing-library/react';
import Counter from './Counter';

test('increments counter', async () => {
  render(<Counter />);
  const button = screen.getByRole('button');

  // Wrap state updates in act()
  await act(async () => {
    button.click();
  });

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

// Without act(), you might see warnings:
// "An update to Component inside a test was not wrapped in act(...)"
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">When to Use act()</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Manual DOM updates in tests</p>
              <p className="text-gray-400">When not using testing libraries like React Testing Library</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Custom test utilities</p>
              <p className="text-gray-400">When building your own testing helpers</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ With React Testing Library</p>
              <p className="text-gray-400">RTL already wraps interactions in act() automatically</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">✗ In production code</p>
              <p className="text-gray-400">act() is only for testing, not production</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">What act() Does</h2>
          <div className="space-y-2 text-gray-300">
            <p>• Flushes all pending state updates</p>
            <p>• Runs all effects (useEffect, useLayoutEffect)</p>
            <p>• Processes all scheduled updates</p>
            <p>• Ensures component is in final state before assertions</p>
            <p>• Prevents "act" warnings in tests</p>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>act() is a testing utility, not for production</li>
          <li>Ensures all updates are processed before assertions</li>
          <li>Most testing libraries handle act() automatically</li>
          <li>Prevents timing-related test flakiness</li>
          <li>Returns a promise for async updates</li>
        </ul>
      </div>
    </div>
  )
}