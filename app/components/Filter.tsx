import { useState } from 'react'
import type { GenreItem } from '~/methods/getGenres'
import _FilterSelector from '~/ui/FilterSelector'

type FilterProps = {
  genresList: GenreItem[]
}

function Filter({ genresList }: FilterProps) {
  const [opened, setOpened] = useState<boolean>(true)

  return (
    <div className='relative flex items-center'>
      <button
        className={`flex size-[30px] items-center justify-center rounded-[4px] ${opened ? 'invisible' : ''}`}
        onClick={() => setOpened(true)}
      >
        <div className='bg-icon-filter filter-main_100 bg-default'></div>
      </button>
      <div className={`absolute right-0 flex items-center gap-[8px] transition ${opened ? 'visible' : 'invisible'}`}>
        <_FilterSelector id={'with_genres'} title={'Жанры'} options={genresList} />
        <button className={`bg-default bg-icon-close filter-main_100`} onClick={() => setOpened(false)} />
      </div>
    </div>
  )
}

export default Filter
