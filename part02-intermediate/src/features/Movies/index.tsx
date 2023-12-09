/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'

import Navbar from './Navbar'
import Logo from './Navbar/Logo'
import Search from './Navbar/Search'
import Results from './Navbar/Results'

import MainBox from './MainBox'
import ListBox from './MainBox/ListBox'
import MovieList from './MainBox/ListBox/MovieList'
import WatchedList from './MainBox/ListBox/WatchedList'
import WatchedSummary from './MainBox/ListBox/WatchedSummary'

import { initialMovies, initialWatched } from './data'

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
	const [movies, _] = React.useState(initialMovies)
	const [watchedList, __] = React.useState(initialWatched)

	return (
		<MoviesPageContainer>
			<Navbar>
				<Logo />
				<Search />
				<Results movies={movies} />
			</Navbar>
			<MainBox>
				<ListBox>
					<MovieList movies={movies} />
				</ListBox>
				<ListBox>
					<WatchedSummary watchedList={watchedList} />
					<WatchedList watchedList={watchedList} />
				</ListBox>
			</MainBox>
		</MoviesPageContainer>
	)
}

export default MoviesPage
