/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const OMDB_API_KEY = '1c6f2b52'
const BASE_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

export const average = (list: number[]) =>
	list.reduce((avg, cur) => avg + cur / list.length, 0).toFixed(2)
export const total = (list: number[]) =>
	list.reduce((avg, cur) => avg + cur, 0).toFixed(2)

export type Movie = {
	imdbID: string
	title: string
	year: string
	poster: string
	type: string
}
export type MovieDetails = {
	imdbID: string
	title: string
	year: string
	poster: string
	runtime: string
	released: string
	imdbRating: number
	imdbVotes: number
	type: string
	genre: string
	writer: string
	director: string
	actors: string
	plot: string
	country: string
	awards: string
}
export type Watched = {
	imdbID: string
	title: string
	year: string
	poster: string
	runtime: string
	imdbRating: number
	userRating: number
}

export const initialMovies: Movie[] = [
	{
		imdbID: 'tt1375666',
		title: 'Inception',
		year: '2010',
		type: "movie",
		poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt0133093',
		title: 'The Matrix',
		year: '1999',
		type: "movie",
		poster:
			'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt6751668',
		title: 'Parasite',
		year: '2019',
		type: "movie",
		poster:
			'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
	},
]
export const initialWatched: Watched[] = [
	{
		imdbID: 'tt1375666',
		title: 'Inception',
		year: '2010',
		poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
		runtime: "148 min",
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: 'tt0088763',
		title: 'Back to the Future',
		year: '1985',
		poster:
			'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		runtime: "116 min",
		imdbRating: 8.5,
		userRating: 9,
	},
]

type SearchMoviesResponse = {
	imdbID: string
	Title: string
	Year: string
	Type: string
	Poster: string
}
function mapMovies(movies: SearchMoviesResponse[]) {
	return movies.map(movie => ({
		imdbID: movie.imdbID,
		title: movie.Title,
		year: movie.Year,
		poster: movie.Poster,
		type: movie.Type,
	})) as Movie[]
}
let cachedMovies: Record<string, Omit<Movie, 'imdbID'>> = {}
function setCachedMovies(mappedMovies: Movie[]) {
	cachedMovies = {}
	mappedMovies.reduce((movies, movie) => {
		const { imdbID, ...movieWithoutId } = movie
		movies[imdbID] = movieWithoutId
		return movies
	}, cachedMovies)
}
export function useFetchMovies(query: string, clearMovieId: () => void) {
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState('')
	const [movies, setMovies] = React.useState<Movie[]>([])

	const abortController = new AbortController()
	async function fetchMovies() {
		setIsLoading(true)
		setError('')
		try {
			const res = await fetch(`${BASE_URL}&s=${query}`, { signal: abortController.signal })
			if (!res.ok) throw new Error('Something went wrong with fetching movies')
			const data = await res.json()
			if (data.Response === 'False') throw new Error('Movie(s) Not Found')
			const mappedMovies = mapMovies(data.Search as SearchMoviesResponse[])
			setCachedMovies(mappedMovies)
			setMovies(mappedMovies)
			setError('')
		} catch (error: any) {
			if(error.name !== 'AbortError') {
				console.log(error.message)
				setError(error.message)
			}
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
		if (query.length >= 3) {
			clearMovieId()
			fetchMovies()
		} else {
			setIsLoading(false)
			setError('')
		}
		return () => { abortController.abort() }
	}, [query])

	return {
		isLoading,
		error,
		movies
	}
}

type MovieRating = {
	Source: string
	Value: string
}
type MovieDetailsResponse = {
	Title: string
	Year: string
	Rated: string
	Released: string
	Runtime: string
	Genre: string
	Director: string
	Writer: string
	Actors: string
	Plot: string
	Language: string
	Country: string
	Awards: string
	Poster: string
	Ratings: MovieRating[]
	Metascore: string
	imdbRating: string
	imdbVotes: string
	imdbID: string
	Type: string
	DVD: string
	BoxOffice: string
	Production: string
	Website: string
	Response: string
}
function mapMovieDetails(movie: MovieDetailsResponse) {
	return {
		imdbID: movie.imdbID,
		title: movie.Title,
		year: movie.Year,
		poster: movie.Poster,
		runtime: movie.Runtime,
		released: movie.Released,
		imdbRating: Number(movie.imdbRating),
		imdbVotes: Number(movie.imdbVotes),
		type: movie.Type,
		genre: movie.Genre,
		writer: movie.Writer,
		director: movie.Director,
		actors: movie.Actors,
		plot: movie.Plot,
		country: movie.Country,
		awards: movie.Awards
	} as MovieDetails
}
export function useFetchMovieDetails(selectedMovieId: string) {
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState('')
	const [movie, setMovie] = React.useState<MovieDetails | null>(null)

	async function fetchMovieDetails() {
		setIsLoading(true)
		setError('')
		try {
			const res = await fetch(`${BASE_URL}&i=${selectedMovieId}`)
			if (!res.ok) throw new Error('Something went wrong with fetching movies')
			const data = await res.json()
			if (data.Response === 'False') throw new Error('Movie Not Found')
			setMovie(mapMovieDetails(data as MovieDetailsResponse))
		} catch (error: any) {
			console.log(error.message)
			setError(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
		if (!selectedMovieId) {
			setIsLoading(false)
			setError('')
		} else {
			fetchMovieDetails()
		}
	}, [selectedMovieId])

	return {
		isLoading,
		error,
		movie
	}
}

export function mapMovieDetailsToWatched(movie: MovieDetails, userRating: number) {
	return {
		imdbID: movie.imdbID,
		title: movie.title,
		year: movie.year,
		poster: movie.poster,
		runtime: movie.runtime,
		imdbRating: movie.imdbRating,
		userRating,
	} as Watched
}
