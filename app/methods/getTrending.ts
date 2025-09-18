import { apiCall } from '~/methods/apiCall'
import type { MovieItem } from '~/methods/getMovieList'

export type TrendingArgs = {
  type: 'all' | 'movie' | 'tv' | 'person'
  time_window: 'day' | 'week'
  page?: number
}

export async function getTrending({ type, time_window, page }: TrendingArgs) {
  return await apiCall<MovieItem>({ path: `trending/${type}/${time_window}`, page })
}
