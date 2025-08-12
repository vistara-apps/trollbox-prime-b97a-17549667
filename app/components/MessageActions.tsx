'use client'

import { useState } from 'react'

interface MessageActionsProps {
  messageId: string
  content: string
  isPinned: boolean
  onPin: () => void
  onCopy?: () => void
  onReply?: () => void
}

export function MessageActions({ 
  messageId, 
  content, 
  isPinned, 
  onPin, 
  onCopy, 
  onReply 
}: MessageActionsProps) {
  const [showActions, setShowActions] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onCopy?.()
    } catch (err) {
      console.error('Failed to copy message:', err)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowActions(!showActions)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-surface rounded text-muted hover:text-text"
        aria-label="Message actions"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {showActions && (
        <div className="absolute right-0 top-8 bg-surface border border-white/20 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
          <button
            onClick={() => {
              onPin()
              setShowActions(false)
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors flex items-center space-x-2"
          >
            <span>{isPinned ? '📌' : '📍'}</span>
            <span>{isPinned ? 'Unpin' : 'Pin'}</span>
          </button>
          
          <button
            onClick={() => {
              handleCopy()
              setShowActions(false)
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors flex items-center space-x-2"
          >
            <span>{copied ? '✅' : '📋'}</span>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {onReply && (
            <button
              onClick={() => {
                onReply()
                setShowActions(false)
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors flex items-center space-x-2"
            >
              <span>↩️</span>
              <span>Reply</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

