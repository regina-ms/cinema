import React from 'react'

type Props = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  otherProps?: any
}

function Search({ ...params }: Props) {
  return (
    <button className='bg-icon-search filter-white bg-default ml-auto h-[40px] w-[40px] cursor-pointer'></button>
  )
}

export default Search
