'use client'

import { ReactNode } from 'react'
import { useAutoScroll } from '../hooks/useAutoScroll'
import { ScrollToBottom } from './ScrollToBottom'

interface MessageContainerProps {
  children: ReactNode
  messageCount: number
  className?: string
}

export function MessageContainer({ 
  children, 
  messageCount, 
  className = '' 
}: MessageContainerProps) {
  const { containerRef, showScrollButton, scrollToBottom } = useAutoScroll<HTMLDivElement>(
    [messageCount],
    { threshold: 50 }
  )

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`
          h-80 
          overflow-y-auto 
          scroll-smooth
          scrollbar-thin 
          scrollbar-track-surface 
          scrollbar-thumb-white/20
          hover:scrollbar-thumb-white/30
          ${className}
        `}
      >
        <div className="space-y-2 p-1">
          {children}
        </div>
      </div>
      
      <ScrollToBottom 
        show={showScrollButton}
        onClick={scrollToBottom}
      />
    </div>
  )
}

