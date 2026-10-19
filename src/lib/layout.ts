import type { CSSProperties } from 'react'

/** [x, y, width?, height?] in design pixels. */
export type Rect = [number, number, number?, number?]

/**
 * Absolute placement on the original Wix canvases: `d` is the 1440px desktop design,
 * `m` the 390px mobile design. Pair with the `d` / `m` classes from app.css.
 */
export function at(d?: Rect, m?: Rect, extra?: CSSProperties): CSSProperties {
  const style: Record<string, unknown> = { ...extra }
  if (d) {
    style['--x'] = d[0]
    style['--y'] = d[1]
    if (d[2] !== undefined) style['--w'] = d[2]
    if (d[3] !== undefined) style['--h'] = d[3]
  }
  if (m) {
    style['--mx'] = m[0]
    style['--my'] = m[1]
    if (m[2] !== undefined) style['--mwd'] = m[2]
    if (m[3] !== undefined) style['--mht'] = m[3]
  }
  return style as CSSProperties
}

export const cx = (...names: Array<string | false | null | undefined>) => names.filter(Boolean).join(' ')
