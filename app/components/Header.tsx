import React from 'react'
import { Link } from 'react-router'
import Search from '~/components/Search'
import Mode from '~/components/Mode'

function Header() {
  return (
    <header className='fixed flex w-full items-center px-[56px] py-[18px]'>
      <Link to='/'>
        <img src='/assets/logo.png' className='mr-[40px] max-w-[120px]' />
      </Link>
      <ul className='flex items-center gap-[16px]'>
        <li>
          <Link to={{ pathname: '/movies/popular' }}>popular films</Link>{' '}
        </li>
        <li>
          <Link to={{ pathname: '/TVShows/popular' }}>popular TV shows</Link>
        </li>
      </ul>
      <Search inputProps={{ placeholder: 'Search' }} />
      <Mode />
    </header>
  )
}

export default Header
