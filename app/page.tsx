'use client'

import { useMiniKit, useAddFrame, useOpenUrl, usePrimaryButton } from '@coinbase/onchainkit/minikit'
import { useEffect, useState } from 'react'
import { ChatInterface } from './components/ChatInterface'
import { MessageBubble } from './components/MessageBubble'
import { Header } from './components/Header'
import { MessageContainer } from './components/MessageContainer'
import { EmptyState } from './components/EmptyState'

interface ChatMessage {
  id: string
  fid: string
  username: string
  content: string
  timestamp: Date
  isPinned: boolean
}

export default function TrollboxPrime() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      fid: '123',
      username: 'anon',
      content: 'Welcome to the chaos! 🔥',
      timestamp: new Date(),
      isPinned: false
    },
    {
      id: '2',
      fid: '456',
      username: 'troll',
      content: 'This is where productivity goes to die 💀',
      timestamp: new Date(),
      isPinned: false
    }
  ])
  
  const [newMessage, setNewMessage] = useState('')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  usePrimaryButton(
    { text: isActive ? 'PAUSE CHAOS' : 'UNLEASH CHAOS' },
    () => {
      setIsActive(!isActive)
    }
  )

  const handleAddFrame = async () => {
    const result = await addFrame()
    if (result) {
      console.log('Frame added:', result.url, result.token)
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      fid: context?.user?.fid?.toString() || 'anon',
      username: context?.user?.username || 'anon',
      content: newMessage,
      timestamp: new Date(),
      isPinned: false
    }
    
    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const handlePinMessage = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isPinned: !msg.isPinned }
          : msg
      )
    )
  }

  const handleShare = () => {
    const shareText = `Join the most unproductive place on Farcaster! 🔥 Current chaos level: ${messages.length} messages`
    // This would integrate with Farcaster's sharing mechanism
    console.log('Sharing:', shareText)
  }

  const handleCopyMessage = () => {
    console.log('Message copied to clipboard')
  }

  const handleReplyToMessage = () => {
    console.log('Reply to message')
  }

  const pinnedCount = messages.filter(msg => msg.isPinned).length

  return (
    <div className="min-h-screen bg-bg">
      <div className="container mx-auto px-4 py-4 max-w-md">
        {/* Enhanced Header */}
        <Header
          messageCount={messages.length}
          isActive={isActive}
          pinnedCount={pinnedCount}
          onAddFrame={handleAddFrame}
          onShare={handleShare}
          showAddFrame={context && !context.client.added}
        />

        {/* Enhanced Chat Messages */}
        <div className="card mb-4">
          <MessageContainer messageCount={messages.length}>
            {messages.length === 0 ? (
              <EmptyState
                title="Welcome to Trollbox Prime!"
                description="The most chaotic place on Farcaster. Start the conversation!"
                emoji="🎪"
              />
            ) : (
              messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onPin={() => handlePinMessage(message.id)}
                  onCopy={handleCopyMessage}
                  onReply={handleReplyToMessage}
                />
              ))
            )}
          </MessageContainer>
        </div>

        {/* Enhanced Chat Input */}
        <ChatInterface
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          disabled={!isActive}
          maxLength={280}
        />

        {/* Footer */}
        <footer className="mt-6 text-center">
          <button
            onClick={() => openUrl('https://base.org')}
            className="text-sm text-muted hover:text-accent transition-colors flex items-center justify-center space-x-1 mx-auto"
          >
            <span>⚡</span>
            <span>BUILT ON BASE</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
