import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { useLightbox } from '~/components/Lightbox'
import { ParallaxBg } from '~/components/ParallaxBg'
import { Slider } from '~/components/Slider'
import { comicChapters } from '~/data/galleries'
import { at } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-4')({
  head: () => seo('SHORT COMIC', '/blank-4'),
  component: ShortComic,
})

function ShortComic() {
  const lightbox = useLightbox(comicChapters.map((c) => ({ kind: 'image', media: c.media, title: c.title })))

  return (
    <main>
      <section className="sec" style={{ '--sh': 1038, '--msh': 1129 } as CSSProperties}>
        <ParallaxBg id="d3a468_7b7f611e6019475683d800d051bf014b~mv2" opacity={0.65} />
        <Img id="d3a468_31d585b35e4c4530ae795f5141946828~mv2" eager className="d m fill" style={at([509, 199, 421, 153], [24, 175, 342, 124])} sizes="(min-width: 1024px) 30vw, 88vw" alt="" />
        <h1 className="comic-title d m" style={at([570, 251, 300], [24, 323, 342])}>
          SHORT COMICS
        </h1>
        <div className="band d m" style={at([0, 426, 1440, 483], [0, 373, 390, 150])} />
        <Slider className="comic-slider" label="Short comics">
          {comicChapters.map((chapter, i) => (
            <button
              key={chapter.media}
              type="button"
              className="g-item comic-item"
              style={{ '--ar': `${chapter.w} / ${chapter.h}` } as CSSProperties}
              onClick={() => lightbox.open(i)}
              aria-label={chapter.title}
            >
              <Img id={chapter.media} sizes="(min-width: 1024px) 25vw, 80vw" alt="" />
              <span className="g-info">{chapter.title}</span>
            </button>
          ))}
        </Slider>
      </section>
      <Footer />
      {lightbox.view}
    </main>
  )
}
