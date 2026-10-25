import type { CSSProperties } from 'react'
import { Img } from './Img'
import { cx } from '~/lib/layout'
import { mediaInfo } from '~/lib/media'

export interface MarqueeMetrics {
  /** Row height in design px. */
  height: number
  /** Space between items in design px. */
  gap: number
}

interface Props {
  items: string[]
  /** Desktop and mobile row metrics; the loop runs at 60 design px per second, as on Wix. */
  desktop: MarqueeMetrics
  mobile: MarqueeMetrics
  /** Desktop only: hold the row still at this offset (design px) instead of scrolling. */
  staticOffset?: number
  sizes?: string
  className?: string
  style?: CSSProperties
}

const SPEED = 60

// Width of one pass through the items, gaps included, in design px.
const cycle = (items: string[], { height, gap }: MarqueeMetrics) =>
  items.reduce((sum, id) => {
    const { w, h } = mediaInfo(id)
    return sum + (height * w) / h + gap
  }, 0)

/**
 * Decorative auto-scrolling strip (Home project rows; Short Comics, Carousels and
 * Infographics on phones). The items are rendered twice so translating the rail by half
 * its width loops seamlessly.
 */
export function Marquee({ items, desktop, mobile, staticOffset, sizes = '20vw', className, style }: Props) {
  const vars = {
    ...style,
    '--mq-dur-d': `${(cycle(items, desktop) / SPEED).toFixed(2)}s`,
    '--mq-dur-m': `${(cycle(items, mobile) / SPEED).toFixed(2)}s`,
    '--mq-gap-d': desktop.gap,
    '--mq-gap-m': mobile.gap,
    '--mq-offset': staticOffset ?? 0,
  } as CSSProperties

  const copy = (key: string) =>
    items.map((id, i) => {
      const { w, h } = mediaInfo(id)
      return (
        <div key={`${key}${i}`} className="mq-item" style={{ aspectRatio: `${w} / ${h}` }}>
          <Img id={id} sizes={sizes} alt="" />
        </div>
      )
    })

  return (
    <div className={cx('mq', staticOffset !== undefined && 'is-static-d', className)} style={vars} aria-hidden="true">
      <div className="mq-rail">
        {copy('a')}
        {copy('b')}
      </div>
    </div>
  )
}
