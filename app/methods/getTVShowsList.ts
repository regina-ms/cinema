export async function getTVShowsList(value: string) {
  const res = await fetch(`https://api.themoviedb.org/3/tv/${value}?language=ru-RU&page=1`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  })
  return await res.json()
}
