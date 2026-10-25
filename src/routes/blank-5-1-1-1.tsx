import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { Marquee } from '~/components/Marquee'
import { ProjectTitle } from '~/components/ProjectTitle'
import { Slider } from '~/components/Slider'
import { infographics } from '~/data/projects'
import { at } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-5-1-1-1')({
  head: () => seo('INFOGRAPHICS', '/blank-5-1-1-1'),
  component: Infographics,
})

const TITLE = 'Plastic Project'
// One slider pass is four 300px tiles plus 7px gaps; it scrolls on its own at 60px/s.
// The tiles don't open anything when clicked, matching Wix.
const START = 4 * 307
const AUTOPLAY = { mode: 'continuous', pxPerSecond: 60 } as const

function Infographics() {
  return (
    <main>
      <section className="sec" style={{ '--sh': 1885, '--msh': 779 } as CSSProperties}>
        <Img id="d3a468_43e1f6ec543643c5916631d37301f966~mv2" eager className="cover" alt="" />
        <ProjectTitle label="INFOGRAPHICS" image={[[502, 159, 437, 158], [82, 93, 230, 83]]} text={[[530, 208, 380], [93, 120, 206]]} />
        <div className="d-only" style={{ '--row-y': 402, '--start-d': START } as CSSProperties}>
          <Slider className="car-row" loop autoplay={AUTOPLAY} label="Infographics">
            {infographics.map((media, i) => (
              <div key={media} className="car-item" style={{ width: 'calc(var(--u) * 300)' }}>
                <Img id={media} sizes="21vw" alt={`${TITLE} ${i + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
        <Marquee
          items={infographics}
          desktop={{ height: 187, gap: 20 }}
          mobile={{ height: 187, gap: 20 }}
          className="m m-only"
          style={at(undefined, [21, 204, 349, 187])}
          sizes="48vw"
        />
      </section>
      <Footer />
    </main>
  )
}
