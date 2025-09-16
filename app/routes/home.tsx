import type { Route } from './+types/home'
import { getTrending, type TrendingArgs } from '~/methods/getTrending'
import { useEffect, useRef, useState } from 'react'
import { usePagination } from '~/hooks/usePagination'
import Loader from '~/ui/Loader'
import type { MovieItem } from '~/methods/getMovieList'
import List from '~/components/List'
import Filter from '~/components/Filter'

const DEFAULT_ARGS: TrendingArgs = {
  type: 'all',
  time_window: 'day',
}

export async function clientLoader() {
  const data = await getTrending(DEFAULT_ARGS)
  return { ...data }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if ('error' in loaderData) return <div>{loaderData.error}</div>
  const listElementRef = useRef<HTMLAnchorElement>(null)
  const [loading, setLoading] = useState(false)

  const getList = async (): Promise<MovieItem[]> => {
    setLoading(true)
    const data = await getTrending({ ...DEFAULT_ARGS, page })
    setLoading(false)
    if ('error' in data) {
      return []
    } else {
      return data.results
    }
  }

  const { list, page, setObserver } = usePagination<MovieItem>({
    getList,
    pageLimit: loaderData.total_pages,
    initList: loaderData.results,
  })

  useEffect(() => {
    setObserver(listElementRef.current)
  }, [list])

  return (
    <>
      <div className='flex justify-end'>
        <Filter />
      </div>
      <List list={list} ref={listElementRef}></List>
      {loading && <Loader text={'загрузка'} className={'col-span-5 justify-center'} />}
    </>
  )
}
