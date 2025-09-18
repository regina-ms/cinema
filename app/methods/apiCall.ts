export type ApiCallArgs = {
  path: string
  queryParams?: string[]
  page?: number
  language?: string
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

export const errorMessage = 'не удалось получить доступ к АПИ'

export async function apiCall<T>({
  path,
  queryParams = [],
  page = 1,
  language = 'ru-RU',
}: ApiCallArgs): Promise<ApiCallResponse<T> | ErrorMessage> {
  const generalQueryParams = `language=${language}` + `&page=${page}`

  const fullQuery = queryParams ? queryParams.join('&') + `&${generalQueryParams}` : generalQueryParams

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
  } catch (error: unknown) {
    console.error('Ошибка запроса:', error + url)

    return {
      error: errorMessage,
    }
  }
}
