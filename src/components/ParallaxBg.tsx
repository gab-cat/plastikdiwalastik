import { useEffect, useRef, type CSSProperties } from 'react'
import { Img } from './Img'

/** Background image that scrolls slower than the page, like the Wix "parallax" background. */
export function ParallaxBg({ id, speed = 0.3, opacity = 1, blend }: { id: string; speed?: number; opacity?: number; blend?: CSSProperties['mixBlendMode'] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const section = el?.parentElement
    if (!el || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const { top } = section.getBoundingClientRect()
      el.style.transform = `translate3d(0, ${(-top * speed).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return (
    <div className="parallax-bg" ref={ref} aria-hidden="true" style={{ opacity, mixBlendMode: blend }}>
      <Img id={id} eager alt="" />
    </div>
  )
}
