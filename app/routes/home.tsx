import type { Route } from './+types/home'
import { getTrending, type TrendingArgs } from '~/methods/getTrending'
import { useEffect, useRef, useState } from 'react'
import { usePagination } from '~/hooks/usePagination'
import Loader from '~/ui/Loader'
import List from '~/components/List'
import Filter from '~/components/Filter'
import { getGenres } from '~/methods/getGenres'
import { errorMessage } from '~/methods/apiCall'

const DEFAULT_ARGS: TrendingArgs = {
  type: 'all',
  time_window: 'day',
}

export async function clientLoader() {
  const trending = await getTrending(DEFAULT_ARGS)
  const genresList = await getGenres('movie')

  if ('error' in trending || 'error' in genresList) {
    return { error: errorMessage }
  }

  return { trending, genres: genresList.genres }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if ('error' in loaderData) return <div>{loaderData.error}</div>
  const { trending, genres } = loaderData

  const [list, setList] = useState(trending.results)
  const listElementRef = useRef<HTMLAnchorElement>(null)
  const [loading, setLoading] = useState(false)

  const _setList = async (page: number) => {
    setLoading(true)
    const data = await getTrending({ ...DEFAULT_ARGS, page })
    setLoading(false)
    if ('error' in data) {
      return []
    } else {
      setList([...list, ...data.results])
    }
  }

  const { setObserver } = usePagination({
    _setList,
    pageLimit: trending.total_pages,
  })

  useEffect(() => {
    setObserver(listElementRef.current)
  }, [list])

  return (
    <>
      <div className='flex justify-end'>
        <Filter genresList={genres} />
      </div>
      <List list={list} ref={listElementRef}></List>
      {loading && <Loader text={'загрузка'} className={'col-span-5 justify-center'} />}
    </>
  )
}
