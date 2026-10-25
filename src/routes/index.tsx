import { Link, createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { Marquee } from '~/components/Marquee'
import { homeRows } from '~/data/home'
import { at, type Rect } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/')({
  head: () => seo('HOME', '/'),
  component: Home,
})

// Row tops and label buttons on the 1440 (d) and 390 (m) canvases, relative to the rows section.
const rowY = { d: [57, 373, 690, 1009, 1320], m: [48, 269, 492, 715, 940] }
const pills: { d: Rect; m: Rect }[] = [
  { d: [594, 157, 251, 77], m: [114, 105, 162, 52] },
  { d: [594, 465, 251, 77], m: [114, 313, 162, 52] },
  { d: [594, 786, 251, 77], m: [114, 530, 162, 48] },
  { d: [594, 1114, 251, 77], m: [114, 744, 162, 52] },
  { d: [594, 1419, 251, 77], m: [114, 956, 162, 52] },
]

function Home() {
  return (
    <main>
      <section className="sec home-hero" style={{ '--sh': 835, '--msh': 519 } as CSSProperties}>
        <Img id="d3a468_4f17c7dbd3e145c8b54676b313206c78~mv2" eager className="cover" style={{ opacity: 0.7, mixBlendMode: 'multiply' }} alt="" />
        <Img
          id="d3a468_bb47f26db4524412b291aa148b93cbb9~mv2"
          eager
          className="d m fill"
          style={at([201, 185, 1079, 509], [15, 182, 359, 188])}
          sizes="(min-width: 1024px) 75vw, 92vw"
          alt="Protektahan natin ang ating mga karagatan sa plastik na di astig!"
        />
      </section>

      <section className="sec home-rows" style={{ '--sh': 1686, '--msh': 1173 } as CSSProperties}>
        {homeRows.map((row, i) => (
          <Marquee
            key={row.label}
            items={row.items}
            desktop={{ height: 285, gap: 24 }}
            mobile={{ height: 190, gap: 20 }}
            staticOffset={i === 0 ? -48 : undefined}
            className="d m"
            style={at([0, rowY.d[i], 1440, 285], [0, rowY.m[i], 396, 190])}
            sizes="(min-width: 1024px) 20vw, 40vw"
          />
        ))}
        {/* Dim layer above the rows; it also keeps them from being clicked, as on Wix. */}
        <div className="home-dim d m" style={at([0, 0, 1440, 1686], [0, 0, 390, 1118])} />
        {homeRows.map((row, i) => (
          <Link key={row.label} to={row.href} className="home-pill d m" style={at(pills[i].d, pills[i].m)}>
            {row.label}
          </Link>
        ))}
      </section>
      <Footer />
    </main>
  )
}
