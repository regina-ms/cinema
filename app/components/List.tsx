import type { MovieItem } from '~/methods/getMovieList'
import MovieCard from '~/ui/MovieCard'
import type { RefObject } from 'react'

function List({ list, ref }: { list: MovieItem[]; ref?: RefObject<HTMLAnchorElement | null> }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-[8px] pt-[16px] pb-[16px] md:grid-cols-5 md:gap-[16px] md:pt-[30px] md:pb-[30px]`}
    >
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
