import { useEffect, useState } from 'react'

export type Option = { id: number; name: string }

export type SelectorProps = {
  title: string
  options: Option[]
  onOptClickHandle?: (id: string) => void
  activeOptId?: number
}

function Selector({ title, options, onOptClickHandle, activeOptId }: SelectorProps) {
  const [activeValueId, setActiveValueId] = useState(activeOptId || '0')
  const [activeValueName, setActiveValueName] = useState<string>(title)
  const [opened, setOpened] = useState(false)

  const _onOptClickHandle = (option: Option) => {
    if (onOptClickHandle) {
      onOptClickHandle(option.id.toString())
    } else {
      setActiveValueId(option.id)
    }
  }

  useEffect(() => {
    const option = options.find((opt) => opt.id === activeOptId)
    setActiveValueName(option?.name || title)
  }, [activeOptId])

  useEffect(() => {
    const option = options.find((opt) => opt.id === activeValueId)
    setActiveValueName(option?.name || title)
  }, [activeValueId])

  return (
    <div
      className='bg-main_100 relative cursor-pointer rounded-[8px] pt-[8px] pr-[8px] pb-[8px] pl-[8px]'
      onClick={() => setOpened((prev) => !prev)}
    >
      <div className='text-base_200 text-dark_200'>{activeValueName}</div>
      <ul
        className={`bg-main_100 text-base_300 text-dark_200 scrollbar-custom absolute top-full right-0 flex h-[160px] w-[150px] flex-col gap-[8px] overflow-x-hidden overflow-y-auto rounded-[8px] pt-[16px] pr-[12px] pb-[16px] pl-[12px] md:w-[280px] md:pl-[20px] ${opened ? 'visible' : 'invisible'}`}
      >
        {options.map((opt) => (
          <li key={opt.id} data-id={opt.id} onClick={() => _onOptClickHandle(opt)}>
            {opt.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Selector
