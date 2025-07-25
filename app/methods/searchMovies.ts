import { apiCall } from '~/methods/apiCall'
import type { MovieItem } from '~/methods/getMovieList'

export async function searchMovies(query: string) {
  const queryParams = ['query=' + encodeURI(query)]
  const path = 'search/movie'
  return await apiCall<MovieItem>({ path, queryParams })
}
