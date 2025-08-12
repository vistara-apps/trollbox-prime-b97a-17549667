
import { ChatMessage } from '../types/chat'

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function formatRelativeTime(timestamp: string): string {
  const now = new Date()
  const messageTime = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - messageTime.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}m ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days}d ago`
  }
}

export function sanitizeMessage(content: string): string {
  return content
    .trim()
    .replace(/\s+/g, ' ')
    .substring(0, 280)
}

export function isValidMessage(content: string): boolean {
  const sanitized = sanitizeMessage(content)
  return sanitized.length > 0 && sanitized.length <= 280
}
