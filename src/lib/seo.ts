const SITE = 'Plastik Di Walastik'

/** Per-page head tags, matching the original "<PAGE> | Plastik Di Walastik" titles. */
export function seo(page: string, path: string) {
  const title = `${page} | ${SITE}`
  return {
    meta: [
      { title },
      { property: 'og:title', content: title },
      { property: 'og:site_name', content: SITE },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: path },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
    ],
  }
}
