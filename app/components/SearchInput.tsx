import React from 'react'

function SearchInput() {
    return (<label className='flex items-center gap-[16px] transition group-[.opened]:visible group-[.opened]:opacity-100 invisible opacity-0 px-[20px] py-[12px] w-[850px] rounded-[8px] border border-dark_200/10'>
        <div className='size-[40px] bg-icon-search filter-main_100 bg-default '/>
        <input className='w-full text-base_100 focus-visible:outline-0' type='text' placeholder='Название фильма, сериала или имя актёра, режиссёра'/>
    </label>)
}

export default SearchInput