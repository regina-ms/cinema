import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import './app.css'
import Header from '~/layout/Header'
import { getCookie } from '~/feature/cookie'
import { getMovieList, type MovieItem } from '~/methods/getMovieList'
import { getPeopleList, type PeopleListItem } from '~/methods/getPeopleList'
import type { ErrorMessage } from '~/methods/apiCall'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='bg-light dark:bg-dark_100 font-manrope has-[.opened]:overflow-hidden'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='text-dark_100 dark:text-main_100 min-h-[1200px]'>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

type ClientLoaderType = {
  mode: string
  movies: MovieItem[] | ErrorMessage
  people: PeopleListItem[] | ErrorMessage
}

export async function clientLoader(): Promise<ClientLoaderType> {
  let mode = getCookie('mode')
  if (!mode) mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ''
  if (mode === 'light') mode = ''

  const moviesResponse = await getMovieList({ value: 'popular' })
  const peopleResponse = await getPeopleList()

  const loaderData = {
    movies: 'results' in moviesResponse ? moviesResponse.results : moviesResponse,
    people: 'results' in peopleResponse ? peopleResponse.results : peopleResponse,
  }

  return {
    mode,
    ...loaderData,
  }
}

export default function App({ loaderData }: Route.ComponentProps) {
  loaderData.mode && document.documentElement.classList.add(loaderData.mode)
  const { movies, people } = loaderData

  return (
    <>
      <Header people={people} movies={movies} />
      <main className='px-[56px] peer-[:has(.opened)]:blur-md'>
        <Outlet />
      </main>
    </>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='container mx-auto p-4 pt-16'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full overflow-x-auto p-4'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
