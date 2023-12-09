import React from 'react'
import styled from 'styled-components'

import { Watched, average } from '../../data'

const WatchedSummaryContainer = styled.div`
	padding: 2.2rem 3.2rem 1.8rem 3.2rem;
	border-radius: 0.9rem;
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
		gap: 2.4rem;
		p {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			font-size: 1rem;
			font-weight: 600;
		}
	}
`
const WatchedSummary: React.FC<{ watchedList: Watched[] }> = ({ watchedList }) => {
	const avgImdbRating = average(watchedList.map((movie) => movie.imdbRating))
	const avgUserRating = average(watchedList.map((movie) => movie.userRating))
	const avgRuntime = average(watchedList.map((movie) => movie.runtime))

	return (
		<WatchedSummaryContainer>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watchedList.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</WatchedSummaryContainer>
	)
}

export default WatchedSummary
