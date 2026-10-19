import type { ImgHTMLAttributes } from 'react'
import { mediaInfo, mediaSrc, mediaSrcSet } from '~/lib/media'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  id: string
  eager?: boolean
}

export function Img({ id, eager, alt = '', sizes = '100vw', ...rest }: Props) {
  const info = mediaInfo(id)
  return (
    <img
      src={mediaSrc(id)}
      srcSet={mediaSrcSet(id)}
      sizes={sizes}
      width={info.w}
      height={info.h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      {...rest}
    />
  )
}
