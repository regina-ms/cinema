import React, { useRef, useState } from 'react'
import { searchMovies } from '~/methods/searchMovies'
import { searchPeople } from '~/methods/searchPerson'
import type { ResponseData } from '~/layout/Header'

type Props = {
  onChangeHandler: React.Dispatch<React.SetStateAction<ResponseData>>
}

function SearchInput({ onChangeHandler }: Props) {
  const [inputVal, setInputVal] = useState<string>('')
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputVal(value)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(async () => {
      const movies = await searchMovies(e.target.value).then((data) => {
        if ('results' in data) {
          return data.results
        } else {
          return data
        }
      })
      const people = await searchPeople(e.target.value).then((data) => {
        if ('results' in data) {
          return data.results
        } else {
          return data
        }
      })
      onChangeHandler({ people, movies })
    }, 700)
  }

  return (
    <label className='invisible flex items-center gap-[16px] rounded-[8px] opacity-0 transition group-[.opened]:visible group-[.opened]:w-full group-[.opened]:opacity-100 md:px-[20px] md:py-[12px] md:group-[.opened]:w-[850px]'>
      <div className='bg-icon-search filter-main_100 bg-default' />
      <input
        onChange={onChange}
        value={inputVal}
        className='md:text-base_100 w-full text-[12px] focus-visible:outline-0'
        type='text'
        placeholder='Название фильма, сериала или имя актёра, режиссёра'
      />
    </label>
  )
}

export default SearchInput
