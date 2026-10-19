import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { useLightbox, type LightboxItem } from '~/components/Lightbox'
import { Slider } from '~/components/Slider'
import { carouselRows } from '~/data/galleries'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-5')({
  head: () => seo('CAROUSEL', '/blank-5'),
  component: Carousel,
})

/*
 * Row geometry from the original: top offset, item width and the starting translate
 * (one hidden copy of the row plus the visible offset) for desktop (d) and mobile (m).
 */
const rows = [
  { y: 170, w: 304, start: 1663, my: 106, mw: 267, mstart: 1525 },
  { y: 516, w: 300, start: 1623, my: 410, mw: 264, mstart: 1510 },
  { y: 861, w: 300, start: 1623, my: 714, mw: 264, mstart: 1510 },
  { y: 1208, w: 300, start: 1623, my: 1018, mw: 264, mstart: 1510 },
  { y: 1560, w: 300, start: 1623, my: 1321, mw: 264, mstart: 1510 },
]

// The first row scrolls continuously, the others advance one post at a time.
const CONTINUOUS = { mode: 'continuous', pxPerSecond: 36 } as const
const STEP = { mode: 'step', intervalMs: 4000 } as const

const flat: LightboxItem[] = carouselRows.flatMap((row) => row.map((item) => ({ kind: 'image' as const, media: item.media, title: item.title || undefined })))

function Carousel() {
  const lightbox = useLightbox(flat)
  let index = 0

  return (
    <main>
      <section className="sec" style={{ '--sh': 1923, '--msh': 1691 } as CSSProperties}>
        <Img id="d3a468_43e1f6ec543643c5916631d37301f966~mv2" eager className="cover" alt="" />
        {carouselRows.map((row, r) => {
          const g = rows[r]
          const style = {
            '--row-y': g.y,
            '--row-my': g.my,
            '--item-w': g.w,
            '--item-mw': g.mw,
            '--start-d': g.start,
            '--start-m': g.mstart,
          } as CSSProperties
          return (
            <div key={r} style={style}>
              <Slider className="car-row" loop autoplay={r === 0 ? CONTINUOUS : STEP} label={`Carousel ${r + 1}`}>
                {row.map((item) => {
                  const i = index++
                  return (
                    <button key={item.media} type="button" className="g-item car-item" onClick={() => lightbox.open(i)} aria-label={item.title || `Carousel post ${i + 1}`}>
                      <Img id={item.media} sizes="(min-width: 1024px) 21vw, 70vw" alt="" />
                      {item.title && <span className="g-info">{item.title}</span>}
                    </button>
                  )
                })}
              </Slider>
            </div>
          )
        })}
      </section>
      <Footer />
      {lightbox.view}
    </main>
  )
}
