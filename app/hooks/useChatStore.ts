
'use client'

import { useState, useEffect } from 'react'
import { ChatMessage } from '../types/chat'

// Mock chat data for demonstration
const mockMessages: ChatMessage[] = [
  {
    messageId: 'msg_1',
    fid: 'troll1',
    username: 'ChaosGoblin',
    content: 'First! 🎪',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    isPinned: false,
    isLocked: false,
  },
  {
    messageId: 'msg_2',
    fid: 'troll2',
    username: 'MemeKing',
    content: 'GM trolls! Ready for maximum chaos today? 💀',
    timestamp: new Date(Date.now() - 240000).toISOString(),
    isPinned: true,
    isLocked: false,
  },
  {
    messageId: 'msg_3',
    fid: 'troll3',
    username: 'BasedAnon',
    content: 'LFG!!! 🚀🚀🚀',
    timestamp: new Date(Date.now() - 180000).toISOString(),
    isPinned: false,
    isLocked: false,
  },
  {
    messageId: 'msg_4',
    fid: 'troll4',
    username: 'DiamondHands',
    content: 'Anyone else procrastinating by being here? 😂',
    timestamp: new Date(Date.now() - 120000).toISOString(),
    isPinned: false,
    isLocked: false,
  }
]

export function useChatStore() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setMessages(mockMessages)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message])
  }

  const pinMessage = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.messageId === messageId 
          ? { ...msg, isPinned: !msg.isPinned }
          : msg
      )
    )
  }

  return {
    messages,
    isLoading,
    addMessage,
    pinMessage,
  }
}
