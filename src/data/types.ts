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

/** Item placed on the original 1440px desktop canvas, relative to its gallery's origin. */
export type PositionedItem<T> = T & {
  x: number
  y: number
  boxW: number
  boxH: number
  /** Height / width of the item in the stacked mobile layout. */
  mRatio: number
}
