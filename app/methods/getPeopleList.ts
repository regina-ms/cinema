export type PeopleList = {
  id: number
  name: string
  profile_path: string
}

export async function getPeopleList():Promise<PeopleList[]> {
  const res = await fetch(`https://api.themoviedb.org/3/person/popular?language=ru-RU&page=1`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  })

  const list = await res.json()


  return await list.results
}
