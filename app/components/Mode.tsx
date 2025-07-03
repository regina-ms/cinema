import React, { useState } from 'react'
import ColorSchemeButton from '~/components/ColorSchemeButton'

function Mode() {
  const [opened, setOpened] = useState(false)

  return (
    <div className='relative ml-[30px]'>
      <button
        onMouseEnter={() => setOpened(true)}
        className='bg-base-pink flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[100%]'
      >
        <div className='bg-default bg-icon-moon filter-white size-[40px]'></div>
      </button>
      <ul
        className={`bg-base-light/20 absolute right-0 flex min-w-[180px] translate-y-3 flex-col gap-[12px] rounded-[8px] px-[18px] py-[20px] text-[18px] transition ${opened ? 'visible' : 'invisible'}`}
      >
        <li>
          <ColorSchemeButton className='before:bg-icon-sun'>light</ColorSchemeButton>
        </li>
        <li>
          <ColorSchemeButton className='before:bg-icon-moon'>dark</ColorSchemeButton>
        </li>
        <li>
          <ColorSchemeButton className='before:bg-icon-system'>system</ColorSchemeButton>
        </li>
      </ul>
    </div>
  )
}

export default Mode
