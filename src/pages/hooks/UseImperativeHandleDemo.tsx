import { useRef, useImperativeHandle, forwardRef } from 'react'

type InputHandle = {
  focus: () => void
  clear: () => void
}

const CustomInput = forwardRef<InputHandle, { placeholder: string }>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Expose custom imperative methods to parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
  }))

  return (
    <input
      ref={inputRef}
      type="text"
      className="px-3 py-2 bg-gray-700 rounded text-white"
      placeholder={props.placeholder}
    />
  )
})

export default function UseImperativeHandleDemo() {
  const inputRef = useRef<InputHandle>(null)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useImperativeHandle</h2>
      <p className="text-gray-400">Customizes the instance value exposed by ref</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">Custom Input Component</h3>
        <div className="space-y-2">
          <CustomInput ref={inputRef} placeholder="Type something..." />
          <div className="space-x-2">
            <button
              onClick={() => inputRef.current?.focus()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              Focus
            </button>
            <button
              onClick={() => inputRef.current?.clear()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}