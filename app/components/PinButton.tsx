
'use client'

import { Pin } from 'lucide-react'
import { ChatMessage } from '../types/chat'

interface PinButtonProps {
  message: ChatMessage
  variant: 'default' | 'pinned'
}

export function PinButton({ message, variant }: PinButtonProps) {
  const handlePin = () => {
    // This would trigger the premium feature flow
    console.log('Pin message:', message.messageId)
    // TODO: Implement payment flow for premium features
  }

  return (
    <button
      onClick={handlePin}
      className={`p-1 transition-colors ${
        variant === 'pinned' 
          ? 'text-accent' 
          : 'text-text-muted hover:text-accent'
      }`}
      title={variant === 'pinned' ? 'Pinned message' : 'Pin message (Premium)'}
    >
      <Pin 
        className="w-4 h-4" 
        fill={variant === 'pinned' ? 'currentColor' : 'none'}
      />
    </button>
  )
}
