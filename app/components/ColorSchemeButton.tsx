import React from 'react'
import { getCookie, setCookie } from '~/feature/cookie'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  closeModeMenu: () => void
}

export default function ColorSchemeButton({ children, closeModeMenu, ...props }: Props) {
  const onCLick = (e: React.MouseEvent) => {
    let mode = (e.target as HTMLButtonElement).value
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (mode === 'system' && systemDarkMode) mode = 'dark'
    if (mode === 'system' && !systemDarkMode) mode = 'light'

    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
      setCookie('mode', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      setCookie('mode', 'light')
    }

    closeModeMenu()
  }
  return (
    <button
      {...props}
      onClick={onCLick}
      className={`${props.className} before:filter-main_100 text-main_100 dark:text-dark_100 capitalize text-nowrap before:bg-default dark:before:filter-dark flex items-center gap-[8px] before:size-[20px]`}
    >
      {children}
    </button>
  )
}
