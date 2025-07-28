import { apiCall } from '~/methods/apiCall'

export async function getTVShowsList(value: string) {
  const path = 'tv/' + value
  return await apiCall({ path, queryParams: ['page=1'] })
}
