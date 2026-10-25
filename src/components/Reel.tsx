import { useEffect, useRef, type CSSProperties } from 'react'
import { mediaSrc, videoSrc } from '~/lib/media'

interface Props {
  video: string
  poster: string
  name: string
  /** Wix autoplays the reels muted; the interview players don't autoplay on phones. */
  autoplayMobile?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Framed video player from the Reels page. Plays muted and looped while on screen (only
 * the visible videos download), with native controls for sound and seeking.
 */
export function Reel({ video, poster, name, autoplayMobile = true, className, style }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!autoplayMobile && window.matchMedia('(max-width: 1023.98px)').matches) return
    let userPaused = false
    const onPause = () => {
      if (!document.hidden && el.dataset.auto !== 'pausing') userPaused = true
    }
    el.addEventListener('pause', onPause)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused) el.play().catch(() => {})
        } else if (!el.paused) {
          el.dataset.auto = 'pausing'
          el.pause()
          delete el.dataset.auto
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      el.removeEventListener('pause', onPause)
    }
  }, [autoplayMobile])

  return (
    <div className={`reel ${className ?? ''}`} style={style}>
      <video ref={ref} src={videoSrc(video)} poster={mediaSrc(poster, 640)} muted loop playsInline controls preload="none" aria-label={name} />
    </div>
  )
}
