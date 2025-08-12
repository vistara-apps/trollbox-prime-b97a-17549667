
'use client'

import { useState } from 'react'
import { Send, Smile } from 'lucide-react'
import { EmotePicker } from './EmotePicker'

interface InputAreaProps {
  onSendMessage: (content: string) => void
}

export function InputArea({ onSendMessage }: InputAreaProps) {
  const [message, setMessage] = useState('')
  const [showEmotes, setShowEmotes] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="p-4">
      {/* Emote Picker */}
      {showEmotes && (
        <div className="mb-2">
          <EmotePicker 
            variant="visible"
            onEmoteSelect={(emote) => {
              setMessage(prev => prev + emote)
              setShowEmotes(false)
            }}
          />
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setShowEmotes(!showEmotes)}
          className="text-text-muted hover:text-accent transition-colors p-2"
        >
          <Smile className="w-5 h-5" />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add to the chaos..."
          className="input-field flex-1"
          maxLength={280}
        />
        
        <button
          type="submit"
          disabled={!message.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed p-2"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Character Count */}
      <div className="text-xs text-text-muted mt-1 text-right">
        {message.length}/280
      </div>
    </div>
  )
}
