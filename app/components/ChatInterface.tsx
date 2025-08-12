'use client'

interface ChatInterfaceProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
}

export function ChatInterface({ value, onChange, onSend, disabled }: ChatInterfaceProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={disabled ? "Chat paused..." : "Add to the chaos..."}
        disabled={disabled}
        className="input-field flex-1"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        SEND
      </button>
    </div>
  )
}
