// Generates web-optimized WebP renditions of the archived originals.
// Originals live in assets/originals/media (not deployed); output goes to public/media.
// Run with `npm run media` after adding or replacing anything in assets/originals/media.
import sharp from 'sharp'
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import { join, parse } from 'node:path'

const SRC = 'assets/originals/media'
const OUT = 'public/media'
const WIDTHS = [640, 1280, 2560]

// Images the original site displays as a crop of a larger upload.
const CROPS = [
  {
    name: 'logo-plastik',
    from: 'd3a468_dd6a792b349a452da94d4b6ee9b00dce~mv2.png',
    region: { left: 350, top: 575, width: 1363, height: 890 },
  },
  {
    name: 'about-paint',
    from: 'd3a468_bf2bfc6c5f844a62bc3c8c38acf8c6f9~mv2.png',
    region: { left: 78, top: 0, width: 442, height: 286 },
  },
]

const exists = (path) => stat(path).then(() => true, () => false)

function widthsFor(width) {
  const widths = WIDTHS.filter((w) => w < width)
  widths.push(Math.min(width, WIDTHS.at(-1)))
  return [...new Set(widths)].sort((a, b) => a - b)
}

async function render(input, name, width) {
  const widths = widthsFor(width)
  for (const w of widths) {
    const out = join(OUT, `${name}-${w}.webp`)
    if (await exists(out)) continue
    await input().resize({ width: w, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(out)
  }
  return widths
}

await mkdir(OUT, { recursive: true })
const manifest = {}

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
for (const file of files) {
  const { name } = parse(file)
  const meta = await sharp(join(SRC, file)).metadata()
  const widths = await render(() => sharp(join(SRC, file)).rotate(), name, meta.width)
  manifest[name] = { w: meta.width, h: meta.height, widths }
}

for (const crop of CROPS) {
  const { width, height } = crop.region
  const widths = await render(() => sharp(join(SRC, crop.from)).extract(crop.region), crop.name, width)
  manifest[crop.name] = { w: width, h: height, widths }
}

// Favicon from the campaign logo (the Wix site only had the default Wix icon).
const logo = () => sharp(join(SRC, CROPS[0].from)).extract(CROPS[0].region)
for (const [file, size] of [['favicon.png', 64], ['apple-touch-icon.png', 180]]) {
  const inner = Math.round(size * 0.92)
  const buf = await logo().resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: buf, gravity: 'center' }])
    .png()
    .toFile(join('public', file))
}

await writeFile('src/data/media-manifest.json', JSON.stringify(manifest, null, 1) + '\n')
console.log(`optimized ${files.length} images and ${CROPS.length} crops`)
