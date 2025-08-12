'use client'

interface ScrollToBottomProps {
  show: boolean
  onClick: () => void
}

export function ScrollToBottom({ show, onClick }: ScrollToBottomProps) {
  if (!show) return null

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <button
        onClick={onClick}
        className="
          bg-accent 
          hover:bg-accent/90 
          text-white 
          rounded-full 
          p-2 
          shadow-lg 
          transition-all 
          duration-200 
          hover:scale-110
          animate-fade-in
          border-2
          border-white/20
        "
        aria-label="Scroll to bottom"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </button>
    </div>
  )
}

