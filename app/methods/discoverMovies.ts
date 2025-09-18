import { apiCall } from '~/methods/apiCall'
import type { MovieItem } from '~/methods/getMovieList'

export async function discoverMovies(queryParams: string[]) {
  const path = 'discover/movie'
  return await apiCall<MovieItem>({ path, queryParams })
}
