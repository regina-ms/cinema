import type { Route } from './+types/home'
import { userPrefs } from '~/features/cookies'
import { Form, Link, redirect } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('Cookie')
  console.log({ loader: cookieHeader })
  const cookie = (await userPrefs.parse(cookieHeader)) || {}
  console.log({ loader: cookie })
  return { showBanner: cookie.showBanner }
}

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('Cookie')
  console.log({ action: cookieHeader })
  const cookie = (await userPrefs.parse(cookieHeader)) || {}
  console.log({ action: cookie })
  const bodyParams = await request.formData()

  if (bodyParams.get('bannerVisibility') === 'hidden') {
    cookie.showBanner = false
  }

  return redirect('/', {
    headers: {
      'Set-Cookie': await userPrefs.serialize(cookie),
    },
  })
}

export default function Home({ loaderData }: Route.ComponentProps) {
  console.log(loaderData)
  return (
    <div>
      {loaderData.showBanner ? (
        <div>
          <Link to='/sale'>Don't miss our sale!</Link>
          <Form method='post'>
            <input type='hidden' name='bannerVisibility' value='hidden' />
            <button type='submit'>Hide</button>
          </Form>
        </div>
      ) : null}
      <h1>Welcome!</h1>
    </div>
  )
}
