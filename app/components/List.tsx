import type { MovieItem } from '~/methods/getMovieList'
import MovieCard from '~/ui/MovieCard'
import type { RefObject } from 'react'

function List({ list, ref }: { list: MovieItem[]; ref?: RefObject<HTMLAnchorElement | null> }) {
  return (
    <ul className={`grid grid-cols-5 gap-x-[16px] gap-y-[30px] py-[30px]`}>
      {list.map((movie, index) =>
        index === list.length - 1 ? (
          <MovieCard key={movie.id} {...movie} ref={ref} />
        ) : (
          <MovieCard key={movie.id} {...movie} />
        ),
      )}
    </ul>
  )
}

export default List
