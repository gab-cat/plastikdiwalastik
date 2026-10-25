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
Vercel builds it automatically on every push to `main` (see `vercel.json`).

## Contact form

The Wix form saved messages in the Wix dashboard, which a static site can't do. Set one of these
environment variables (in Vercel: Project → Settings → Environment Variables) and redeploy:

| Variable | Effect |
| --- | --- |
| `VITE_CONTACT_FORM_ENDPOINT` | Messages are POSTed to this form-service URL (Formspree, Getform, …) and the visitor sees "Thanks for submitting!" |
| `VITE_CONTACT_EMAIL` | Without an endpoint, Submit opens the visitor's email app with the message addressed to this address |

With neither set, Submit opens an email draft with no recipient.

## Pages

URLs keep the original Wix slugs so existing links still work.

| Route | Page |
| --- | --- |
| `/` | Home |
| `/blank` | About Us (anchors `#c4-studios`, `#earth-island`, `#pamalakaya`) |
| `/blank-2` | Documentation (photo and video gallery) |
| `/blank-3` | Contact Us |
| `/blank-4` | Short Comics |
| `/blank-5` | Carousels |
| `/blank-5-1` | Reels (video grid) |
| `/blank-5-1-1` | Posters |
| `/blank-5-1-1-1` | Infographics |

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
  components/      Header, Footer, Img, Slider, Marquee, Lightbox, Reel, ContactForm, ProjectTitle, ParallaxBg, icons
  data/            home.ts, projects.ts, galleries.ts (Documentation + comics), nav.ts, media manifest
  styles/          base.css (shared), pages.css (per-page layout)
public/
  media/           optimized WebP images (generated)
  video/           Documentation and Reels videos (MP4 from Wix; the Pamalakaya interview re-encoded to 33 MB)
  fonts/           Block Berthold and Vividly (uploaded to the Wix account)
assets/originals/  full-resolution originals downloaded from Wix (local only, not in git)
scripts/           optimize-media.mjs
```

## Differences from the Wix site

Intentional:

- The "Built on Wix Harmony" bar is gone.
- The favicon is made from the campaign logo (Wix only had its default icon).
- Images are served as resized WebP files instead of through Wix's image CDN.
- The contact form needs a form service or email address to deliver messages (see above).
- Reels use the browser's video controls instead of the Wix player bar, and only play while on screen.
- In the phone menu, the submenu arrows are visible and open the Projects/About/Contact pages list.
- The Contact Us submenu anchors (`#earth-island`, `#pamalakaya`) scroll to those sections; on Wix they go nowhere.

Kept as-is from the original, so you may want to fix them:

- On Home, the **INFOGRAPHICS** button links to the Posters page.
- On About Us, Beatrice P. Silva's photo is John Benedict P. Realubit's photo.
- On Short Comics, Chapter 6 is a Wix stock photo (desktop slider only; phones show chapters 1–5).

## Licensing to check before publishing

- **Wix stock photo.** `11062b_7b66f880…` (Short Comics Chapter 6) is a Wix template placeholder. Wix
  licenses it for use on Wix sites only, so replace it before publishing elsewhere.
- **Block Berthold** (headings, nav) and **Vividly** (submenus, About Us team intro) are commercial fonts
  that were uploaded to the Wix account. Self-hosting them needs web-font licenses that cover your new host.
- Inter, IBM Plex Sans, Syne, Manrope and DM Sans load from Google Fonts (open licenses).
