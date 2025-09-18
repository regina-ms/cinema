import { NextButton, PrevButton, Slide, Slider, SliderInner } from '~/components/Slider/Slider'
import { Link } from 'react-router'
import { imageSrc } from '~/feature/imageSrc'
import type { MovieItem } from '~/methods/getMovieList'
import type { PeopleListItem } from '~/methods/getPeopleList'

export function showMovieSlider(list: MovieItem[]) {
  return (
    <Slider className='group/slider px-container relative'>
      <SliderInner>
        {list.map((item) => (
          <Slide
            key={item.id}
            className='z-20 ml-[12px] h-fit min-w-0 shrink-0 basis-[60%] rounded first:ml-0 md:ml-[20px] md:basis-[45%]'
          >
            <Link to={`/movie/${item.id}`} className={'group/item relative block'}>
              <img src={imageSrc(item.backdrop_path)} className='aspect-video w-full object-cover object-center' />
              <div className='bg-dark_180 absolute inset-0 flex flex-col items-center justify-center p-[20px] opacity-0 transition group-hover/item:opacity-100'>
                <div className='text-header_200 text-accent_100 invisible opacity-0 group-hover/item:visible group-hover/item:opacity-100'>
                  {item.title}
                </div>
              </div>
              <div className='text-base_200 mt-[8px] md:hidden'>{item.title}</div>
            </Link>
          </Slide>
        ))}
      </SliderInner>
      <NextButton className='bg-main_170 bg-icon-arrow bg-default invisible absolute top-1/2 right-[56px] z-10 size-[60px] -translate-y-1/2 rounded-full opacity-0 group-hover/slider:visible group-hover/slider:opacity-100'></NextButton>
      <PrevButton className='bg-main_170 bg-icon-arrow bg-default invisible absolute top-1/2 left-[56px] z-10 size-[60px] -translate-y-1/2 rotate-180 rounded-full opacity-0 group-hover/slider:visible group-hover/slider:opacity-100'></PrevButton>
    </Slider>
  )
}

export function showPeopleSlider(list: PeopleListItem[]) {
  return (
    <Slider className='group/slider px-container relative'>
      <SliderInner>
        {list.map((item) => (
          <Slide
            key={item.id}
            className='ml:basis-[11%] ml-[12px] h-fit min-w-0 shrink-0 basis-[25%] first:ml-[0] md:ml-[20px]'
          >
            <Link to={`/person/${item.id}`}>
              <img
                src={imageSrc(item.profile_path)}
                className='aspect-square w-full rounded-full object-cover object-center'
              />
              <div className='text-base_200 mt-[16px] text-center'>{item.name}</div>
            </Link>
          </Slide>
        ))}
      </SliderInner>
      <NextButton className='bg-main_170 bg-icon-arrow bg-default invisible absolute top-1/2 right-[56px] z-10 size-[60px] -translate-y-1/2 rounded-full opacity-0 group-hover/slider:visible group-hover/slider:opacity-100'></NextButton>
      <PrevButton className='bg-main_170 bg-icon-arrow bg-default invisible absolute top-1/2 left-[56px] z-10 size-[60px] -translate-y-1/2 rotate-180 rounded-full opacity-0 group-hover/slider:visible group-hover/slider:opacity-100'></PrevButton>
    </Slider>
  )
}
