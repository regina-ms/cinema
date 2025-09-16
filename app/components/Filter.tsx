import { usePopup } from '~/hooks/usePopup'

function Filter() {
  const { openPopup } = usePopup()

  return (
    <button className='flex size-[30px] items-center justify-center rounded-[4px]' onClick={() => openPopup('filter')}>
      <div className='bg-icon-filter filter-main_100 bg-default size-[30px]'></div>
    </button>
  )
}

export default Filter
