import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { useLightbox } from '~/components/Lightbox'
import { Marquee } from '~/components/Marquee'
import { ParallaxBg } from '~/components/ParallaxBg'
import { Slider } from '~/components/Slider'
import { comicChapters } from '~/data/galleries'
import { at } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-4')({
  head: () => seo('SHORT COMICS', '/blank-4'),
  component: ShortComic,
})

// Phones get an auto-scrolling strip of chapters 1-5 instead of the desktop slider.
const MOBILE_CHAPTERS = 5

function ShortComic() {
  const lightbox = useLightbox(comicChapters.map((c) => ({ kind: 'image', media: c.media, title: c.title })))

  return (
    <main>
      <section className="sec" style={{ '--sh': 1117, '--msh': 690 } as CSSProperties}>
        <ParallaxBg id="d3a468_7b7f611e6019475683d800d051bf014b~mv2" opacity={0.65} />
        <Img id="d3a468_31d585b35e4c4530ae795f5141946828~mv2" eager className="d m fill" style={at([509, 199, 421, 153], [80, 119, 229, 83])} sizes="(min-width: 1024px) 30vw, 59vw" alt="" />
        <h1 className="comic-title d m" style={at([536, 246, 368], [117, 149, 155])}>
          SHORT COMICS
        </h1>
        <div className="band comic-band d m" style={at([38, 505, 1364, 481], [16, 265, 358, 357])} />
        <Slider className="comic-slider d-only" label="Short comics">
          {comicChapters.map((chapter, i) => (
            <button
              key={chapter.media}
              type="button"
              className="g-item comic-item"
              style={{ '--ar': `${chapter.w} / ${chapter.h}` } as CSSProperties}
              onClick={() => lightbox.open(i)}
              aria-label={chapter.title}
            >
              <Img id={chapter.media} sizes="25vw" alt="" />
              <span className="g-info">{chapter.title}</span>
            </button>
          ))}
        </Slider>
        <Marquee
          items={comicChapters.slice(0, MOBILE_CHAPTERS).map((c) => c.media)}
          desktop={{ height: 315, gap: 20 }}
          mobile={{ height: 315, gap: 20 }}
          className="m m-only"
          style={at(undefined, [36, 286, 322, 315])}
          sizes="65vw"
          onItemClick={(i) => lightbox.open(i)}
          itemLabel={(i) => comicChapters[i].title}
        />
      </section>
      <Footer />
      {lightbox.view}
    </main>
  )
}
