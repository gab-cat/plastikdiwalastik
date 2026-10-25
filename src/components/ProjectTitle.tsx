import { Img } from './Img'
import { at, type Rect } from '~/lib/layout'

const PAPER = 'd3a468_31d585b35e4c4530ae795f5141946828~mv2'

/** Page title on a torn-paper strip, as on the Wix project pages. Frames are [desktop, mobile]. */
export function ProjectTitle({ label, image, text }: { label: string; image: [Rect, Rect]; text: [Rect, Rect] }) {
  return (
    <>
      <Img id={PAPER} eager className="d m fill" style={at(image[0], image[1])} sizes="(min-width: 1024px) 30vw, 59vw" alt="" />
      <h1 className="project-title d m" style={at(text[0], text[1])}>
        {label}
      </h1>
    </>
  )
}
