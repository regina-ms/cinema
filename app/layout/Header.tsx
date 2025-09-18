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
    <header className='px-container peer has-[.opened]:bg-dark_200 px-container sticky top-0 z-10 flex w-full items-center py-[20px] md:py-[36px]'>
      <Link to='/'>
        <img src='/assets/MovieHub.svg' className='max-w-[100px] md:mr-[40px] md:max-w-[250px]' />
      </Link>

      <ul className='md:text-base_200 hidden md:flex md:items-center md:gap-[32px]'>
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
