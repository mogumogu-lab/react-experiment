import { useOptimistic, useState } from 'react'

type Message = {
  id: number
  text: string
  sending?: boolean
}

async function sendMessage(text: string): Promise<Message> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return { id: Date.now(), text }
}

export default function UseOptimisticDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      { id: Date.now(), text: newMessage, sending: true },
    ]
  )

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get('message') as string
    if (!text) return

    // Optimistically add message
    addOptimisticMessage(text)

    // Send to server
    const newMessage = await sendMessage(text)
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">useOptimistic</h2>
      <p className="text-gray-400">Shows optimistic UI updates while async action is pending</p>

      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl mb-4">Chat Messages</h3>
        <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
          {optimisticMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded ${msg.sending ? 'bg-gray-700 opacity-50' : 'bg-blue-600'}`}
            >
              {msg.text} {msg.sending && '(sending...)'}
            </div>
          ))}
        </div>

        <form
          action={handleSubmit}
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleSubmit(formData)
            e.currentTarget.reset()
          }}
        >
          <input
            type="text"
            name="message"
            className="flex-1 px-3 py-2 bg-gray-700 rounded text-white"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}