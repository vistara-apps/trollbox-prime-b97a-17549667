
export interface ChatMessage {
  messageId: string
  fid: string
  username: string
  content: string
  timestamp: string
  isPinned: boolean
  isLocked: boolean
}

export interface ChatSession {
  sessionId: string
  createdAt: string
  activeUsersCount: number
  currentTopic: string
}

export interface User {
  fid: string
  username: string
  profilePicUrl?: string
  isPremium: boolean
}
