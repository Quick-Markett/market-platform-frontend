'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import type { SwiperRef } from 'swiper/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Arrow } from './Arrow'
import { defaultOptions } from './data'
import { getSwiperStyles } from './styles'
import type { CustomSwiperProps } from './types'

export const CustomSwiper = forwardRef((props: CustomSwiperProps, ref) => {
  const {
    slides,
    options,
    arrowPrevClassName = 'h-4 w-4 rotate-90 cursor-pointer lg:h-6 lg:w-6 pointer-events-auto',
    arrowNextClassName = 'h-4 w-4 -rotate-90 cursor-pointer lg:h-6 lg:w-6 pointer-events-auto',
    top,
    hasLeftArrow = false,
    hasRightArrow = false,
    hasLeftFade = false,
    hasRightFade = false,
    fadeColor = '#f8fafc',
    swiperStyleId = 'strechted',
    swiperSlideClassName = '',
    onSlideChange
  } = props

  const sliderRef = useRef<SwiperRef>(null)

  const handleNext = () => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }

  const handlePrev = () => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }

  const hasArrows = hasLeftArrow || hasRightArrow
  const hasTwoArrows = hasLeftArrow && hasRightArrow

  const hasFades = hasLeftFade || hasRightFade
  const hasTwoFades = hasLeftFade && hasRightFade

  useImperativeHandle(ref, () => ({
    slideToIndex: (index: number) => {
      if (!sliderRef.current) return
      sliderRef.current.swiper.slideTo(index)
    }
  }))

  return (
    <div className="relative flex w-full">
      {hasArrows && (
        <div
          className={`pointer-events-none absolute left-0 z-30 mx-auto flex w-full flex-col px-4 xl:px-0`}
          style={{ top }}
        >
          <div
            className={`mx-auto flex w-full items-center ${
              hasTwoArrows
                ? 'justify-between'
                : hasLeftArrow
                  ? 'justify-start'
                  : 'justify-end'
            } gap-3`}
          >
            {hasLeftArrow && (
              <button onClick={() => handlePrev()}>
                <Arrow className={arrowPrevClassName} />
              </button>
            )}

            {hasRightArrow && (
              <button onClick={() => handleNext()}>
                <Arrow className={arrowNextClassName} />
              </button>
            )}
          </div>
        </div>
      )}
      <section className="relative mx-auto w-full max-w-full">
        <Swiper
          pagination={
            options?.pagination ?? {
              clickable: true
            }
          }
          slidesOffsetAfter={
            options?.slidesOffsetAfter || defaultOptions.slidesOffsetAfter
          }
          slidesOffsetBefore={
            options?.slidesOffsetBefore || defaultOptions.slidesOffsetBefore
          }
          breakpoints={options?.breakpoints || defaultOptions.breakpoints}
          className={`${getSwiperStyles(swiperStyleId)} relative z-20 max-w-full select-none`}
          loop={options?.loop ?? false}
          modules={[Pagination, Navigation]}
          onSlideChange={onSlideChange ?? (() => {})}
          ref={sliderRef}
          slidesPerView={options?.slidesPerView || defaultOptions.slidesPerView}
          spaceBetween={options?.spaceBetween || defaultOptions.spaceBetween}
          {...options}
        >
          {slides.map((slide, index: number) => (
            <SwiperSlide
              className={`${!options?.pagination ? '' : 'mb-12'} ${swiperSlideClassName}`}
              key={`slide-${index}`}
            >
              {slide}
            </SwiperSlide>
          ))}
        </Swiper>

        {hasFades && (
          <div
            className={`pointer-events-none absolute inset-0 z-10 flex h-full w-full items-center ${
              hasTwoFades
                ? 'justify-between'
                : hasLeftFade
                  ? 'justify-start'
                  : 'justify-end '
            }`}
          >
            {hasLeftFade && (
              <div
                style={{
                  background: `linear-gradient(to right, ${fadeColor}, transparent)`
                }}
                className="h-full w-[5%] md:w-[15%]"
              />
            )}
            {hasRightFade && (
              <div
                style={{
                  background: `linear-gradient(to left, ${fadeColor}, transparent)`
                }}
                className="h-full w-[5%] md:w-[15%]"
              />
            )}
          </div>
        )}
      </section>
    </div>
  )
})

CustomSwiper.displayName = 'CustomSwiper'
