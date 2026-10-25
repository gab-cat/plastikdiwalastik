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
  /** Makes the items buttons (e.g. to open a lightbox); otherwise the strip is decorative. */
  onItemClick?: (index: number) => void
  itemLabel?: (index: number) => string
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
 * Auto-scrolling strip (Home project rows, Short Comics and Infographics on phones). The
 * items are rendered twice so translating the rail by half its width loops seamlessly.
 */
export function Marquee({ items, desktop, mobile, staticOffset, sizes = '20vw', onItemClick, itemLabel, className, style }: Props) {
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
      const style = { aspectRatio: `${w} / ${h}` }
      if (!onItemClick) {
        return (
          <div key={`${key}${i}`} className="mq-item" style={style}>
            <Img id={id} sizes={sizes} alt="" />
          </div>
        )
      }
      // The duplicate copy is visual only; keyboard and screen readers get one set.
      const dup = key === 'b'
      return (
        <button
          key={`${key}${i}`}
          type="button"
          className="mq-item g-item"
          style={style}
          onClick={() => onItemClick(i)}
          aria-label={itemLabel?.(i)}
          aria-hidden={dup || undefined}
          tabIndex={dup ? -1 : undefined}
        >
          <Img id={id} sizes={sizes} alt="" />
        </button>
      )
    })

  return (
    <div className={cx('mq', staticOffset !== undefined && 'is-static-d', className)} style={vars} aria-hidden={onItemClick ? undefined : true}>
      <div className="mq-rail">
        {copy('a')}
        {copy('b')}
      </div>
    </div>
  )
}
