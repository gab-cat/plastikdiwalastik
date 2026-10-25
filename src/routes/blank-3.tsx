import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties, ComponentType, SVGProps } from 'react'
import { ContactForm } from '~/components/ContactForm'
import { Footer } from '~/components/Footer'
import { Img } from '~/components/Img'
import { Facebook, Instagram, TikTok, XLogo } from '~/components/icons'
import { at, type Rect } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-3')({
  head: () => seo('CONTACT US', '/blank-3'),
  component: Contact,
})

const sec = (sh: number, msh: number) => ({ '--sh': sh, '--msh': msh }) as CSSProperties

interface Social {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

function SocialBar({ items, d, m }: { items: Social[]; d: Rect; m: Rect }) {
  return (
    <ul className="contact-social d m" style={at(d, m)}>
      {items.map(({ label, href, Icon }) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noreferrer noopener" aria-label={label}>
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}

const ours: Social[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61588291911399', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/plastikdiwalastik/', Icon: Instagram },
  { label: 'Tiktok', href: 'https://www.tiktok.com/@plastikdiwalastik.c4', Icon: TikTok },
]
const earthIsland: Social[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/earthislandph', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/earthislandph/', Icon: Instagram },
]
const pamalakaya: Social[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/pamalakaya.navotas', Icon: Facebook },
  { label: 'Facebook', href: 'https://www.facebook.com/Pamalakaya', Icon: Facebook },
  { label: 'X', href: 'https://x.com/pama_pil', Icon: XLogo },
]

function Contact() {
  return (
    <main>
      <section className="sec" style={sec(1028, 1073)}>
        <h1 className="contact-h1 d m" style={at([160, 127, 1120], [24, 137, 342])}>
          PARA SA MADAMI PANG UPDATES!
        </h1>
        <p className="contact-lead d m" style={at([228, 187, 983], [24, 199, 342])}>
          Subaybayan ang aming mga posts sa aming mga social media accounts sa Facebook, Instagram, at Tiktok.
        </p>
        <SocialBar items={ours} d={[657, 288]} m={[138, 287]} />
        <ContactForm style={at([0, 360, 1440, 668], [0, 362, 391, 710])} />
      </section>

      <section className="sec" style={{ ...sec(375, 207), background: 'var(--color-footer-green)' }}>
        <Img id="d3a468_23a12e49f1944250bb301f77b8adb425~mv2" className="cover contact-bg" alt="" />
        <Img id="logo-plastik" className="d m fill" style={at([549, 73, 332, 230], [111, 48, 169, 110])} sizes="(min-width: 1024px) 24vw, 44vw" alt="Plastik 'di Walastik" />
      </section>

      <section id="earth-island" className="sec" style={sec(417, 415)}>
        <h2 className="contact-h1 d m" style={at([160, 65, 1120], [24, 83, 342])}>
          SUMAMA SA LABAN PARA SA KALIKASAN!
        </h2>
        <p className="contact-lead d m" style={at([160, 121, 1120], [24, 144, 342])}>
          Para sa mga kampanya, volunteer opportunities, at updates mula sa Earth Island Institute Asia-Pacific, i-follow ang
          kanilang mga social media accounts sa ibaba.
        </p>
        <SocialBar items={earthIsland} d={[680, 206]} m={[159, 227]} />
        <p className="contact-email d m" style={at([591, 259, 259], [100, 275, 190])}>
          <a href="mailto:savedolphinsph@gmail.com">savedolphinsph@gmail.com</a>
        </p>
        <a className="contact-more d m" style={at([633, 303, 173, 49], [116, 304, 158, 27])} href="https://www.earthisland-ap.org/" target="_blank" rel="noreferrer noopener">
          Learn More
        </a>
      </section>

      <section className="sec" style={{ ...sec(375, 207), background: '#000' }}>
        <Img id="d3a468_ad11fe679c0c4c24a2fba691b4a6cf21~mv2" className="cover contact-bg" alt="" />
        <Img
          id="d3a468_9bd1dc6e67534571a63bd64e35e118fe~mv2"
          className="d m fill"
          style={at([569, 37, 302, 302], [111, 18, 168, 172])}
          sizes="(min-width: 1024px) 21vw, 44vw"
          alt="Earth Island Institute Asia Pacific logo"
        />
      </section>

      <section id="pamalakaya" className="sec" style={sec(455, 414)}>
        <h2 className="contact-h1 d m" style={at([160, 82, 1120], [24, 76, 342])}>
          TINDIG PARA SA YAMANG-DAGAT AT MANGINGISDA!
        </h2>
        <p className="contact-lead d m" style={at([160, 138, 1120], [24, 138, 342])}>
          Alamin ang kalagayan at sumama sa panawagan ng PAMALAKAYA para sa proteksyon ng kabuhayan, karagatan, at karapatan ng
          mga maliliit na mangingisda. I-follow ang kanilang social media accounts sa ibaba.
        </p>
        <SocialBar items={pamalakaya} d={[657, 244]} m={[138, 234]} />
        <p className="contact-email d m" style={at([490, 292, 459], [100, 285, 190])}>
          <a href="mailto:pamalakaya.pil@gmail.com">pamalakaya.pil@gmail.com</a>
        </p>
        <a
          className="contact-more d m"
          style={at([633, 323, 173, 49], [116, 312, 158, 27])}
          href="https://pamalakayaweb.wordpress.com/about-us/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Learn More
        </a>
      </section>

      <section className="sec" style={{ ...sec(375, 207), background: 'rgb(75 70 152)' }}>
        <Img id="d3a468_c4d19580005040ee867f24ffb6a17853~mv2" className="cover contact-bg" style={{ opacity: 0.89, mixBlendMode: 'luminosity' }} alt="" />
        <Img
          id="d3a468_f020d1ca4d7249628a52619b12e25e87~mv2"
          className="d m fill"
          style={at([569, 38, 303, 300], [111, 20, 169, 167])}
          sizes="(min-width: 1024px) 21vw, 44vw"
          alt="PAMALAKAYA Navotas logo"
        />
      </section>
      <Footer />
    </main>
  )
}
