import React, { createContext, useContext } from 'react'
import useEmblaCarousel, { type EmblaViewportRefType } from 'embla-carousel-react'
import { useSliderNavigation } from '~/components/Slider/useSliderNavigation'
import type { EmblaCarouselType } from 'embla-carousel'

type SliderContextType = {
  emblaRef?: EmblaViewportRefType
  emblaApi?: EmblaCarouselType
}

const SliderContext = createContext<SliderContextType>({})

interface Props extends React.PropsWithChildren {
  className?: string
}

export function Slider({ className, children }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  return (
    <SliderContext value={{ emblaApi, emblaRef }}>
      <div className={className}>{children}</div>
    </SliderContext>
  )
}

export function SliderInner({ children }: React.PropsWithChildren) {
  const { emblaRef } = useContext(SliderContext)
  return (
    <div className='h-full md:overflow-hidden' ref={emblaRef}>
      <div className='mr-[56px] ml-[36px] flex h-full'>{children}</div>
    </div>
  )
}

export function Slide({ className, children }: Props) {
  return <div className={`embla__slide translate ${className}`}>{children}</div>
}

export function NextButton({ children, className }: Props) {
  const { emblaApi } = useContext(SliderContext)
  const { nextBtnDisabled, onNextButtonClick } = useSliderNavigation(emblaApi)

  return (
    <button
      type='button'
      className={`transition ${className} ${nextBtnDisabled ? 'invisible opacity-0' : ''}`}
      onClick={onNextButtonClick}
      disabled={nextBtnDisabled}
    >
      {children}
    </button>
  )
}

export function PrevButton({ children, className }: Props) {
  const { emblaApi } = useContext(SliderContext)
  const { prevBtnDisabled, onPrevButtonClick } = useSliderNavigation(emblaApi)

  return (
    <button
      type='button'
      className={`transition ${className} ${prevBtnDisabled ? 'invisible opacity-0' : ''}`}
      onClick={onPrevButtonClick}
      disabled={prevBtnDisabled}
    >
      {children}
    </button>
  )
}
