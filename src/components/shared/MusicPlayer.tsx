'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { 
  Play, Pause, SkipBack, SkipForward, Heart, 
  ListMusic, Music2, X 
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================
// KONFIGURASI MUSIC - Ganti sesuai keinginan
// ============================================
const PLAYLIST = [
  {
    title: 'bye (Altare Remix)',
    artist: 'Ariana Grande',
    src: '/music/ariana-bye-altare-remix.mp3',
  },
  {
    title: 'HEAVENLY JUMPSTYLE SLOWED',
    artist: 'The Vibe Guide',
    src: '/music/heavenly-jumpstyle-slowed.mp3',
  },
]

// ============================================
// GLOBAL AUDIO SINGLETON
// Ensures only ONE audio instance exists across
// all MusicPlayer component renders
// ============================================
let globalAudio: HTMLAudioElement | null = null
let globalCurrentTrack = 0
let globalIsPlaying = false
let globalHasInteracted = false
const listeners = new Set<() => void>()

const blobUrlCache = new Map<string, string>()

async function setAudioSourceSafely(audio: HTMLAudioElement, url: string, playAfterLoad: boolean) {
  try {
    let blobUrl = blobUrlCache.get(url)
    if (!blobUrl) {
      const response = await fetch(url)
      const blob = await response.blob()
      blobUrl = URL.createObjectURL(blob)
      blobUrlCache.set(url, blobUrl)
    }
    audio.src = blobUrl
    audio.load()
    if (playAfterLoad) {
      audio.play().catch(() => {})
    }
  } catch (error) {
    console.error("Failed to load audio safely", error)
    audio.src = url
    if (playAfterLoad) {
      audio.play().catch(() => {})
    }
  }
}

function getGlobalAudio(): HTMLAudioElement {
  if (typeof window === 'undefined') {
    return null as unknown as HTMLAudioElement
  }
  if (!globalAudio) {
    globalAudio = new Audio()
    globalAudio.volume = 0.3
    globalAudio.preload = 'auto'
    
    // Load first track safely
    const track = PLAYLIST[globalCurrentTrack]
    if (track) {
      globalAudio.loop = PLAYLIST.length === 1
      setAudioSourceSafely(globalAudio, track.src, false)
    }

    globalAudio.addEventListener('play', () => {
      globalIsPlaying = true
      notifyListeners()
    })
    globalAudio.addEventListener('pause', () => {
      globalIsPlaying = false
      notifyListeners()
    })
    globalAudio.addEventListener('timeupdate', () => {
      notifyListeners()
    })
    globalAudio.addEventListener('loadedmetadata', () => {
      notifyListeners()
    })
    globalAudio.addEventListener('ended', () => {
      if (PLAYLIST.length > 1) {
        changeTrack((globalCurrentTrack + 1) % PLAYLIST.length, true)
      }
    })
  }
  return globalAudio
}

function notifyListeners() {
  listeners.forEach(l => l())
}

function changeTrack(idx: number, forcePlay: boolean = false) {
  const audio = getGlobalAudio()
  const playAfterLoad = globalIsPlaying || forcePlay
  
  // Stop current audio first
  audio.pause()
  audio.currentTime = 0
  
  globalCurrentTrack = idx
  const track = PLAYLIST[idx]
  if (track) {
    audio.loop = PLAYLIST.length === 1
    setAudioSourceSafely(audio, track.src, playAfterLoad)
  }
  notifyListeners()
}


// ============================================
// Mini Player Icon Button (tampil di header)
// ============================================
export function MusicToggleButton({ 
  onClick, 
  isPlaying,
  className 
}: { 
  onClick: () => void
  isPlaying: boolean 
  className?: string 
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Open music player"
      className={cn(
        "relative p-2 rounded-lg transition-all duration-300 group",
        "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
        isPlaying && "text-primary hover:text-primary/80",
        className
      )}
    >
      {isPlaying ? (
        <div className="relative size-5 flex items-end justify-center gap-[3px]">
          <span className="w-[3px] bg-current rounded-full animate-music-bar-1" />
          <span className="w-[3px] bg-current rounded-full animate-music-bar-2" />
          <span className="w-[3px] bg-current rounded-full animate-music-bar-3" />
          <span className="w-[3px] bg-current rounded-full animate-music-bar-4" />
        </div>
      ) : (
        <Music2 className="size-5" />
      )}
    </button>
  )
}

