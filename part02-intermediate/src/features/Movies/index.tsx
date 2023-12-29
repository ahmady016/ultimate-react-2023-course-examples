/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'

import Navbar from './Navbar'
import Logo from './Navbar/Logo'
import Search from './Navbar/Search'
import Results from './Navbar/Results'

import Spinner from '../../components/Spinner'
import MovieList from './MainBox/ListBox/MovieList'

import MainBox from './MainBox'
import ListBox from './MainBox/ListBox'
import Alert from '../../components/Alert'
import WatchedList from './MainBox/ListBox/WatchedList'
import WatchedSummary from './MainBox/ListBox/WatchedSummary'
import MovieDetailsBox from './MainBox/ListBox/MovieDetailsBox'

import { MovieDetails, Watched, mapMovieDetailsToWatched, useFetchMovies } from './data'

const MoviesPageContainer = styled.div`
	width:95vw;
	margin: 1rem auto;
	font-family: 'IBM Plex Mono', sans-serif;
	color: var(--color-text);

	--color-primary: #6741d9;
	--color-primary-light: #7950f2;
	--color-text: #140835;
	--color-text-white: #bdbdbd;
	--color-text-dark: #888888;
	--color-background-100: #9573fd;
	--color-background-500: #bdadee;
	--color-background-900: #4e29bd;
	--color-red: #fa5252;
	--color-red-dark: #e03131;
`
const MoviesPage: React.FC = () => {
	const [selectedMovieId, setSelectedMovieId] = React.useState('')
	const selectMovieId = React.useCallback((e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		const currentMovieId = e.currentTarget.id
		setSelectedMovieId(movieId => movieId === currentMovieId ? '' : currentMovieId)
	}, [])
	const clearMovieId = React.useCallback(() => {
		setSelectedMovieId('')
	}, [])

	const [watchedList, setWatchedList] = React.useState<Watched[]>(() => {
		const storedWatchedList = localStorage.getItem("WATCHED_MOVIES")
		return storedWatchedList ? JSON.parse(storedWatchedList) : []
	})
	React.useEffect(() => {
		localStorage.setItem("WATCHED_MOVIES", JSON.stringify(watchedList))
	}, [watchedList])
	const addToWatchedList = (movie: MovieDetails, userRating: number, userRatingAttempts: number) => {
		const newWatchedMovie = mapMovieDetailsToWatched(movie, userRating, userRatingAttempts)
		setWatchedList(list => [...list, newWatchedMovie])
	}
	const removeFromWatchedList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const currentMovieId = e.currentTarget.id
		setWatchedList(list => list.filter(movie => movie.imdbID !== currentMovieId))
	}

	const [query, setQuery] = React.useState('')
	const { isLoading, error, movies } = useFetchMovies(query, clearMovieId)

	return (
		<MoviesPageContainer>
			<Navbar>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<Results movies={movies} />
			</Navbar>
			<MainBox>
				<ListBox>
					{isLoading && <Spinner size={8} align='center' marginTop={14} />}
					{error && <Alert type='danger'>{error}</Alert>}
					{!isLoading && !error && <MovieList movies={movies} selectMovieId={selectMovieId} />}
				</ListBox>
				<ListBox>
					{!selectedMovieId
						?	<>
								<WatchedSummary watchedList={watchedList} />
								<WatchedList watchedList={watchedList} removeFromWatchedList={removeFromWatchedList} />
							</>
						: 	<MovieDetailsBox
								watchedList={watchedList}
								selectedMovieId={selectedMovieId}
								clearMovieId={clearMovieId}
								addToWatchedList={addToWatchedList}
							/>
					}
				</ListBox>
			</MainBox>
		</MoviesPageContainer>
	)
}

export default MoviesPage
