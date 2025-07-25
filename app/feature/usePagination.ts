import { useEffect, useRef, useState } from 'react'

export function usePagination<T>(callback: () => Promise<T[]>) {
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState<T[]>([])

  const observer = useRef<IntersectionObserver>(null)

  const setObserver = (node: HTMLElement | null) => {
    observer.current?.disconnect()
    console.log({ node })
    if (!node) {
      return
    }
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.current?.disconnect()
          setPage((prev) => prev + 1)
          console.log(entry)
        }
      },
      { rootMargin: '0px 0px 75px 0px' },
    )

    observer.current.observe(node)
  }

  useEffect(() => {
    callback().then((data) => setList([...list, ...data]))
  }, [page])

  return {
    list,
    page,
    setObserver,
  }
}
