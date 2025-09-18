import { useCallback, useEffect, useRef, useState } from 'react'

type Args = {
  _setList: (page: number) => Promise<any>
  pageLimit: number
}

export function usePagination({ _setList, pageLimit }: Args) {
  const [page, setPage] = useState<number>(1)
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
    if (page === 1) return
    if (page > pageLimit) return
    _setList(page)
  }, [page])

  return {
    setObserver,
    page,
  }
}
