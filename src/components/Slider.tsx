import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Chevron } from './icons'
import { cx } from '~/lib/layout'

type Autoplay = { mode: 'continuous'; pxPerSecond: number } | { mode: 'step'; intervalMs: number }

interface SliderProps {
  children: ReactNode
  /** Wrapper class; sizes, gap and the starting translate (`--start`) come from CSS. */
  className?: string
  loop?: boolean
  autoplay?: Autoplay
  label: string
}

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
const STEP_MS = 600

/**
 * Horizontal slider modeled on the Wix gallery slider: arrow buttons move one item,
 * looping sliders render the items three times and silently re-center after each move.
 */
export function Slider({ children, className, loop = false, autoplay, label }: SliderProps) {
  const items = Children.toArray(children)
  const count = items.length
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offset = useRef(0)
  const metrics = useRef({ step: 0, copyStart: 0, copyWidth: 0, max: 0 })
  const paused = useRef(false)
  const [edges, setEdges] = useState({ atStart: true, atEnd: false })

  const apply = useCallback((animate: boolean) => {
    const track = trackRef.current
    if (!track) return
    track.style.transition = animate ? `transform ${STEP_MS}ms ease` : 'none'
    track.style.transform = `translate3d(${-offset.current}px, 0, 0)`
  }, [])

  const measure = useCallback(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track || !viewport) return
    const kids = track.children as HTMLCollectionOf<HTMLElement>
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = kids[0] ? kids[0].offsetWidth + gap : 0
    const copyStart = loop && kids[count] ? kids[count].offsetLeft : 0
    const copyWidth = loop && kids[count] ? kids[count].offsetLeft - kids[0].offsetLeft : 0
    const max = Math.max(0, track.scrollWidth - viewport.clientWidth)
    metrics.current = { step, copyStart, copyWidth, max }
  }, [count, loop])

  const updateEdges = useCallback(() => {
    if (loop) return
    const { max } = metrics.current
    setEdges({ atStart: offset.current <= 1, atEnd: offset.current >= max - 1 })
  }, [loop])

  // Keep the looping offset inside the middle copy without a visible jump.
  const recenter = useCallback(() => {
    const { copyStart, copyWidth } = metrics.current
    if (!loop || !copyWidth) return
    if (offset.current < copyStart - copyWidth / 2) offset.current += copyWidth
    else if (offset.current >= copyStart + copyWidth / 2) offset.current -= copyWidth
    apply(false)
  }, [apply, loop])

  // Take over from the CSS starting position (`--start`) once the layout is known.
  useIsoLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const init = () => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(track).transform)
      measure()
      offset.current = -matrix.m41
      apply(false)
      updateEdges()
    }
    // Clear any inline transform so the CSS start position is what we read.
    track.style.transform = ''
    init()
    const ro = new ResizeObserver(() => {
      const { step } = metrics.current
      const index = step ? offset.current / step : 0
      measure()
      offset.current = metrics.current.step * index
      if (!loop) offset.current = Math.min(offset.current, metrics.current.max)
      apply(false)
      updateEdges()
    })
    if (viewportRef.current) ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [apply, measure, updateEdges, loop])

  const move = useCallback(
    (dir: 1 | -1) => {
      const { step, max } = metrics.current
      recenter()
      // Force the browser to commit the silent re-center before animating.
      void trackRef.current?.offsetWidth
      offset.current = loop ? offset.current + dir * step : Math.min(max, Math.max(0, offset.current + dir * step))
      apply(true)
      updateEdges()
    },
    [apply, loop, recenter, updateEdges],
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track || !loop) return
    const onEnd = () => recenter()
    track.addEventListener('transitionend', onEnd)
    return () => track.removeEventListener('transitionend', onEnd)
  }, [loop, recenter])

  // Autoplay, paused on hover/focus, in background tabs and for reduced motion.
  useEffect(() => {
    if (!autoplay || !loop) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (autoplay.mode === 'step') {
      const id = window.setInterval(() => {
        if (!paused.current && !document.hidden) move(1)
      }, autoplay.intervalMs)
      return () => window.clearInterval(id)
    }
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100)
      last = now
      if (!paused.current && !document.hidden) {
        offset.current += (autoplay.pxPerSecond * dt) / 1000
        const { copyStart, copyWidth } = metrics.current
        if (copyWidth && offset.current >= copyStart + copyWidth) offset.current -= copyWidth
        apply(false)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [autoplay, loop, move, apply])

  const rendered = loop ? [0, 1, 2].flatMap((copy) => items.map((child, i) => <SlideCopy key={`${copy}-${i}`} hidden={copy !== 1}>{child}</SlideCopy>)) : items

  return (
    <div
      className={cx('slider', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div className="slider-viewport" ref={viewportRef}>
        <div className="slider-rail" ref={trackRef}>
          {rendered}
        </div>
      </div>
      <button type="button" className="slider-btn slider-prev" aria-label="Previous" hidden={!loop && edges.atStart} onClick={() => move(-1)}>
        <Chevron />
      </button>
      <button type="button" className="slider-btn slider-next" aria-label="Next" hidden={!loop && edges.atEnd} onClick={() => move(1)}>
        <Chevron />
      </button>
    </div>
  )
}

/** Duplicate copies used for looping are hidden from assistive tech and tab order. */
function SlideCopy({ hidden, children }: { hidden: boolean; children: ReactNode }) {
  return (
    <div className="slide" aria-hidden={hidden || undefined} inert={hidden || undefined}>
      {children}
    </div>
  )
}
