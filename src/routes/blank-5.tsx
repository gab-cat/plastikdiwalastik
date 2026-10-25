import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { useLightbox, type LightboxItem } from '~/components/Lightbox'
import { Marquee } from '~/components/Marquee'
import { ParallaxBg } from '~/components/ParallaxBg'
import { ProjectTitle } from '~/components/ProjectTitle'
import { Slider } from '~/components/Slider'
import { carouselRows } from '~/data/projects'
import { at } from '~/lib/layout'
import { mediaInfo } from '~/lib/media'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-5')({
  head: () => seo('CAROUSELS', '/blank-5'),
  component: Carousel,
})

// Row tops on the 1440 (d) and 390 (m) canvases. Desktop rows are arrow sliders that start
// scrolled ~89px into the row; phones get auto-scrolling strips instead.
const rowY = { d: [313, 646, 979, 1309, 1642, 1974], m: [204, 410, 616, 822, 1032, 1243] }
const ROW_H = 300
const GAP = 7

const flat: LightboxItem[] = carouselRows.flatMap((row) => row.items.map((media) => ({ kind: 'image' as const, media, title: row.title })))

function Carousel() {
  const lightbox = useLightbox(flat)
  let offset = 0

  return (
    <main>
      <section className="sec car-sec" style={{ '--sh': 2318, '--msh': 1848 } as CSSProperties}>
        <ParallaxBg id="d3a468_43e1f6ec543643c5916631d37301f966~mv2" />
        <ProjectTitle label="CAROUSELS" image={[[509, 127, 421, 153], [82, 94, 230, 83]]} text={[[536, 180, 368], [127, 121, 139]]} />
        {carouselRows.map((row, r) => {
          const first = offset
          offset += row.items.length
          const widths = row.items.map((id) => (ROW_H * mediaInfo(id).w) / mediaInfo(id).h)
          // Middle-copy start of the looping slider: one full copy plus the visible offset.
          const start = widths.reduce((sum, w) => sum + w + GAP, 0) + (r === 0 ? 107 : 89)
          const style = { '--row-y': rowY.d[r], '--start-d': start } as CSSProperties
          return (
            <div key={row.title} style={{ display: 'contents' }}>
              <div className="d-only" style={style}>
                <Slider className="car-row" loop label={row.title}>
                  {row.items.map((media, i) => (
                    <button
                      key={media}
                      type="button"
                      className="g-item car-item"
                      style={{ width: `calc(var(--u) * ${widths[i]})` }}
                      onClick={() => lightbox.open(first + i)}
                      aria-label={`${row.title} ${i + 1}`}
                    >
                      <Img id={media} sizes="21vw" alt="" />
                      <span className="g-info">{row.title}</span>
                    </button>
                  ))}
                </Slider>
              </div>
              <Marquee
                items={row.items}
                desktop={{ height: 187, gap: 20 }}
                mobile={{ height: 187, gap: r === 1 ? 6 : 20 }}
                className="m m-only"
                style={at(undefined, [24, rowY.m[r], 345, 187])}
                sizes="48vw"
                onItemClick={(i) => lightbox.open(first + i)}
                itemLabel={(i) => `${row.title} ${i + 1}`}
              />
            </div>
          )
        })}
      </section>
      <Footer />
      {lightbox.view}
    </main>
  )
}
