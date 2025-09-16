import { type PropsWithChildren, useEffect } from 'react'

interface Props extends PropsWithChildren {
  className?: string
  closePopupFunction?: () => void
}

function Popup({ children, className }: Props) {
  useEffect(() => {
    document.documentElement.classList.add('overflow-hidden')
  }, [])

  return <div className={`bg-dark_280 fixed inset-0 z-50 ${className}`}>{children}</div>
}

export default Popup
