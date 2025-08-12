/**
 * Avatar utilities for generating user avatars from FID
 */

export interface AvatarConfig {
  size: number
  backgroundColor: string
  textColor: string
}

/**
 * Generate a consistent color from a string (FID)
 */
export function generateColorFromFid(fid: string): string {
  let hash = 0
  for (let i = 0; i < fid.length; i++) {
    hash = fid.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
  ]
  
  return colors[Math.abs(hash) % colors.length]
}

/**
 * Get initials from username
 */
export function getInitials(username: string): string {
  if (!username) return 'A'
  
  const words = username.trim().split(' ')
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

/**
 * Generate avatar data for a user
 */
export function generateAvatarData(fid: string, username: string) {
  return {
    initials: getInitials(username),
    backgroundColor: generateColorFromFid(fid),
    textColor: '#FFFFFF'
  }
}

