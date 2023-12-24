import React from 'react'
import { GrStar, GrStarOutline } from 'react-icons/gr'
import { FaHashtag } from 'react-icons/fa6'
import { IoTimerOutline } from 'react-icons/io5'
import styled from 'styled-components'

import { Watched, average, total } from '../../data'

const WatchedSummaryContainer = styled.div`
	padding: 2rem 3rem 1.75rem 3rem;
	border-radius: 0.75rem;
	background-color: var(--color-background-100);
	box-shadow: 0 1.2rem 2.4rem rgba(86, 27, 106, 0.25);
	h2 {
		margin-bottom: 0.6rem;
		font-size: 1.25rem;
		font-weight: 500;
		text-transform: uppercase;
	}
	div {
		display: flex;
		align-items: center;
		gap: 1.75rem;
		p {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 1.1rem;
			font-weight: 600;
		}
	}
`
const WatchedSummary: React.FC<{ watchedList: Watched[] }> = ({ watchedList }) => {
	const avgImdbRating = average(watchedList.map(movie => movie.imdbRating))
	const avgUserRating = average(watchedList.map(movie => movie.userRating))
	const avgRuntime = total(watchedList.map(movie => Number(movie.runtime.substring(0, movie.runtime.indexOf(' ')))))

	return (
		<WatchedSummaryContainer>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span><FaHashtag /></span>
					<span>{watchedList.length} movies</span>
				</p>
				<p>
					<span title="Total Watched Time"><IoTimerOutline /></span>
					<span>{avgRuntime} min</span>
				</p>
				<p>
					<span title="IMDB Rating Average"><GrStar /></span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span title="User Rating Average"><GrStarOutline /></span>
					<span>{avgUserRating}</span>
				</p>
			</div>
		</WatchedSummaryContainer>
	)
}

export default WatchedSummary
