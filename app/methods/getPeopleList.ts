import { apiCall } from '~/methods/apiCall'

export type PeopleListItem = {
  id: number
  name: string
  profile_path: string
}

export async function getPeopleList() {
  return await apiCall<PeopleListItem>({ path: 'person/popular', queryParams: ['page=1'] })
}
