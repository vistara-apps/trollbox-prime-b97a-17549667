
'use client'

interface EmotePickerProps {
  variant: 'hidden' | 'visible'
  onEmoteSelect?: (emote: string) => void
}

export function EmotePicker({ variant, onEmoteSelect }: EmotePickerProps) {
  const emotes = [
    '😂', '😈', '🔥', '💀', '🎪', '🤡', '👹', '💩',
    '🚀', '💎', '🌙', '⚡', '💸', '🎯', '🎲', '🎭'
  ]

  if (variant === 'hidden') return null

  return (
    <div className="card p-2 animate-slide-up">
      <div className="grid grid-cols-8 gap-1">
        {emotes.map((emote) => (
          <button
            key={emote}
            onClick={() => onEmoteSelect?.(emote)}
            className="p-2 rounded hover:bg-border transition-colors text-lg"
          >
            {emote}
          </button>
        ))}
      </div>
    </div>
  )
}
