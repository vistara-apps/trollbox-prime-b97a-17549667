'use client'

import { useEffect, useRef, useState } from 'react'

interface UseAutoScrollOptions {
  threshold?: number
  behavior?: ScrollBehavior
}

export function useAutoScroll<T extends HTMLElement>(
  dependencies: any[],
  options: UseAutoScrollOptions = {}
) {
  const { threshold = 100, behavior = 'smooth' } = options
  const containerRef = useRef<T>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior
      })
    }
  }

  const checkScrollPosition = () => {
    if (!containerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    
    const atBottom = distanceFromBottom <= threshold
    setIsAtBottom(atBottom)
    setShowScrollButton(!atBottom && scrollHeight > clientHeight)
  }

  // Auto-scroll when new content is added and user is at bottom
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom()
    }
  }, dependencies)

  // Set up scroll listener
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', checkScrollPosition)
    
    // Initial check
    checkScrollPosition()

    return () => {
      container.removeEventListener('scroll', checkScrollPosition)
    }
  }, [threshold])

  return {
    containerRef,
    isAtBottom,
    showScrollButton,
    scrollToBottom
  }
}

