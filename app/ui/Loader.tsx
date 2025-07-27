import React, { useEffect, useRef } from 'react'
import { animate, createScope, Scope, text, utils } from 'animejs'

type Props = {
  text: string
  className?: string
}
function Loader({ text, className }: Props) {
  const containerRef = useRef(null)
  const scope = useRef<Scope>(null)

  useEffect(() => {
    const letters = utils.$('[data-animate]')
    scope.current = createScope({ root: containerRef }).add((self) => {
      animate(letters, {
        y: [
          { to: '-100%', duration: 1000 },
          { to: 0, duration: 1200 },
        ],
        rotate: 360,
        loop: true,
      })
    })
  }, [])
  return (
    <div
      className={`text-base_100 relative flex w-full items-end uppercase ${className}`}
      ref={containerRef}
    >
      <span className='absolute bottom-0 opacity-20'>{text}</span>
      {[...text].map((letter) => (
        <span data-animate='animate'>{letter}</span>
      ))}
    </div>
  )
}

export default Loader
