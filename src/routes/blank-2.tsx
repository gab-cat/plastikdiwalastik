import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { ParallaxBg } from '~/components/ParallaxBg'
import { PlayBadge } from '~/components/icons'
import { useLightbox, type LightboxItem } from '~/components/Lightbox'
import { documentationPhotos, documentationVideos } from '~/data/galleries'
import { at } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-2')({
  head: () => seo('DOCUMENTATION', '/blank-2'),
  component: Documentation,
})

const items: LightboxItem[] = [
  ...documentationPhotos.map((p) => ({ kind: 'image' as const, media: p.media, alt: p.alt })),
  ...documentationVideos.map((v) => ({ kind: 'video' as const, video: v.video, poster: v.poster, title: v.name })),
]

const itemStyle = (it: { x: number; y: number; boxW: number; boxH: number; mx: number; my: number; mw: number; mh: number }) =>
  at([it.x, it.y, it.boxW, it.boxH], [it.mx, it.my, it.mw, it.mh])

function Documentation() {
  const lightbox = useLightbox(items)
  const videoOffset = documentationPhotos.length

  return (
    <main>
      <section className="sec docs-sec" style={{ '--sh': 3336, '--msh': 7065 } as CSSProperties}>
        {/* Wix multiplies the photo into the green section colour. */}
        <ParallaxBg id="d3a468_c4854c55b90543bb8c7ffe9308661050~mv2" opacity={0.6} blend="multiply" />

        <div className="docs-gallery d m" style={at([160, 203, 1120, 2268], [21, 113, 349, 3406])}>
          {documentationPhotos.map((photo, i) => (
            <button key={photo.media} type="button" className="g-item docs-item d m" style={itemStyle(photo)} onClick={() => lightbox.open(i)} aria-label={photo.alt || `Photo ${i + 1}`}>
              <Img id={photo.media} sizes="(min-width: 1024px) 20vw, 42vw" alt="" />
              <span className="g-tint" />
            </button>
          ))}
        </div>

        <div className="docs-gallery d m" style={at([160, 2493, 1120, 690], [21, 3544, 349, 3383])}>
          {documentationVideos.map((video, i) => (
            <button
              key={video.video}
              type="button"
              className="g-item docs-item d m"
              style={itemStyle(video)}
              onClick={() => lightbox.open(videoOffset + i)}
              aria-label={`Play video ${video.name}`}
            >
              <Img id={video.poster} sizes="(min-width: 1024px) 20vw, 88vw" alt="" />
              <span className="g-tint" />
              <PlayBadge className="docs-play" />
            </button>
          ))}
        </div>
      </section>
      <Footer />
      {lightbox.view}
    </main>
  )
}
