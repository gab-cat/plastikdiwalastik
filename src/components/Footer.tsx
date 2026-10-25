import { Img } from './Img'
import { at } from '~/lib/layout'

// Site footer: both logos, the campaign line and the credits, on every page.
export function Footer() {
  return (
    <footer className="ftr">
      <Img id="logo-plastik" className="d m fill" style={at([183, 29, 121, 79], [54, 46, 106, 69])} sizes="(min-width: 1024px) 9vw, 28vw" alt="Plastik 'di Walastik" />
      <p className="ftr-text d m" style={at([483, 23, 471], [24, 133, 342])}>
        Protektahan natin ang ating mga karagatan sa plastik na ’di astig!
      </p>
      <p className="ftr-text d m" style={at([353, 50, 732], [24, 184, 342])}>
        © 2026 PLASTIK ‘DI WALASTIK! &amp; C4 Studios.
        <br />
        In collaboration with Earth Island Institute Asia-Pacific and PAMALAKAYA-Navotas.
        <br />
        All rights reserved.
      </p>
      <Img id="c4-footer" className="d m fill" style={at([1161, 23, 96, 81], [244, 46, 84, 71])} sizes="96px" alt="C4 Studios" />
    </footer>
  )
}
