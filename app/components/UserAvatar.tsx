'use client'

import { generateAvatarData } from '../utils/avatarUtils'

interface UserAvatarProps {
  fid: string
  username: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-12 h-12 text-base'
}

export function UserAvatar({ fid, username, size = 'md', className = '' }: UserAvatarProps) {
  const avatarData = generateAvatarData(fid, username)
  
  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        flex 
        items-center 
        justify-center 
        font-semibold 
        flex-shrink-0
        ring-2 
        ring-white/10
        ${className}
      `}
      style={{ 
        backgroundColor: avatarData.backgroundColor,
        color: avatarData.textColor 
      }}
    >
      {avatarData.initials}
    </div>
  )
}

