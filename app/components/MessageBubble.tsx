'use client'

import { UserAvatar } from './UserAvatar'
import { MessageActions } from './MessageActions'

interface ChatMessage {
  id: string
  fid: string
  username: string
  content: string
  timestamp: Date
  isPinned: boolean
}

interface MessageBubbleProps {
  message: ChatMessage
  onPin: () => void
  onCopy?: () => void
  onReply?: () => void
}

export function MessageBubble({ message, onPin, onCopy, onReply }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'now'
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className={`
      group
      message-bubble 
      ${message.isPinned ? 'border-accent border-2 bg-accent/5' : ''} 
      animate-fade-in
      hover:bg-surface/60
      transition-all
      duration-200
    `}>
      <div className="flex items-start space-x-3">
        <UserAvatar 
          fid={message.fid} 
          username={message.username} 
          size="md"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-semibold text-accent truncate">
              {message.username}
            </span>
            <span className="text-xs text-muted flex-shrink-0">
              {formatTime(message.timestamp)}
            </span>
            {message.isPinned && (
              <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full font-medium">
                PINNED
              </span>
            )}
          </div>
          <p className="text-text text-sm break-words leading-relaxed">
            {message.content}
          </p>
        </div>

        <MessageActions
          messageId={message.id}
          content={message.content}
          isPinned={message.isPinned}
          onPin={onPin}
          onCopy={onCopy}
          onReply={onReply}
        />
      </div>
    </div>
  )
}
