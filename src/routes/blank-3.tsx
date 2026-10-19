import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Img } from '~/components/Img'
import { Facebook, Instagram, TikTok } from '~/components/icons'
import { at } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank-3')({
  head: () => seo('CONTACT US', '/blank-3'),
  component: Contact,
})

const sec = (sh: number, msh: number) => ({ '--sh': sh, '--msh': msh }) as CSSProperties

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61588291911399', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/plastikdiwalastik/', Icon: Instagram },
  { label: 'Tiktok', href: 'https://www.tiktok.com/@plastikdiwalastik.c4', Icon: TikTok },
]

function Contact() {
  return (
    <main>
      <section className="sec" style={sec(383, 338)}>
        <h1 className="contact-h1 d m" style={at([171, 136, 1098], [24, 45, 342])}>
          PARA SA MADAMI PANG UPDATES!
        </h1>
        <p className="contact-lead d m" style={at([214, 220, 1012], [36, 116, 319])}>
          Subaybayan ang aming mga posts sa aming mga social media accounts sa Facebook, Instagram, at Tiktok.
        </p>
        <ul className="contact-social d m" style={at([657, 314], [138, 263])}>
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer noopener" aria-label={label}>
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec" style={{ ...sec(375, 351), background: 'var(--color-footer-green)' }}>
        <Img id="d3a468_23a12e49f1944250bb301f77b8adb425~mv2" className="cover" alt="" />
        <Img id="logo-plastik" className="d m fill" style={at([544, 73, 352, 230], [24, 64, 342, 223])} sizes="(min-width: 1024px) 25vw, 88vw" alt="Plastik 'di Walastik" />
      </section>

      <section className="sec contact-black" style={sec(450, 200)} />
      <section className="sec contact-black" style={sec(450, 200)} />
    </main>
  )
}
