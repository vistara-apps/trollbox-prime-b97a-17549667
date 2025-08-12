'use client'

interface EmotePickerProps {
  onSelect: (emote: string) => void
}

export function EmotePicker({ onSelect }: EmotePickerProps) {
  const emoteCategories = {
    faces: ['😂', '😈', '🤡', '😎', '🥳', '😤', '🤯', '😵'],
    symbols: ['🔥', '💀', '⚡', '💎', '🚀', '💸', '🎯', '🎲'],
    objects: ['🎪', '🎭', '🌙', '⭐', '💊', '🔮', '🎨', '🎵']
  }

  const allEmotes = Object.values(emoteCategories).flat()

  return (
    <div className="card p-3 animate-slide-up shadow-lg border border-white/20 bg-surface">
      <div className="grid grid-cols-8 gap-1 max-w-[240px]">
        {allEmotes.map((emote) => (
          <button
            key={emote}
            onClick={() => onSelect(emote)}
            className="p-2 rounded hover:bg-white/10 transition-colors text-lg hover:scale-110 transform duration-150"
            title={`Add ${emote}`}
          >
            {emote}
          </button>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-white/10">
        <p className="text-xs text-muted text-center">Click to add emoji</p>
      </div>
    </div>
  )
}
