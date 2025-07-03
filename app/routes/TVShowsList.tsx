import React from 'react'
import type { Route } from './+types/TVShowsList'
import { getTVShowsList } from '~/methods/getTVShowsList'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const tvShows = await getTVShowsList(params.TVShowsListValue)
  return await tvShows
}

function TvShowsList({ loaderData }: Route.ComponentProps) {
  console.log(loaderData)
  return <> </>
}

export default TvShowsList
