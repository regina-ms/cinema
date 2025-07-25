import { apiCall } from '~/methods/apiCall'

type TVShowsLists = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'


export async function getTVShowsList(value: string) {
  const path = 'tv/' + value
  const tvData = await apiCall({ path, queryParams: ['page=1'] })

}
