import { Link, createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Img } from '~/components/Img'
import { homeCards } from '~/data/galleries'
import { at, type Rect } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/')({
  head: () => seo('HOME', '/'),
  component: Home,
})

// Desktop card frames on the 1440 canvas, in the original gallery order.
const cardRects: Rect[] = [
  [41, 90, 487],
  [551, 90, 487],
  [1060, 90, 350],
  [41, 783, 775],
  [839, 783, 570],
]

function Home() {
  return (
    <main>
      <section className="sec" style={{ '--sh': 835, '--msh': 438 } as CSSProperties}>
        <Img id="d3a468_c0b4a46532b14c45954548082addd135~mv2" eager className="cover" alt="" />
        <Img
          id="d3a468_bb47f26db4524412b291aa148b93cbb9~mv2"
          eager
          className="d m"
          style={at([209, 232, 1022, 482], [24, 138, 342, 161])}
          sizes="(min-width: 1024px) 71vw, 88vw"
          alt="Protektahan natin ang ating mga karagatan sa plastik na di astig!"
        />
      </section>

      <section className="sec home-grid" style={{ '--sh': 1944, '--msh': 2644 } as CSSProperties}>
        <div className="home-cards">
          {homeCards.map((card, i) => (
            <Link
              key={card.title}
              to={card.href}
              className="home-card d"
              style={at(cardRects[i])}
              aria-label={card.title}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="home-card-media zoom-media" style={{ '--ar': `${card.w} / ${card.h}` } as CSSProperties}>
                <Img id={card.media} sizes="(min-width: 1024px) 54vw, 80vw" alt="" />
              </div>
              <div className="home-card-title">{card.title}</div>
              <div className="home-card-details" aria-hidden="true">
                <span className="home-card-counter">{String(i + 1).padStart(2, '0')}</span>
                <span className="home-card-mtitle">{card.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
