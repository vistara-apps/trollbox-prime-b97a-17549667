'use client'

import { ActivityIndicator } from './ActivityIndicator'
import { LiveStats } from './LiveStats'

interface HeaderProps {
  messageCount: number
  isActive: boolean
  pinnedCount: number
  onAddFrame?: () => void
  onShare?: () => void
  showAddFrame?: boolean
}

export function Header({ 
  messageCount, 
  isActive, 
  pinnedCount, 
  onAddFrame, 
  onShare,
  showAddFrame = false 
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-4 p-4 bg-surface/50 rounded-lg border border-white/10">
      <div className="flex items-center space-x-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-text">Trollbox Prime</h1>
            <ActivityIndicator isActive={isActive} />
          </div>
          <LiveStats 
            messageCount={messageCount}
            pinnedCount={pinnedCount}
            isActive={isActive}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {showAddFrame && (
          <button
            onClick={onAddFrame}
            className="bg-primary text-white px-3 py-1.5 rounded-md text-sm hover:bg-primary/90 transition-colors flex items-center space-x-1"
          >
            <span>💾</span>
            <span>SAVE</span>
          </button>
        )}
        <button
          onClick={onShare}
          className="bg-accent text-white px-3 py-1.5 rounded-md text-sm hover:bg-accent/90 transition-colors flex items-center space-x-1"
        >
          <span>🚀</span>
          <span>SHARE</span>
        </button>
      </div>
    </header>
  )
}

