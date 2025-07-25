import { apiCall } from '~/methods/apiCall'
import type { PeopleListItem } from '~/methods/getPeopleList'

export async function searchPeople(query: string) {
    const queryParams = ['query=' + encodeURI(query)]
    const path = 'search/person'
    return await apiCall<PeopleListItem>({ path, queryParams })
}