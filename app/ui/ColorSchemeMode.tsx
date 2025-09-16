import React, { useEffect, useState } from 'react'
import { getCookie, setCookie } from '~/feature/cookie'

function ColorSchemeMode() {
  const [opened, setOpened] = useState(false)
  const mode = getCookie('mode')

  const [icon, setIcon] = useState<string>('bg-icon-moon')

  useEffect(() => {
    if (mode === 'dark') {
      setIcon('bg-icon-moon')
    } else {
      setIcon('bg-icon-sun')
    }
  }, [mode])

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

    setOpened(false)
  }

  return (
    <div className='relative ml-[30px]'>
      <button
        onClick={() => setOpened((prev) => !prev)}
        className='bg-main_100 flex cursor-pointer items-center justify-center rounded-[100%] md:size-[40px]'
      >
        <div className={`bg-default ${icon} filter-dark`}></div>
      </button>
      <ul
        className={`bg-dark dark:bg-main_100 text-base_200 absolute right-0 flex min-w-[180px] translate-y-3 flex-col gap-[12px] rounded-[8px] pt-[12px] pr-[10px] pb-[12px] pl-[10px] transition md:pt-[20px] md:pr-[18px] md:pb-[20px] md:pl-[18px] ${opened ? 'visible' : 'invisible'}`}
      >
        <li>
          <button
            onClick={onCLick}
            value='light'
            className='before:bg-icon-sun before:filter-main_100 text-main_100 dark:text-dark_100 before:bg-default dark:before:filter-dark flex items-center gap-[8px] text-nowrap capitalize'
          >
            светлая тема
          </button>
        </li>
        <li>
          <button
            onClick={onCLick}
            value='dark'
            className='before:bg-icon-moon before:filter-main_100 text-main_100 dark:text-dark_100 before:bg-default dark:before:filter-dark flex items-center gap-[8px] text-nowrap capitalize before:size-[20px]'
          >
            темная тема
          </button>
        </li>
        <li>
          <button
            onClick={onCLick}
            value='system'
            className='before:filter-main_100 text-main_100 dark:text-dark_100 before:bg-default dark:before:filter-dark before:bg-icon-system flex items-center gap-[8px] text-nowrap capitalize before:size-[20px]'
          >
            системная
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ColorSchemeMode
