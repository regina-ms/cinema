export type ApiCallArgs = {
  path: string
  queryParams?: string[]
}

export function slashParam(rawParam: string) {
  return /^\/.*/.test(rawParam) ? rawParam : '/' + rawParam
}

export type ApiCallResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type ErrorMessage = {
  error: string
}

const errorMessage = 'не удалось получить доступ к АПИ'

export async function apiCall<T>({ path, queryParams }: ApiCallArgs): Promise<ApiCallResponse<T> | ErrorMessage> {
  const language = 'ru-RU'
  const fullQuery = queryParams ? queryParams.join('&') + `&language=${language}` : `language=${language}`

  const url = `https://api.themoviedb.org/3${slashParam(path)}?${fullQuery}`
  console.log(url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    })
    return response.json()
  } catch (error: any) {
    console.error('Ошибка запроса:', error)

    return {
      error: errorMessage,
    }
  }
}
