import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ColorSchemeButton({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className={`${props.className} before:bg-default filter-white flex items-center gap-[8px] before:size-[20px]`}
    >
      {children}
    </button>
  )
}
