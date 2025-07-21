import React, { useMemo, useState } from 'react'
import SearchInput from '~/components/SearchInput'
import type { DefaultLists } from '~/components/Header'


function Search({people}:DefaultLists) {
  const [opened, setOpened] = useState(true)
  const [lists, setLists] = useState()


  return (
    <div className={`group flex items-center gap-[24px] ml-auto ${opened ? 'opened' : ''}`}>
      <SearchInput />
      <button onClick={() => setOpened(prev => !prev)} className='group-[.opened]:bg-icon-close bg-icon-search bg-default filter-main_100 size-[40px] cursor-pointer'></button>
        <div className='group-[.opened]:visible group-[.opened]:opacity-100 invisible opacity-0 absolute top-full inset-0 px-[56px] py-[15px] min-h-[250px] bg-dark_200'></div>
    </div>
  )
}

export default Search
