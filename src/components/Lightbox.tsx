import { useCallback, useEffect, useState } from 'react'
import { mediaSrc, mediaSrcSet, videoSrc } from '~/lib/media'
import { Chevron, Close } from './icons'

export type LightboxItem =
  | { kind: 'image'; media: string; title?: string; alt?: string }
  | { kind: 'video'; video: string; poster: string; title?: string }

/**
 * Wix's two "expand on click" looks: `dark` is the full-screen black viewer with a counter
 * (Posters uses the compact spacing, Documentation the roomy one); `overlay` shows only the
 * picture over a dimmed page (Short Comics).
 */
export type LightboxVariant = 'dark-compact' | 'dark' | 'overlay'

export function useLightbox(items: LightboxItem[], variant: LightboxVariant = 'dark') {
  const [index, setIndex] = useState<number | null>(null)
  const open = useCallback((i: number) => setIndex(i), [])
  const close = useCallback(() => setIndex(null), [])
  const view = index === null ? null : <Lightbox items={items} index={index} variant={variant} onIndex={setIndex} onClose={close} />
  return { open, view }
}

const pad = (n: number) => String(n).padStart(2, '0')

function Lightbox({
  items,
  index,
  variant,
  onIndex,
  onClose,
}: {
  items: LightboxItem[]
  index: number
  variant: LightboxVariant
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const count = items.length
  const go = useCallback((delta: number) => onIndex((index + delta + count) % count), [index, count, onIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [go, onClose])

  const item = items[index]
  return (
    <div className={`lb lb-${variant}`} role="dialog" aria-modal="true" aria-label={item.title ?? 'Expanded view'}>
      <div className="lb-stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {item.kind === 'image' ? (
          <img key={item.media} src={mediaSrc(item.media, 2560)} srcSet={mediaSrcSet(item.media)} sizes="100vw" alt={item.alt ?? item.title ?? ''} />
        ) : (
          <video key={item.video} src={videoSrc(item.video)} poster={mediaSrc(item.poster)} controls autoPlay playsInline />
        )}
      </div>
      <div className="lb-count" aria-live="polite">
        {pad(index + 1)} / {pad(count)}
      </div>
      <button type="button" className="lb-btn lb-close" aria-label="Close" onClick={onClose}>
        <Close />
      </button>
      {count > 1 && (
        <>
          <button type="button" className="lb-btn lb-arrow lb-prev" aria-label="Previous" onClick={() => go(-1)}>
            <Chevron />
          </button>
          <button type="button" className="lb-btn lb-arrow lb-next" aria-label="Next" onClick={() => go(1)}>
            <Chevron />
          </button>
        </>
      )}
    </div>
  )
}
