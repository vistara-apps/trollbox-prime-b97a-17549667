'use client'

import { useEffect, useState } from 'react'

interface LiveStatsProps {
  messageCount: number
  pinnedCount: number
  isActive: boolean
}

export function LiveStats({ messageCount, pinnedCount, isActive }: LiveStatsProps) {
  const [displayCount, setDisplayCount] = useState(messageCount)
  const [isAnimating, setIsAnimating] = useState(false)

  // Animate count changes
  useEffect(() => {
    if (messageCount !== displayCount) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setDisplayCount(messageCount)
        setIsAnimating(false)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [messageCount, displayCount])

  const getActivityLevel = () => {
    if (messageCount < 5) return { level: 'Low', color: 'text-blue-400', emoji: '🌊' }
    if (messageCount < 20) return { level: 'Medium', color: 'text-yellow-400', emoji: '🔥' }
    return { level: 'High', color: 'text-red-400', emoji: '💀' }
  }

  const activity = getActivityLevel()

  return (
    <div className="flex items-center space-x-4 text-sm text-muted">
      <div className="flex items-center space-x-1">
        <span className={isAnimating ? 'animate-bounce' : ''}>
          {displayCount}
        </span>
        <span>messages</span>
      </div>
      
      {pinnedCount > 0 && (
        <div className="flex items-center space-x-1">
          <span>📌</span>
          <span>{pinnedCount} pinned</span>
        </div>
      )}
      
      {isActive && (
        <div className="flex items-center space-x-1">
          <span>{activity.emoji}</span>
          <span className={activity.color}>
            {activity.level} chaos
          </span>
        </div>
      )}
    </div>
  )
}

