import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
    index('routes/home.tsx'),
    route('movies/:movieListValue', 'routes/movieList.tsx'),
    route('TVShows/:TVShowsListValue', 'routes/TVShowsList.tsx'),
    route('person/:personId', 'routes/person.tsx'),
    route('movie/:movieId', 'routes/movie.tsx')

] satisfies RouteConfig
