import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Img } from '~/components/Img'
import { at } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank')({
  head: () => seo('ABOUT US', '/blank'),
  component: About,
})

const sec = (sh: number, msh: number) => ({ '--sh': sh, '--msh': msh }) as CSSProperties

function About() {
  return (
    <main>
      <section className="sec" style={sec(990, 1907)}>
        <Img
          id="d3a468_e55c57a084cc46eb9b7d662e0941a11c~mv2"
          eager
          className="d m fill"
          style={at([80, 135, 1280, 867], [24, 119, 342, 232], { opacity: 0.65 })}
          sizes="(min-width: 1024px) 89vw, 88vw"
          alt=""
        />
        <h1 className="about-h1 d m" style={at([96, 269, 1248], [24, 390, 342])}>
          TUNGKOL SA PLASTIK ‘DI WALASTIK!
        </h1>
        <p className="about-lead d m" style={at([183, 358, 1074], [24, 462, 342])}>
          Ang “Plastik 'di Walastik!” ay isang mixed-media digital campaign na nagpapahayag ng environmental consequences ng
          polusyon sa plastik sa Navotas City at naglalayong alamin ang mga sumusunod:
        </p>

        <Img id="about-paint" className="d m fill" style={at([278, 606, 361, 233], [24, 702, 342, 221])} sizes="(min-width: 1024px) 25vw, 88vw" alt="" />
        <Img
          id="d3a468_335d8bc979604ac195c58dc2d261df9b~mv2"
          className="d m fill"
          style={at([245, 610, 427, 224], [24, 963, 342, 166])}
          sizes="(min-width: 1024px) 30vw, 88vw"
          alt=""
        />
        <p className="about-goal d m" style={at([269, 640, 380, 166], [24, 1154, 342, 86])}>
          Ipakita ang epekto ng plastic pollution sa mga buhay ng mga nasa coastal area ng Navotas City
        </p>

        <Img id="about-paint" className="d m fill" style={at([797, 608, 353, 229], [24, 1280, 342, 221])} sizes="(min-width: 1024px) 25vw, 88vw" alt="" />
        <Img
          id="d3a468_335d8bc979604ac195c58dc2d261df9b~mv2"
          className="d m fill"
          style={at([761, 610, 427, 224], [24, 1541, 342, 166])}
          sizes="(min-width: 1024px) 30vw, 88vw"
          alt=""
        />
        <p className="about-goal d m" style={at([784, 661, 380, 124], [24, 1731, 342, 57])}>
          Magkaroon ng progresibong environmental messaging campaign
        </p>
      </section>

      <section id="c4-studios" className="sec about-teal" style={sec(911, 200)} />

      <section id="earth-island" className="sec" style={sec(909, 1045)}>
        <Img id="d3a468_ad11fe679c0c4c24a2fba691b4a6cf21~mv2" className="cover" alt="" />
        <div className="band d m" style={at([0, 187, 1440, 534], [0, 164, 390, 716])} />
        <div className="about-logo d m" style={at([160, 275, 343, 359], [24, 706, 342, 150])}>
          <Img id="d3a468_6b96c80131884a188840515d129688df~mv2" sizes="(min-width: 1024px) 24vw, 88vw" alt="Earth Island Institute Asia Pacific logo" />
        </div>
        <p className="about-org-text d m" style={at([526, 241, 754], [24, 188, 342])}>
          Ang Earth Island Institute (EII) ay isang international environmental non-profit organization na itinatag noong 1982
          para sumuporta sa mga grassroots eco-campaigns at wildlife conservation. Dito sa bansa, aktibo ang Earth Island
          Institute Philippines sa pagprotekta ng marine wildlife tulad ng mga dolphin at pawikan, habang nakikipaglaban laban
          sa single-use plastics at corporate waste. Katuwang din nila ang mga lokal na mangingisda at komunidad sa mga coastal
          areas upang ipagtanggol ang kalikasan at ang kanilang kabuhayan. Ang kanilang layunin ay gawing mas mulat at may
          pananagutan ang bawat isa tungo sa isang malinis at maaliwalas na karagatan.
        </p>
      </section>

      <section id="pamalakaya" className="sec" style={sec(910, 1091)}>
        <Img id="d3a468_da050850bf17407aa1ca264925fb7c7a~mv2" className="cover" alt="" />
        <div className="band d m" style={at([0, 213, 1440, 535], [0, 188, 390, 716])} />
        <p className="about-org-text is-justified d m" style={at([160, 268, 754], [24, 212, 342])}>
          Ang PAMALAKAYA-Navotas ay ang lokal na chapter sa Navotas City ng Pambansang Lakas ng Kilusang Mamamalakaya ng
          Pilipinas, isang pederasyon ng maliliit na mangingisda. Binubuo ito ng mga residenteng mangingisda at kanilang
          pamilya mula sa mga coastal community ng Navotas na pangunahing umaasa sa dagat para sa kanilang kabuhayan. Aktibo
          nilang ipinaglalaban ang tradisyunal na pangisdaan laban sa mapaminsalang reklamasyon, demolisyon, at polusyon sa
          Manila Bay. Nagsisilbi silang boses ng komunidad upang ipagtanggol ang kalikasan at matiyak ang sapat na pagkain at
          makatarungang kita para sa mga taga-baybayin.
        </p>
        <div className="about-logo d m" style={at([937, 302, 343, 359], [24, 730, 342, 150])}>
          <Img id="d3a468_dcac236da0e44f10a4c910466f33e25a~mv2" sizes="(min-width: 1024px) 24vw, 88vw" alt="PAMALAKAYA Navotas logo" />
        </div>
      </section>
    </main>
  )
}
