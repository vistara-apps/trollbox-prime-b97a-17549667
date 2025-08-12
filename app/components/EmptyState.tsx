'use client'

interface EmptyStateProps {
  title?: string
  description?: string
  emoji?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ 
  title = "No messages yet", 
  description = "Be the first to add some chaos to the trollbox!", 
  emoji = "💬",
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
      <div className="text-6xl animate-bounce">
        {emoji}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-text">
          {title}
        </h3>
        <p className="text-muted max-w-sm">
          {description}
        </p>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary mt-4"
        >
          {action.label}
        </button>
      )}

      <div className="flex items-center space-x-4 text-xs text-muted mt-6">
        <div className="flex items-center space-x-1">
          <span>💡</span>
          <span>Tip: Messages appear here in real-time</span>
        </div>
      </div>
    </div>
  )
}

