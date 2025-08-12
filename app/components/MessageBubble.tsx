'use client'

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
}

export function MessageBubble({ message, onPin }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`message-bubble ${message.isPinned ? 'border-accent border-2' : ''} animate-fade-in`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-semibold text-accent">
              {message.username}
            </span>
            <span className="text-xs text-muted">
              {formatTime(message.timestamp)}
            </span>
            {message.isPinned && (
              <span className="text-xs bg-accent text-white px-1 rounded">
                PINNED
              </span>
            )}
          </div>
          <p className="text-text text-sm break-words">
            {message.content}
          </p>
        </div>
        <button
          onClick={onPin}
          className={`ml-2 text-xs px-2 py-1 rounded transition-colors ${
            message.isPinned 
              ? 'bg-accent text-white' 
              : 'bg-surface hover:bg-accent/20 text-muted hover:text-accent'
          }`}
        >
          📌
        </button>
      </div>
    </div>
  )
}
