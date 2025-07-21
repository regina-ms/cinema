import React from 'react'
import type { Route } from './+types/movieList'
import { getMovieList } from '~/methods/getMovieList'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const movieListValue = params.movieListValue
  const films = getMovieList(movieListValue)
  return await films
}

function MovieList({ loaderData }: Route.ComponentProps) {
  console.log(loaderData)
  return <div></div>
}

export default MovieList
