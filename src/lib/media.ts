import manifest from '../data/media-manifest.json'

interface MediaEntry {
  w: number
  h: number
  widths: number[]
}

const entries = manifest as Record<string, MediaEntry>

export function mediaInfo(id: string): MediaEntry {
  const entry = entries[id]
  if (!entry) throw new Error(`Unknown media id: ${id}`)
  return entry
}

const url = (id: string, width: number) => `/media/${id}-${width}.webp`

export function mediaSrc(id: string, minWidth = 1280) {
  const { widths } = mediaInfo(id)
  return url(id, widths.find((w) => w >= minWidth) ?? widths[widths.length - 1])
}

export function mediaSrcSet(id: string) {
  return mediaInfo(id)
    .widths.map((w) => `${url(id, w)} ${w}w`)
    .join(', ')
}

export const videoSrc = (id: string) => `/video/${id}.mp4`
