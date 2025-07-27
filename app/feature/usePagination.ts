import { useCallback, useEffect, useRef, useState } from 'react'

export function usePagination<T>(getList: () => Promise<T[]>, pageLimit: number) {
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState<T[]>([])
  const observer = useRef<IntersectionObserver>(null)

  const setObserver = useCallback((node: HTMLElement | null) => {
    observer.current?.disconnect()
    if (!node) {
      return
    }
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.current?.disconnect()
          setPage((prev) => prev + 1)
        }
      },
      { rootMargin: '0px 0px 75px 0px' },
    )

    observer.current.observe(node)
  }, [])

  useEffect(() => {
    if (page > pageLimit) return
    getList().then((data) => setList([...list, ...data]))
  }, [page])

  return {
    list,
    page,
    setObserver,
  }
}
