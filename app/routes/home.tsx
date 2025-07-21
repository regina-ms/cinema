import type { Route } from './+types/home'
import { Form, Link, redirect, useFetcher } from 'react-router'



export default function Home({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher()
  return (
    <div>
      <h1 className='text-header_100'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorem ea eaque enim fugit itaque necessitatibus nihil omnis temporibus! Dignissimos dolorem expedita fuga inventore minima necessitatibus, nostrum quisquam recusandae suscipit!!</h1>
    </div>
  )
}
