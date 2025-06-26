import React from 'react'
import type { Route } from './+types/movieList'
import { getMovieLists } from '~/methods/getMovieLists'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const movieListValue = params.movieListValue
  const films = getMovieLists(movieListValue)
  return await films
}

function MovieList({ loaderData }: Route.ComponentProps) {
  console.log(loaderData)
  return <div></div>
}

export default MovieList
