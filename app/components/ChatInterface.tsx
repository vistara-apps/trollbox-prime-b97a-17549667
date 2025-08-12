'use client'

import { useState, useRef, useEffect } from 'react'
import { EmotePicker } from './EmotePicker'

interface ChatInterfaceProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  maxLength?: number
}

export function ChatInterface({ 
  value, 
  onChange, 
  onSend, 
  disabled = false,
  maxLength = 280 
}: ChatInterfaceProps) {
  const [showEmotePicker, setShowEmotePicker] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = async () => {
    if (!value.trim() || disabled || isSending) return
    
    setIsSending(true)
    try {
      await onSend()
    } finally {
      setIsSending(false)
    }
  }

  const handleEmoteSelect = (emote: string) => {
    const newValue = value + emote
    if (newValue.length <= maxLength) {
      onChange(newValue)
    }
    setShowEmotePicker(false)
    textareaRef.current?.focus()
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [value])

  const remainingChars = maxLength - value.length
  const isOverLimit = remainingChars < 0

  return (
    <div className="space-y-2">
      {/* Character counter */}
      {value.length > maxLength * 0.8 && (
        <div className="flex justify-end">
          <span className={`text-xs ${isOverLimit ? 'text-red-400' : 'text-muted'}`}>
            {remainingChars} characters remaining
          </span>
        </div>
      )}

      <div className="flex space-x-2 items-end">
        {/* Emoji picker button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmotePicker(!showEmotePicker)}
            disabled={disabled}
            className="p-2 text-muted hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add emoji"
          >
            😀
          </button>
          
          {showEmotePicker && (
            <div className="absolute bottom-full left-0 mb-2">
              <EmotePicker onSelect={handleEmoteSelect} />
            </div>
          )}
        </div>

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Chat paused..." : "Add to the chaos... (Shift+Enter for new line)"}
          disabled={disabled}
          maxLength={maxLength}
          rows={1}
          className={`
            input-field 
            flex-1 
            resize-none 
            min-h-[40px] 
            max-h-[120px]
            ${isOverLimit ? 'border-red-400 focus:border-red-400' : ''}
          `}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim() || isSending || isOverLimit}
          className={`
            btn-primary 
            disabled:opacity-50 
            disabled:cursor-not-allowed
            min-w-[60px]
            ${isSending ? 'animate-pulse' : ''}
          `}
        >
          {isSending ? '...' : 'SEND'}
        </button>
      </div>

      {/* Quick tips */}
      {!disabled && value.length === 0 && (
        <div className="text-xs text-muted">
          💡 Tip: Use Shift+Enter for new lines, or click 😀 for emojis
        </div>
      )}
    </div>
  )
}
