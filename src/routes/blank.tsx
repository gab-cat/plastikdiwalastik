import { createFileRoute } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { Img } from '~/components/Img'
import { at, type Rect } from '~/lib/layout'
import { seo } from '~/lib/seo'

export const Route = createFileRoute('/blank')({
  head: () => seo('ABOUT US', '/blank'),
  component: About,
})

const sec = (sh: number, msh: number) => ({ '--sh': sh, '--msh': msh }) as CSSProperties

// C4 Studios members, with photo and name frames on the 1440 (d) and 390 (m) canvases.
const team: { name: string; photo: string; d: Rect; dn: Rect; m: Rect; mn: Rect }[] = [
  { name: 'Manuel Jerome M. Abad', photo: 'd3a468_354df797a7bf4678bf013f00c7171985~mv2', d: [108, 271, 211, 278], dn: [108, 572, 211], m: [41, 300, 148, 195], mn: [41, 500, 148] },
  { name: 'John Benedict P. Realubit', photo: 'd3a468_50160090bb094310a369c6bc770c8518~mv2', d: [362, 271, 211, 278], dn: [362, 572, 211], m: [201, 300, 148, 195], mn: [201, 500, 148] },
  { name: 'Lei Daniel Madrid', photo: 'd3a468_71d87aa0eb6a493d8c7493e4f9e01b3c~mv2', d: [616, 271, 211, 278], dn: [616, 571, 211], m: [41, 564, 148, 195], mn: [41, 768, 148] },
  // The Wix page shows John Benedict's photo for Beatrice as well.
  { name: 'Beatrice P. Silva', photo: 'd3a468_50160090bb094310a369c6bc770c8518~mv2', d: [870, 271, 211, 278], dn: [870, 572, 211], m: [201, 563, 148, 195], mn: [201, 768, 148] },
  { name: 'Raphael Sigmund L. Serafin', photo: 'd3a468_9c17d35aa895473f944b3f5fcfddb2c8~mv2', d: [1124, 271, 211, 278], dn: [1124, 571, 211], m: [121, 814, 148, 195], mn: [121, 1019, 148] },
]

