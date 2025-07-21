import React from 'react'
import { Link } from 'react-router'
import Search from '~/components/Search'
import ColorSchemeMode from '~/components/ColorSchemeMode'
import type { PeopleList } from '~/methods/getPeopleList'

export type DefaultLists = {
    people: PeopleList[]
}

function Header({people}:DefaultLists) {

  return (
    <header className='peer has-[.opened]:bg-dark_200 sticky top-0 z-10 flex w-full items-center px-[56px] py-[18px]'>
      <Link to='/'>
        <img src='/assets/MovieHub.svg' className='mr-[40px] max-w-[250px]' />
      </Link>
      <ul className='text-base_200 flex items-center gap-[32px]'>
        <li>
          <Link to={{ pathname: '/movies/popular' }}>Фильмы</Link>{' '}
        </li>
        <li>
          <Link to={{ pathname: '/TVShows/popular' }}>Сериалы</Link>
        </li>
      </ul>
      <Search />
      <ColorSchemeMode />
    </header>
  )
}

export default Header
