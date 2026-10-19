// Menu structure from the original site, including its labels and anchor targets.
export interface NavItem {
  label: string
  href?: string
  children?: { label: string; href: string }[]
}

export const nav: NavItem[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'ABOUT US',
    href: '/blank',
    children: [
      { label: 'C4 STUDIOS', href: '/blank#c4-studios' },
      { label: 'EARTH ISLAND', href: '/blank#earth-island' },
      { label: 'PAMALAKAYA', href: '/blank#pamalakaya' },
    ],
  },
  {
    label: 'PROJECTS',
    children: [
      { label: 'SHORT COMIC', href: '/blank-4' },
      { label: 'CAROUSEL', href: '/blank-5' },
      { label: 'REELS', href: '/blank-5-1' },
      { label: 'POSTER', href: '/blank-5-1-1' },
      { label: 'INFORGRAPHS', href: '/blank-5-1-1-1' },
    ],
  },
  { label: 'DOCUMENTATION', href: '/blank-2' },
  {
    label: 'CONTACT US',
    href: '/blank-3',
    children: [
      { label: 'EARTH ISLAND', href: '/blank-3#earth-island' },
      { label: 'PAMALAKAYA', href: '/blank-3#pamalakaya' },
    ],
  },
]