function About() {
  return (
    <main>
      <section className="sec" style={sec(1059, 505)}>
        <Img
          id="d3a468_e55c57a084cc46eb9b7d662e0941a11c~mv2"
          eager
          className="d m fill"
          style={at([80, 134, 1280, 867], [5, 84, 380, 267])}
          sizes="(min-width: 1024px) 89vw, 97vw"
          alt=""
        />
        <h1 className="about-h1 d m" style={at([96, 291, 1248], [21, 139, 358])}>
          TUNGKOL SA PLASTIK ‘DI WALASTIK!
        </h1>
        <Img id="about-band" className="d m fill" style={at([254, 373, 931, 188], [32, 197, 325, 96])} sizes="(min-width: 1024px) 65vw, 83vw" alt="" />
        <p className="about-lead d m" style={at([271, 392, 898], [33, 201, 324])}>
          Ang “Plastik 'di Walastik!” ay isang mixed-media digital campaign na nagpapahayag ng environmental consequences ng
          polusyon sa plastik sa Navotas City at naglalayong alamin ang mga sumusunod:
        </p>

        <Img id="about-paint" className="d m fill" style={at([278, 611, 361, 233], [20, 360, 169, 109])} sizes="(min-width: 1024px) 25vw, 44vw" alt="" />
        <Img
          id="d3a468_335d8bc979604ac195c58dc2d261df9b~mv2"
          className="d m fill"
          style={at([245, 615, 427, 224], [17, 371, 175, 85])}
          sizes="(min-width: 1024px) 30vw, 45vw"
          alt=""
        />
        <p className="about-goal d m" style={at([268, 675, 380, 106], [17, 382, 172, 65])}>
          Ipakita ang epekto ng plastic pollution sa mga buhay ng mga nasa coastal area ng Navotas City
        </p>

        <Img id="about-paint" className="d m fill" style={at([796, 614, 353, 229], [201, 360, 168, 109])} sizes="(min-width: 1024px) 25vw, 44vw" alt="" />
        <Img
          id="d3a468_335d8bc979604ac195c58dc2d261df9b~mv2"
          className="d m fill"
          style={at([760, 615, 427, 224], [200, 371, 170, 83])}
          sizes="(min-width: 1024px) 30vw, 45vw"
          alt=""
        />
        <p className="about-goal d m" style={at([772, 675, 402, 106], [201, 388, 168, 49])}>
          Magkaroon ng progresibong environmental messaging campaign
        </p>
      </section>

      <section id="c4-studios" className="sec" style={sec(966, 1499)}>
        <Img id="d3a468_1e431a34fb0b46a28ac3fca2b35f5ead~mv2" className="cover about-team-bg" alt="" />
        <h2 className="about-team-h2 d m" style={at([143, 99, 1154], [21, 117, 349])}>
          MEET THE TEAM
        </h2>
        <p className="about-team-sub d m" style={at([183, 175, 1074], [24, 172, 342])}>
          Ang C4 Studios ay ang grupong nasa likod ng multimedia thesis capstone project na "Plastik 'di Walastik!" mula sa
          Bachelor of Multimedia Arts program ng FEU Institute of Technology.
        </p>
        {team.map((member) => (
          <div key={member.name} style={{ display: 'contents' }}>
            <Img id={member.photo} className="d m fill" style={at(member.d, member.m)} sizes="(min-width: 1024px) 15vw, 38vw" alt={member.name} />
            <p className="about-name d m" style={at(member.dn, member.mn)}>
              {member.name}
            </p>
          </div>
        ))}
        <p className="about-team-body d m" style={at([108, 646, 1226], [21, 1086, 349])}>
          Bilang isang creative production team, pinagsasama ng C4 Studios ang digital art, visual storytelling, at mixed-media
          production, kabilang ang mga short comics, infographics, video reels, static posters, static carousels, interviews, at
          project gallery website, upang magsilbing tulay sa mga isyung panlipunan at pangkapaligiran. Sa pamamagitan ng
          pakikipagtulungan sa mga partner organizations tulad ng Earth Island Institute Philippines at PAMALAKAYA-Navotas,
          layunin ng grupo na gamitin ang multimedia arts upang imulat ang publiko sa epekto ng plastic pollution sa mga baybayin
          at kabuhayan ng mga lokal na komunidad.
        </p>
      </section>

      <section id="earth-island" className="sec" style={sec(894, 731)}>
        <Img id="d3a468_ad11fe679c0c4c24a2fba691b4a6cf21~mv2" className="cover" alt="" />
        <h2 className="about-org-h2 d m" style={at([96, 57, 1248], [24, 79, 342])}>
          PARTNERED ORGANIZATIONS
        </h2>
        <div className="band d m" style={at([1, 174, 1438, 532], [1, 128, 388, 522])} />
        <div className="about-logo d m" style={at([96, 262, 405, 407], [92, 427, 205, 206])}>
          <Img id="d3a468_6b96c80131884a188840515d129688df~mv2" sizes="(min-width: 1024px) 28vw, 53vw" alt="Earth Island Institute Asia Pacific logo" />
        </div>
        <p className="about-org-text d m" style={at([526, 253, 754], [24, 151, 342])}>
          Ang Earth Island Institute (EII) ay isang international environmental non-profit organization na itinatag noong 1982
          para sumuporta sa mga grassroots eco-campaigns at wildlife conservation. Dito sa bansa, aktibo ang Earth Island
          Institute Philippines sa pagprotekta sa marine wildlife tulad ng mga dolphin at pawikan, habang nakikipaglaban sa
          single-use plastics at corporate waste. Katuwang din nila ang mga lokal na mangingisda at komunidad sa mga coastal
          areas upang ipagtanggol ang kalikasan at ang kanilang kabuhayan. Ang kanilang layunin ay gawing mas mulat at may
          pananagutan ang bawat isa tungo sa isang malinis at maaliwalas na karagatan.
        </p>
      </section>

      <section id="pamalakaya" className="sec" style={sec(910, 683)}>
        <Img id="d3a468_da050850bf17407aa1ca264925fb7c7a~mv2" className="cover" alt="" />
        <h2 className="about-org-h2 is-large d m" style={at([96, 85, 1248], [24, 57, 342])}>
          PARTNERED ORGANIZATIONS
        </h2>
        <div className="band d m" style={at([1, 214, 1438, 533], [1, 107, 388, 519])} />
        <p className="about-org-text d m" style={at([160, 294, 754], [24, 129, 342])}>
          Ang PAMALAKAYA-Navotas ay ang lokal na chapter sa Navotas City ng Pambansang Lakas ng Kilusang Mamamalakaya ng
          Pilipinas, isang pederasyon ng maliliit na mangingisda. Binubuo ito ng mga residenteng mangingisda at kanilang
          pamilya mula sa mga coastal community ng Navotas na pangunahing umaasa sa dagat para sa kanilang kabuhayan. Aktibo
          nilang ipinaglalaban ang tradisyunal na pangisdaan laban sa mapaminsalang reklamasyon, demolisyon, at polusyon sa
          Manila Bay. Nagsisilbi silang boses ng komunidad upang ipagtanggol ang kalikasan at matiyak ang sapat na pagkain at
          makatarungang kita para sa mga taga-baybayin.
        </p>
        <div className="about-logo d m" style={at([938, 295, 424, 424], [92, 401, 205, 206])}>
          <Img id="d3a468_dcac236da0e44f10a4c910466f33e25a~mv2" sizes="(min-width: 1024px) 30vw, 53vw" alt="PAMALAKAYA Navotas logo" />
        </div>
      </section>
    </main>
  )
}
