
'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { InputArea } from './InputArea'
import { useChatStore } from '../hooks/useChatStore'
import { useMiniKit } from '@coinbase/onchainkit/minikit'

export function TrollboxChat() {
  const { context } = useMiniKit()
  const { messages, addMessage, isLoading } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const newMessage = {
      messageId: `msg_${Date.now()}`,
      fid: context?.user?.fid || 'anonymous',
      username: context?.user?.username || 'Anonymous Troll',
      content: content.trim(),
      timestamp: new Date().toISOString(),
      isPinned: false,
      isLocked: false,
    }

    addMessage(newMessage)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
        {isLoading && messages.length === 0 ? (
          <div className="text-center text-text-muted py-8">
            <div className="animate-pulse">Loading the chaos...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-text-muted py-8">
            <div className="mb-2">🎪</div>
            <div>Welcome to the Trollbox!</div>
            <div className="text-sm">Be the first to start the chaos...</div>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.messageId}
              message={message}
              isOwnMessage={message.fid === (context?.user?.fid || 'anonymous')}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border">
        <InputArea onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
