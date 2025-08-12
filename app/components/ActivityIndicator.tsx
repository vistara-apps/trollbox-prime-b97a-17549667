'use client'

interface ActivityIndicatorProps {
  isActive: boolean
}

export function ActivityIndicator({ isActive }: ActivityIndicatorProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`
        w-2 h-2 
        rounded-full 
        ${isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}
        transition-colors
        duration-300
      `} />
      <span className={`
        text-xs 
        font-medium 
        px-2 
        py-0.5 
        rounded-full 
        ${isActive 
          ? 'bg-green-400/20 text-green-400' 
          : 'bg-red-400/20 text-red-400'
        }
        transition-all
        duration-300
      `}>
        {isActive ? 'LIVE' : 'PAUSED'}
      </span>
    </div>
  )
}

