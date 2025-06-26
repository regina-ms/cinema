import React from 'react'
import { Link } from 'react-router'


function Header() {

  return (
    <header className='fixed flex items-start'>
      <Link to={{pathname: '/movies/popular'}}>popular</Link>

    </header>
  )
}

export default Header
