export interface GalleryImage {
  media: string
  alt: string
  w: number
  h: number
}

export interface GalleryVideo {
  video: string
  poster: string
  name: string
  w: number
  h: number
  duration: number
}

/** Item frame relative to its gallery's origin: x/y/boxW/boxH on the 1440 canvas, mx/my/mw/mh on the 390 canvas. */
export type PositionedItem<T> = T & {
  x: number
  y: number
  boxW: number
  boxH: number
  mx: number
  my: number
  mw: number
  mh: number
}
