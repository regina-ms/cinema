import { apiCall } from '~/methods/apiCall'

export type TMovieList = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

export type MovieItem = {
  id: number
  title: string
  name: string
  original_title: string
  backdrop_path: string
  poster_path: string
}

export type Options = {
  value?: string
  queryParams?: string[]
}

export async function getMovieList({ value, queryParams }: Options) {
  const path = 'movie/' + value
  return await apiCall<MovieItem>({ path, queryParams })
}
