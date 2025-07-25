import React from 'react'
import { Link } from 'react-router'
import Search from '~/components/Search'
import ColorSchemeMode from '~/ui/ColorSchemeMode'
import type { PeopleListItem } from '~/methods/getPeopleList'
import type { MovieItem } from '~/methods/getMovieList'
import type { ErrorMessage } from '~/methods/apiCall'

export type ResponseData = {
  people: PeopleListItem[] | ErrorMessage
  movies: MovieItem[] | ErrorMessage
}

function Header({ people, movies }: ResponseData) {
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
      <Search movies={movies} people={people} />
      <ColorSchemeMode />
    </header>
  )
}

export default Header
