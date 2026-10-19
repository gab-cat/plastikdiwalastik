import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { useLightbox } from '~/components/Lightbox'
import { posterItems } from '~/data/galleries'
import { at } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-5-1-1')({
  head: () => seo('POSTER', '/blank-5-1-1'),
  component: Poster,
})

// 4 x 2 grid of 324px tiles on desktop, a single column of 342px tiles on mobile.
const tile = (i: number) =>
  at([40 + (i % 4) * 347.67, 68 + Math.floor(i / 4) * 348, 324, 324], [24, 60 + i * 366, 342, 342])

function Poster() {
  const lightbox = useLightbox(posterItems.map((p) => ({ kind: 'image', media: p.media, title: p.title })))

  return (
    <main>
      <section className="sec" style={{ '--sh': 1828, '--msh': 3024 } as CSSProperties}>
        <Img id="d3a468_43e1f6ec543643c5916631d37301f966~mv2" eager className="cover" alt="" />
        {posterItems.map((item, i) => (
          <button key={item.media} type="button" className="g-item poster-item d m" style={tile(i)} onClick={() => lightbox.open(i)} aria-label={item.title}>
            <Img id={item.media} sizes="(min-width: 1024px) 23vw, 88vw" alt="" />
            <span className="g-info">{item.title}</span>
          </button>
        ))}
      </section>
      <Footer />
      {lightbox.view}
    </main>
  )
}
