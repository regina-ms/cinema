import React, { useEffect, useState } from 'react'
import ColorSchemeButton from '~/components/ColorSchemeButton'
import { getCookie } from '~/feature/cookie'

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
          <ColorSchemeButton closeModeMenu={() => setOpened(false)} value='light' className='before:bg-icon-sun'>
            светлая тема
          </ColorSchemeButton>
        </li>
        <li>
          <ColorSchemeButton closeModeMenu={() => setOpened(false)} value='dark' className='before:bg-icon-moon'>
            темная тема
          </ColorSchemeButton>
        </li>
        <li>
          <ColorSchemeButton closeModeMenu={() => setOpened(false)} value='system' className='before:bg-icon-system'>
            системная
          </ColorSchemeButton>
        </li>
      </ul>
    </div>
  )
}

export default ColorSchemeMode
