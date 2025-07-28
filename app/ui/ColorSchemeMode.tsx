import React, { useEffect, useState } from 'react'
import { getCookie, setCookie } from '~/feature/cookie'

function ColorSchemeMode() {
  const [opened, setOpened] = useState(false)
  const mode = getCookie('mode')
  const [icon, setIcon] = useState<string>(mode || 'dark')

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
        className='bg-main_100 flex size-[40px] cursor-pointer items-center justify-center rounded-[100%]'
      >
        <div className={`bg-default ${icon} filter-dark size-[30px]`}></div>
      </button>
      <ul
        className={`bg-dark dark:bg-main_100 text-base_200 absolute right-0 flex min-w-[180px] translate-y-3 flex-col gap-[12px] rounded-[8px] px-[18px] py-[20px] transition ${opened ? 'visible' : 'invisible'}`}
      >
        <li>
          <button
            onClick={onCLick}
            value='light'
            className='before:bg-icon-sun before:filter-main_100 text-main_100 dark:text-dark_100 before:bg-default dark:before:filter-dark flex items-center gap-[8px] text-nowrap capitalize before:size-[20px]'
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
