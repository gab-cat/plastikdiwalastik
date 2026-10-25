// Gallery contents of the project pages (Carousels, Reels, Posters, Infographics), in Wix order.

export interface CarouselRow {
  /** Series name, shown on hover like the Wix item title. */
  title: string
  items: string[]
}

export const carouselRows: CarouselRow[] = [
  {
    title: 'Pamalakaya Navotas',
    items: [
      'd3a468_85bc7d16115a4f67a84598270ed8d7b2~mv2',
      'd3a468_67fa8d75feea47b7a7ebde42b1b02635~mv2',
      'd3a468_7703e84bcfaf4d8192f178fa5ef99123~mv2',
      'd3a468_8b5157ecba8b40e09d7bc61d624b5650~mv2',
      'd3a468_adfc487825434892a96e2e189f694903~mv2',
    ],
  },
  {
    title: 'Earth Island Institute',
    items: [
      'd3a468_a1b6e45240164f7688def5368e07174c~mv2',
      'd3a468_1361db214a7c48ad95bd4dac3635082f~mv2',
      'd3a468_f1335094851e4ecc813e78e249b31671~mv2',
      'd3a468_947cf72d6bbd4574b0a5c715a0da91f5~mv2',
      'd3a468_5f2637040560430d9d9f6f2b0f2bf4ca~mv2',
    ],
  },
  {
    title: 'Plastik sa Tubig ng Bayan',
    items: [
      'd3a468_31366eaf53bb414cb9f9f98837f69c20~mv2',
      'd3a468_de93867eb935468e812ec56ba7c463f9~mv2',
      'd3a468_893be8dd8523473988de77d5976d5769~mv2',
      'd3a468_52960de68cc64b38a71cd31626ce9890~mv2',
      'd3a468_0e61d376c502443e8ee52e53b1edbe04~mv2',
    ],
  },
  {
    title: 'Batas Pambasura at Pamplastik',
    items: [
      'd3a468_c8722d9cf77b4247a3687ef3dbdf4fdd~mv2',
      'd3a468_84346bde5b1b48588e9b3930bde19b69~mv2',
      'd3a468_6a110322f5234dbebb80e2ee70da88b9~mv2',
      'd3a468_25c3acefc63442ca917ddc89dea438d2~mv2',
      'd3a468_6c397c8cbbb34ddab2331f2dc021a9cb~mv2',
    ],
  },
  {
    title: 'Tahong ng Bayan',
    items: [
      'd3a468_db3b97915f71436aa5b09f08cebf7d99~mv2',
      'd3a468_418df4016ed4424687dae7e232e659fe~mv2',
      'd3a468_4a5274ca663244bbb8a18f246326c289~mv2',
      'd3a468_9c17ebd3d48245bfad17955bc77c3289~mv2',
      'd3a468_f0c50976169e4e1ba86483319bccdba3~mv2',
    ],
  },
  {
    title: 'Munting Plastik, Higanteng Panganib',
    items: [
      'd3a468_da68c12840664e7c9709e08429e25616~mv2',
      'd3a468_db6ff9528490472482307fed964b7cd7~mv2',
      'd3a468_c28fceb41af44a4f899a9d386d372d49~mv2',
      'd3a468_c8476c32a16d40b5881a43621ef50dfb~mv2',
      'd3a468_38c50c15e5e64f358e5a5e30ac329732~mv2',
    ],
  },
]

export interface ReelItem {
  name: string
  video: string
  poster: string
  /** Outer frame (white border included) on the 1440 (d) and 390 (m) canvases. */
  d: [number, number, number, number]
  m: [number, number, number, number]
  interview?: boolean
}

const reel = (id: string, frame = 'f000') => ({ video: `d3a468_${id}`, poster: `d3a468_${id}${frame}` })

// In the Wix page order. Phones use a two-column order of their own.
export const reels: ReelItem[] = [
  { name: 'Fun Fact 1', ...reel('a31a4d2e210640a09af7088d5844e5ac'), d: [728, 375, 255, 455], m: [21, 228, 168, 298] },
  { name: 'Coastal Cleanup', ...reel('35b4c71225314a7b9bacd6d3859cdcba'), d: [183, 377, 255, 455], m: [201, 538, 168, 300] },
  { name: 'Reduce Plastic 1', ...reel('682a644b65f04102a3704f84ab92e9fd'), d: [455, 376, 255, 455], m: [21, 851, 168, 302] },
  { name: 'Pamalakaya Interview', ...reel('565db903d14a4c46bb58bdd7c06049b9'), d: [253, 1323, 455, 256], m: [21, 1690, 349, 198], interview: true },
  { name: 'Short Reel 3', ...reel('5a96fbef324441059e105c5421002c1f'), d: [728, 848, 255, 455], m: [201, 1163, 168, 301] },
  { name: 'Fun Fact 2', ...reel('00b2e2fbb57b41b486c84a748d0389be'), d: [1002, 377, 255, 455], m: [201, 228, 168, 297] },
  { name: 'Short Reel 2', ...reel('bc57109e6add442e90e916784458c3d9'), d: [455, 848, 255, 455], m: [21, 1163, 168, 301] },
  { name: 'Short Reel 1', ...reel('7a3ccce90a6e4c8db6028e8e9e86a2fc'), d: [183, 848, 255, 455], m: [201, 851, 168, 302] },
  { name: 'Common Types of Fish', ...reel('b7a5174d398e4b5ea8c836437dc559f5'), d: [1002, 848, 255, 455], m: [21, 537, 168, 302] },
  { name: 'Pamalakaya Interview', ...reel('565db903d14a4c46bb58bdd7c06049b9', 'f001'), d: [728, 1323, 455, 256], m: [21, 1477, 349, 198], interview: true },
]

type Frame = [number, number, number, number]

// Posters grid: 3 columns on desktop, 2 on phones (every tile cropped to 3:4 there).
const posterCol = { d: [167, 540, 914], m: [33, 202] }
const posterRow = { d: [350, 813, 1277], m: [204, 437, 670, 902, 1135] }

export const posters: { media: string; d: Frame; m: Frame }[] = [
  'd3a468_f012b97ac87e4673ae4dd88918c016d9~mv2',
  'd3a468_e7fabaccecbb4539bc6eef6bf6872c24~mv2',
  'd3a468_fe92854389084c41a2d7fcb9233ac132~mv2',
  'd3a468_9ab07afea8344c7a8b0b81fb3c145a20~mv2',
  'd3a468_52daf673706c488e8a5bd42573dbf489~mv2',
  'd3a468_c4f07d116ae74bfdb665939f64e04899~mv2',
  'd3a468_4acbc5623a2647ad86398bba009f0fdc~mv2',
  'd3a468_4dc61cbd0813456ca72cc97d1789d01e~mv2',
  'd3a468_37abc34aee8540fc8037cca649c6ae7e~mv2',
].map((media, i) => ({
  media,
  // The last two are 3:4 artworks, so they come out taller in the desktop grid.
  d: [posterCol.d[i % 3], posterRow.d[Math.floor(i / 3)], 360, i >= 7 ? 480 : 450],
  m: [posterCol.m[i % 2], posterRow.m[Math.floor(i / 2)], 161, 215],
}))

export const infographics = [
  'd3a468_8831623fd5654ed4b5470f3f20797462~mv2',
  'd3a468_b6053fd16fcc4c45a570d754153cfb1e~mv2',
  'd3a468_5546bd7e558d4907a8f41692b290294b~mv2',
  'd3a468_6f5714a1e6db4aad8f01bab732b431a0~mv2',
]
