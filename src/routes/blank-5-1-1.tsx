import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { useLightbox } from '~/components/Lightbox'
import { ParallaxBg } from '~/components/ParallaxBg'
import { ProjectTitle } from '~/components/ProjectTitle'
import { posters } from '~/data/projects'
import { at } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-5-1-1')({
  head: () => seo('POSTERS', '/blank-5-1-1'),
  component: Posters,
})

function Posters() {
  const lightbox = useLightbox(posters.map((p) => ({ kind: 'image', media: p.media })), 'dark-compact')

  return (
    <main>
      <section className="sec poster-sec" style={{ '--sh': 2882, '--msh': 2677 } as CSSProperties}>
        <ParallaxBg id="d3a468_43e1f6ec543643c5916631d37301f966~mv2" />
        <ProjectTitle label="POSTERS" image={[[507, 137, 421, 153], [80, 96, 230, 83]]} text={[[534, 191, 368], [126, 123, 139]]} />
        {posters.map((p, i) => (
          <button key={p.media} type="button" className="g-item poster-item zoom-media d m" style={at(p.d, p.m)} onClick={() => lightbox.open(i)} aria-label={`Poster ${i + 1}`}>
            <Img id={p.media} sizes="(min-width: 1024px) 25vw, 42vw" alt="" />
            <span className="g-tint" />
          </button>
        ))}
      </section>
      <Footer />
      {lightbox.view}
    </main>
  )
}
