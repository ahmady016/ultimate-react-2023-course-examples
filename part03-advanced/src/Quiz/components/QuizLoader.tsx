import React from 'react'
import styled from 'styled-components'

const QuizLoaderContainer = styled.div`
	margin-top: 4rem;
	color: var(--color-medium);
	font-size: 1.25rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
	& > div {
		width: 50px;
		height: 24px;
		background: radial-gradient(circle closest-side, currentColor 90%, #0000) 0%
				50%,
			radial-gradient(circle closest-side, currentColor 90%, #0000) 50% 50%,
			radial-gradient(circle closest-side, currentColor 90%, #0000) 100% 50%;
		background-size: calc(100% / 3) 12px;
		background-repeat: no-repeat;
		animation: loader 1s infinite linear;
	}
	@keyframes loader {
		20% {
			background-position: 0% 0%, 50% 50%, 100% 50%;
		}
		40% {
			background-position: 0% 100%, 50% 0%, 100% 50%;
		}
		60% {
			background-position: 0% 50%, 50% 100%, 100% 0%;
		}
		80% {
			background-position: 0% 50%, 50% 50%, 100% 100%;
		}
	}
`
const QuizLoader: React.FC = () => {
	return (
		<QuizLoaderContainer>
			<div></div>
			<p>Loading Quiz ...</p>
		</QuizLoaderContainer>
	)
}

export default QuizLoader