// ============================================
// Music Player Component
// Uses the global audio singleton - safe to 
// render multiple times without audio overlap
// ============================================
export function MusicPlayer({ className }: { className?: string }) {
  const [, forceUpdate] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)

  // Subscribe to global audio state changes
  useEffect(() => {
    // Initialize audio on mount
    getGlobalAudio()
    
    const callback = () => forceUpdate(n => n + 1)
    listeners.add(callback)
    return () => { listeners.delete(callback) }
  }, [])

  // Auto-play on first user interaction
  useEffect(() => {
    if (globalHasInteracted) return

    const handleFirstInteraction = () => {
      if (!globalHasInteracted) {
        const audio = getGlobalAudio()
        audio.play().catch(() => {})
        globalHasInteracted = true
      }
    }

    window.addEventListener('click', handleFirstInteraction, { once: true })
    window.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  const audio = globalAudio
  const isPlaying = globalIsPlaying
  const currentTrack = globalCurrentTrack
  const track = PLAYLIST[currentTrack]
  const currentTime = audio?.currentTime || 0
  const duration = audio?.duration || 0
  const progress = duration ? (currentTime / duration) * 100 : 0

  const togglePlay = useCallback(() => {
    const audio = getGlobalAudio()
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    globalHasInteracted = true
  }, [isPlaying])

  const nextTrack = useCallback(() => {
    changeTrack((globalCurrentTrack + 1) % PLAYLIST.length, true)
    globalHasInteracted = true
  }, [])

  const prevTrack = useCallback(() => {
    const audio = getGlobalAudio()
    if (audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    changeTrack((globalCurrentTrack - 1 + PLAYLIST.length) % PLAYLIST.length, true)
    globalHasInteracted = true
  }, [])

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev)
    setShowPlaylist(false)
    globalHasInteracted = true
  }, [])

  return (
    <>
      {/* Toggle Button - shown in header */}
      <MusicToggleButton
        onClick={toggleExpanded}
        isPlaying={isPlaying}
        className={className}
      />

      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Mini Player Widget */}
      <div
        className={cn(
          "fixed z-[201] transition-all duration-500 ease-out",
          "bottom-20 left-3 right-3 lg:bottom-auto lg:left-auto lg:top-16 lg:right-6 lg:w-[320px]",
          isExpanded
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        )}
      >
        <div className="relative rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
          
          {/* Progress Bar */}
          <div className="relative h-1.5 group flex items-center rounded-t-2xl overflow-hidden bg-white/10">
            <input
              type="range"
              min={0}
              max={100}
              value={progress || 0}
              onChange={(e) => {
                const percent = parseFloat(e.target.value)
                const audio = getGlobalAudio()
                if (audio.duration) {
                  audio.currentTime = (percent / 100) * audio.duration
                }
                globalHasInteracted = true
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute pointer-events-none w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
              style={{ left: `calc(${Math.min(98, progress)}%)`, transform: 'translateX(-50%)' }}
            />
          </div>

          {/* Track Info + Close */}
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={cn(
                "flex-shrink-0 size-10 rounded-lg bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center border border-white/5",
                isPlaying && "animate-pulse"
              )}>
                <Music2 className="size-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">
                  {track?.title || 'No Track'}
                </p>
                <p className="text-xs text-zinc-400 truncate">
                  {track?.artist || 'Unknown'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsExpanded(false)}
              className="flex-shrink-0 p-1.5 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Time display */}
          <div className="flex items-center justify-between px-4 text-[10px] text-zinc-500 font-medium tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-5 py-3 relative">
            {/* Playlist / Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={cn(
                  "p-2 rounded-full transition-all active:scale-90",
                  showPlaylist ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/10"
                )}
                aria-label="Playlist"
              >
                <ListMusic className="size-[18px]" />
              </button>

              {/* Playlist Popover */}
              {showPlaylist && (
                <div className="absolute bottom-full left-0 mb-2 w-64 max-h-48 overflow-y-auto rounded-xl bg-zinc-800 border border-white/10 shadow-xl z-50 p-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {PLAYLIST.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        changeTrack(idx, true)
                        setShowPlaylist(false)
                        globalHasInteracted = true
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                        currentTrack === idx 
                          ? "bg-primary/20 text-primary" 
                          : "hover:bg-white/5 text-zinc-300"
                      )}
                    >
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-medium truncate">{t.title}</span>
                        <span className="text-xs opacity-70 truncate">{t.artist}</span>
                      </div>
                      {currentTrack === idx && isPlaying && (
                         <div className="ml-2 flex items-end justify-center gap-[2px] h-3">
                           <span className="w-1 bg-primary rounded-full animate-music-bar-1" />
                           <span className="w-1 bg-primary rounded-full animate-music-bar-2" />
                           <span className="w-1 bg-primary rounded-full animate-music-bar-3" />
                         </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Previous */}
            <button 
              onClick={prevTrack}
              className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all active:scale-90"
              aria-label="Previous track"
            >
              <SkipBack className="size-5" fill="currentColor" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="relative flex items-center justify-center size-12 rounded-full bg-white text-zinc-900 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-white/20"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="size-5" fill="currentColor" />
              ) : (
                <Play className="size-5 ml-0.5" fill="currentColor" />
              )}
            </button>

            {/* Next */}
            <button 
              onClick={nextTrack}
              className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all active:scale-90"
              aria-label="Next track"
            >
              <SkipForward className="size-5" fill="currentColor" />
            </button>

            {/* Like/Heart */}
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "p-2 rounded-full transition-all active:scale-90",
                isLiked 
                  ? "text-red-500 hover:text-red-400" 
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              )}
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart className="size-[18px]" fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
