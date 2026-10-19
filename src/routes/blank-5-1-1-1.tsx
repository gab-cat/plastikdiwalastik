import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-5-1-1-1')({
  head: () => seo('INFORGRAPHS', '/blank-5-1-1-1'),
  component: Infographs,
})

// The original page holds only its background section and the footer.
function Infographs() {
  return (
    <main>
      <section className="sec" style={{ '--sh': 1826, '--msh': 200 } as CSSProperties}>
        <Img id="d3a468_43e1f6ec543643c5916631d37301f966~mv2" eager className="cover" alt="" />
      </section>
      <Footer />
    </main>
  )
}
