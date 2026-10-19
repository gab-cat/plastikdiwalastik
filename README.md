# Plastik 'di Walastik

Static rebuild of the original Wix site (`realubitbenedict.wixsite.com/plastik-di-walastik`) with
[TanStack Start](https://tanstack.com/start). Every page is prerendered to plain HTML at build time.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` | Production build; prerendered static site in `dist/client` |
| `npm run preview` | Serve the production build on http://localhost:4173 |
| `npm run media` | Regenerate the WebP renditions in `public/media` from `assets/originals` (local folder, not in git) |
| `npm run typecheck` | TypeScript check |

Deploy by uploading `dist/client` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3…).

## Pages

URLs keep the original Wix slugs so existing links still work.

| Route | Page |
| --- | --- |
| `/` | Home |
| `/blank` | About Us (anchors `#c4-studios`, `#earth-island`, `#pamalakaya`) |
| `/blank-2` | Documentation (photo and video gallery) |
| `/blank-3` | Contact Us |
| `/blank-4` | Short Comic |
| `/blank-5` | Carousel |
| `/blank-5-1` | Reels |
| `/blank-5-1-1` | Poster |
| `/blank-5-1-1-1` | Infographs |

## How the layout works

The Wix site is a fixed design that scales with the browser width, and this rebuild works the same way:

- **Desktop (1024px and up):** positions come from the original 1440px canvas. `at([x, y, w, h])`
  in `src/lib/layout.ts` places an element; `1px` in the design is `var(--u)` in CSS.
- **Mobile (below 1024px):** positions come from the original 390px mobile canvas, the second
  argument of `at()`. Widths scale with the screen; text stops growing at 700px, as on Wix.

## Project layout

```
src/
  routes/          one file per page (+ __root.tsx: html shell, head tags, header)
  components/      Header, Footer, Img, Slider, Lightbox, ParallaxBg, icons
  data/            galleries.ts (generated from the Wix gallery data), nav.ts, media manifest
  styles/          base.css (shared), pages.css (per-page layout)
public/
  media/           optimized WebP images (generated)
  video/           Documentation videos (MP4, as uploaded to Wix)
  fonts/           Block Berthold (uploaded to the Wix account)
assets/originals/  full-resolution originals downloaded from Wix (local only, not in git)
scripts/           optimize-media.mjs
```

## Differences from the Wix site

Intentional:

- The "Built on Wix Harmony" bar is gone.
- On phones the Wix header renders as an empty white bar with no navigation. This version shows
  the logos and a working hamburger menu, styled after the menu settings saved in the Wix editor.
- The favicon is made from the campaign logo (Wix only had its default icon).
- Images are served as resized WebP files instead of through Wix's image CDN.

Kept as-is from the original, so you may want to fix them:

- On Home, the **POSTER** card links to the Infographs page and the **INFOGRAPHS** card links to Poster.
- The Projects menu spells the last item **INFORGRAPHS**.
- The Contact Us submenu links to `#earth-island` and `#pamalakaya` on the Contact page, where those sections don't exist.
- The C4 Studios section on About Us is an empty teal block, and the Reels and Infographs pages contain only a background.
- On mobile, the Home card titles are white on white, as on Wix.

## Licensing to check before publishing

- **Wix stock photos.** These 8 files are Wix template placeholders, not your team's photos. Wix
  licenses them for use on Wix sites only, so replace them before publishing elsewhere. They
  appear on the Home cards (Reels, Poster, Infographs), the Poster grid, and Short Comic chapters 5–6:
  `11062b_096606ac…`, `11062b_1332f4b2…`, `11062b_2ea6d70d…`, `11062b_6ac63895…`,
  `11062b_7b66f880…`, `11062b_9b229c20…`, `11062b_9bab534d…`, `11062b_e365ab93…`
- **Block Berthold** (headings and nav) is a commercial font that was uploaded to the Wix account.
  Self-hosting it needs a web-font license that covers your new host.
- Inter, IBM Plex Sans and Syne load from Google Fonts (open licenses).
