import { useState, useLayoutEffect, useRef } from 'react'

export default function UseLayoutEffectDemo() {
  const [show, setShow] = useState(false)
  const [height, setHeight] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)

  // Runs synchronously before browser paint
  useLayoutEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight)
    }
  }, [show])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useLayoutEffect</h2>
      <p className="text-gray-400">Runs synchronously before browser paint (for DOM measurements)</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">Measure DOM Element</h3>
        <button
          onClick={() => setShow(!show)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors mb-4"
        >
          {show ? 'Hide' : 'Show'} Content
        </button>

        {show && (
          <div ref={divRef} className="p-4 bg-gray-700 rounded">
            <p>This is some content that gets measured.</p>
            <p>Height is calculated before paint to avoid flicker.</p>
          </div>
        )}

        <p className="mt-4 text-green-400">Measured height: {height}px</p>
      </div>
    </div>
  )
}