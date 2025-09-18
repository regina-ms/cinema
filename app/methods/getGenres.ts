import { type ErrorMessage, errorMessage } from '~/methods/apiCall'

type GenreListType = 'movie' | 'tv'

export type GenreItem = {
  id: number
  name: string
}

type GenresList = {
  genres: GenreItem[]
}

export async function getGenres(type: GenreListType): Promise<GenresList | ErrorMessage> {
  const path = `https://api.themoviedb.org/3/genre/${type}/list?language=ru`

  try {
    const response = await fetch(path, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    })
    return response.json()
  } catch (error: unknown) {
    console.error('Ошибка запроса:', error + path)

    return {
      error: errorMessage,
    }
  }
}
