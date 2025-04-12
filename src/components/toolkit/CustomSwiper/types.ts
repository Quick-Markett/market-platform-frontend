import type { SwiperOptions } from 'swiper/types'

export interface CustomSwiperProps {
  arrowNextClassName?: string
  arrowPrevClassName?: string
  fadeColor?: string
  hasLeftArrow?: boolean
  hasLeftFade?: boolean
  hasRightArrow?: boolean
  hasRightFade?: boolean
  onSlideChange?: (ref) => void
  options?: SwiperOptions
  slides: React.ReactNode[]
  swiperSlideClassName?: string
  swiperStyleId?: string
  top?: string | number
}
