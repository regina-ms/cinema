import React, { type Ref } from 'react'
import type { MovieItem } from '~/methods/getMovieList'
import { imageSrc } from '~/feature/imageSrc'
import { Link } from 'react-router'

function MovieCard({ id, poster_path, ref }: MovieItem & { ref?: Ref<HTMLAnchorElement> }) {
  return (
    <Link to={`/movie/${id}`} className={`h-[520px] id-${id}`} ref={ref}>
      <img src={imageSrc(poster_path)} className={'size-full object-cover object-center'} loading='lazy' />
    </Link>
  )
}

export default MovieCard
