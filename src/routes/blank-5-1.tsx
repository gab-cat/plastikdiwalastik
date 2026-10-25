import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { ProjectTitle } from '~/components/ProjectTitle'
import { Reel } from '~/components/Reel'
import { reels } from '~/data/projects'
import { at } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-5-1')({
  head: () => seo('REELS', '/blank-5-1'),
  component: Reels,
})

function Reels() {
  return (
    <main>
      <section className="sec" style={{ '--sh': 2266, '--msh': 4252 } as CSSProperties}>
        <Img id="d3a468_43e1f6ec543643c5916631d37301f966~mv2" eager className="cover" alt="" />
        <ProjectTitle label="REELS" image={[[509, 157, 421, 153], [80, 99, 230, 83]]} text={[[536, 210, 368], [126, 127, 139]]} />
        {reels.map((r, i) => (
          <Reel key={i} video={r.video} poster={r.poster} name={r.name} autoplayMobile={!r.interview} className="d m" style={at(r.d, r.m)} />
        ))}
      </section>
      <Footer />
    </main>
  )
}
