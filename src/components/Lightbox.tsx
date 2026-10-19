import { useCallback, useEffect, useState } from 'react'
import { mediaSrc, mediaSrcSet, videoSrc } from '~/lib/media'
import { Chevron, Close } from './icons'

export type LightboxItem =
  | { kind: 'image'; media: string; title?: string; alt?: string }
  | { kind: 'video'; video: string; poster: string; title?: string }

/** Expanded gallery view, the counterpart of Wix's "expand on click" gallery mode. */
export function useLightbox(items: LightboxItem[]) {
  const [index, setIndex] = useState<number | null>(null)
  const open = useCallback((i: number) => setIndex(i), [])
  const close = useCallback(() => setIndex(null), [])
  const view = index === null ? null : <Lightbox items={items} index={index} onIndex={setIndex} onClose={close} />
  return { open, view }
}

function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: LightboxItem[]
  index: number
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
    <div className="lb" role="dialog" aria-modal="true" aria-label="Expanded view">
      <div className="lb-stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {item.kind === 'image' ? (
          <img key={item.media} src={mediaSrc(item.media, 2560)} srcSet={mediaSrcSet(item.media)} sizes="100vw" alt={item.alt ?? item.title ?? ''} />
        ) : (
          <video key={item.video} src={videoSrc(item.video)} poster={mediaSrc(item.poster)} controls autoPlay playsInline />
        )}
        <button type="button" className="lb-btn lb-close" aria-label="Close" onClick={onClose}>
          <Close />
        </button>
        {count > 1 && (
          <>
            <button type="button" className="lb-btn lb-prev" aria-label="Previous" onClick={() => go(-1)}>
              <Chevron />
            </button>
            <button type="button" className="lb-btn lb-next" aria-label="Next" onClick={() => go(1)}>
              <Chevron />
            </button>
          </>
        )}
      </div>
      <div className="lb-meta">
        {item.title && <div>{item.title}</div>}
        <div className="lb-count">
          {index + 1} / {count}
        </div>
      </div>
    </div>
  )
}
