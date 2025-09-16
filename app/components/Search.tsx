import { useState } from 'react'
import SearchInput from '~/components/SearchInput'
import { showMovieSlider, showPeopleSlider } from '~/feature/showSlider'
import type { ResponseData } from '~/layout/Header'

function Search({ people, movies }: ResponseData) {
  const [opened, setOpened] = useState(false)
  const [lists, setLists] = useState<ResponseData>({ people, movies })
  let peopleContent
  let moviesContent

  function showContent() {
    if ('error' in lists.people) {
      peopleContent = (
        <div className='text-base_100 text-accent_200 px-container font-bold uppercase'>{lists.people.error}</div>
      )
    } else {
      peopleContent = showPeopleSlider(lists.people)
    }
    if ('error' in lists.movies) {
      moviesContent = (
        <div className='text-base_100 text-accent_200 px-container font-bold uppercase'>{lists.movies.error}</div>
      )
    } else {
      moviesContent = showMovieSlider(lists.movies)
    }

    return (
      <>
        {moviesContent}
        {peopleContent}
      </>
    )
  }

  return (
    <div
      className={`group ml-auto flex items-center gap-[24px] md:p-0 ${opened ? 'opened bg-dark_200 absolute left-0 z-20 w-full pr-[16px] pl-[16px] md:static md:w-fit md:bg-transparent' : ''}`}
    >
      <SearchInput onChangeHandler={setLists} />
      <button
        onClick={() => setOpened((prev) => !prev)}
        className='group-[.opened]:bg-icon-close bg-icon-search bg-default filter-main_100'
      ></button>
      <div className='bg-dark_200 invisible absolute inset-0 top-full flex h-fit min-h-[250px] flex-col gap-[50px] py-[15px] opacity-0 group-[.opened]:visible group-[.opened]:opacity-100'>
        {showContent()}
      </div>
    </div>
  )
}

export default Search
