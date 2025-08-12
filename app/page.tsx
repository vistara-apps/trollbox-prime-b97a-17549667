'use client'

import { useMiniKit, useAddFrame, useOpenUrl, usePrimaryButton } from '@coinbase/onchainkit/minikit'
import { useEffect, useState } from 'react'
import { ChatInterface } from './components/ChatInterface'
import { MessageBubble } from './components/MessageBubble'

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

  return (
    <div className="min-h-screen bg-bg">
      <div className="container mx-auto px-4 py-4 max-w-md">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-text">Trollbox Prime</h1>
            <p className="text-sm text-muted">
              {messages.length} messages • {isActive ? 'LIVE' : 'PAUSED'}
            </p>
          </div>
          <div className="flex space-x-2">
            {context && !context.client.added && (
              <button
                onClick={handleAddFrame}
                className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90"
              >
                SAVE
              </button>
            )}
            <button
              onClick={handleShare}
              className="bg-accent text-white px-3 py-1 rounded text-sm hover:bg-accent/90"
            >
              SHARE
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="card mb-4 h-64 overflow-y-auto">
          <div className="space-y-2">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onPin={() => handlePinMessage(message.id)}
              />
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <ChatInterface
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
          disabled={!isActive}
        />

        {/* Footer */}
        <footer className="mt-4 text-center">
          <button
            onClick={() => openUrl('https://base.org')}
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            BUILT ON BASE
          </button>
        </footer>
      </div>
    </div>
  )
}
