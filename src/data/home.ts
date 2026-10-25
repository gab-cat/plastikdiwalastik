// Home page project rows, in the order and with the repeats of the Wix galleries.
export interface HomeRow {
  label: string
  /** Where the label button links. INFOGRAPHICS points at the Posters page on Wix too. */
  href: string
  items: string[]
}

const comic1 = 'd3a468_18647b3576c6434e8e2995c1de1a5cb1~mv2'
const comic2 = 'd3a468_bd7976acbabf48ce842d273dd872b938~mv2'
const info1 = 'd3a468_8831623fd5654ed4b5470f3f20797462~mv2'
const info3 = 'd3a468_5546bd7e558d4907a8f41692b290294b~mv2'
const info4 = 'd3a468_6f5714a1e6db4aad8f01bab732b431a0~mv2'

export const homeRows: HomeRow[] = [
  {
    label: 'SHORT COMICS',
    href: '/blank-4',
    items: [comic1, comic2, 'd3a468_f8c3c5a79c254f91a11f5be2b05c65b5~mv2', 'd3a468_b85a9695e977436b914ae90a6329fa49~mv2', comic1, comic2],
  },
  {
    label: 'CAROUSELS',
    href: '/blank-5',
    items: [
      'd3a468_a1b6e45240164f7688def5368e07174c~mv2',
      'd3a468_85bc7d16115a4f67a84598270ed8d7b2~mv2',
      'd3a468_31366eaf53bb414cb9f9f98837f69c20~mv2',
      'd3a468_c8722d9cf77b4247a3687ef3dbdf4fdd~mv2',
      'd3a468_db3b97915f71436aa5b09f08cebf7d99~mv2',
      'd3a468_f0c50976169e4e1ba86483319bccdba3~mv2',
    ],
  },
  {
    label: 'REELS',
    href: '/blank-5-1',
    items: [
      'd3a468_7ff697f6e9724817945b99dd100db79f~mv2',
      'd3a468_c94b0d35b8884b82860d1877c34ff47c~mv2',
      'd3a468_60dba8472dc041c7b31edeb1c6dd683d~mv2',
      'd3a468_84ea3c746ac7468f80d43efbb52a9bf1~mv2',
      'd3a468_cf4aade2827444219484732bea218699~mv2',
      'd3a468_ff610681a39540d19674fb8d7ce61aad~mv2',
      'd3a468_8a6407edcc8241469abfd0ca33203d6d~mv2',
      'd3a468_5733f22c07dd4ac09b01f46f50586d90~mv2',
      'd3a468_9e9bffc859fb4c559e69794a865aa7d8~mv2',
    ],
  },
  {
    label: 'POSTERS',
    href: '/blank-5-1-1',
    items: [
      'd3a468_9ab07afea8344c7a8b0b81fb3c145a20~mv2',
      'd3a468_52daf673706c488e8a5bd42573dbf489~mv2',
      'd3a468_c4f07d116ae74bfdb665939f64e04899~mv2',
      'd3a468_4dc61cbd0813456ca72cc97d1789d01e~mv2',
      'd3a468_4acbc5623a2647ad86398bba009f0fdc~mv2',
      'd3a468_37abc34aee8540fc8037cca649c6ae7e~mv2',
      'd3a468_f012b97ac87e4673ae4dd88918c016d9~mv2',
      'd3a468_e7fabaccecbb4539bc6eef6bf6872c24~mv2',
      'd3a468_fe92854389084c41a2d7fcb9233ac132~mv2',
    ],
  },
  {
    label: 'INFOGRAPHICS',
    href: '/blank-5-1-1',
    items: [info1, 'd3a468_b6053fd16fcc4c45a570d754153cfb1e~mv2', info3, info4, info1, info3, info4],
  },
]
