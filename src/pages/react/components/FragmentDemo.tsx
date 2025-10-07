import { Fragment, useState } from 'react'

export default function FragmentDemo() {
  const [items] = useState(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Fragment (&lt;&gt;)</h1>
        <p className="text-gray-400 mb-6">
          Fragment lets you group elements without a wrapper node.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Basic Fragment Usage</h2>
          <div className="space-y-2">
            <h3 className="font-semibold">Using &lt;&gt; syntax:</h3>
            <ul className="list-disc list-inside space-y-1">
              {items.map((item, index) => (
                <>
                  <li key={index} className="text-green-400">{item}</li>
                </>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Fragment with Key Prop</h2>
          <div className="space-y-2">
            <h3 className="font-semibold">Using &lt;Fragment key=...&gt; for lists:</h3>
            <div className="grid grid-cols-2 gap-4">
              {items.map((item, index) => (
                <Fragment key={index}>
                  <div className="text-yellow-400 font-semibold">{item}</div>
                  <div className="text-gray-400">Item #{index + 1}</div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Returning Multiple Elements</h2>
          <div className="space-y-2">
            <MultipleElementsComponent />
          </div>
        </section>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>&lt;&gt; is shorthand for &lt;Fragment&gt;</li>
          <li>Fragments don't create extra DOM nodes</li>
          <li>Use &lt;Fragment key=...&gt; when you need to pass a key prop</li>
          <li>Perfect for returning multiple elements from a component</li>
        </ul>
      </div>
    </div>
  )
}

function MultipleElementsComponent() {
  return (
    <>
      <p className="text-green-400">First paragraph returned without wrapper</p>
      <p className="text-blue-400">Second paragraph in the same Fragment</p>
      <p className="text-purple-400">Third paragraph - all without extra div!</p>
    </>
  )
}
