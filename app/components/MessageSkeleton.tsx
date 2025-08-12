'use client'

interface MessageSkeletonProps {
  count?: number
}

export function MessageSkeleton({ count = 3 }: MessageSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="message-bubble animate-pulse">
          <div className="flex items-start space-x-3">
            {/* Avatar skeleton */}
            <div className="w-8 h-8 bg-white/10 rounded-full flex-shrink-0"></div>
            
            <div className="flex-1 space-y-2">
              {/* Header skeleton */}
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-white/10 rounded w-20"></div>
                <div className="h-3 bg-white/10 rounded w-12"></div>
              </div>
              
              {/* Content skeleton */}
              <div className="space-y-1">
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
              </div>
            </div>

            {/* Actions skeleton */}
            <div className="w-6 h-6 bg-white/10 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

