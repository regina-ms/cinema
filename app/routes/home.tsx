import type { Route } from './+types/home'
import { getTrending, type TrendingArgs } from '~/methods/getTrending'
import MovieCard from '~/ui/MovieCard'
import { useEffect, useRef, useState } from 'react'
import { usePagination } from '~/feature/usePagination'
import Loader from '~/ui/Loader'

const DEFAULT_ARGS: TrendingArgs = {
  type: 'all',
  time_window: 'day',
}

export async function clientLoader() {
  return await getTrending(DEFAULT_ARGS)
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if ('error' in loaderData) return <div>{loaderData.error}</div>
  const listElementRef = useRef<HTMLAnchorElement>(null)
  const [loading, setLoading] = useState(false)

  const getList = async () => {
    setLoading(true)
    const data = await getTrending({ ...DEFAULT_ARGS, page })
    setLoading(false)
    if ('error' in data) {
      return []
    } else {
      return data.results
    }
  }

  const { list, page, setObserver } = usePagination(getList, loaderData.total_pages)

  useEffect(() => {
    if (!list.length) return
    setObserver(listElementRef.current)
  }, [list])

  return (
    <ul className={`grid grid-cols-5 gap-x-[16px] gap-y-[30px] py-[30px] next-page-${page}`}>
      {list.map((movie, index) =>
        index === list.length - 1 ? <MovieCard {...movie} ref={listElementRef} /> : <MovieCard {...movie} />,
      )}
      {loading && <Loader text={'загрузка'} className={'col-span-5 justify-center'} />}
    </ul>
  )
}
