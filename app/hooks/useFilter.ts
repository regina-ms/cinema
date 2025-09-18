import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'

export type FilterProps = {
  with_genres?: number[]
  primary_release_year?: number
  'vote_average.gte'?: number
  with_origin_country?: string
}

export function useFilter({ id }: { id: keyof FilterProps }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [decodedParams, setDecodedParams] = useState<string>('')

  function addValue(value: string | number) {
    if (id === 'with_genres' && searchParams.get(id)) {
      const string = `${searchParams.get(id)},${value}`
      setSearchParams((searchParams) => {
        searchParams.set(id, string)
        return searchParams
      })
    } else {
      setSearchParams((searchParams) => {
        searchParams.set(id, value.toString())
        return searchParams
      })
    }
  }

  useEffect(() => {
    setDecodedParams(() => searchParams.get(id) || '')
  }, [searchParams])

  return { addValue, decodedParams }
}
