import React from 'react'
import styled from 'styled-components'

import { secondsToTimeFormat } from '../state'

const QuizTimerContainer = styled.div`
    padding: 0.25rem 1rem;
    border-radius: 50px;
    border: 2px solid var(--color-semi-dark);
    background-color: var(--color-medium);
    color: var(--color-darkest);
    font-size: 1.25rem;
`
type QuizTimerProps = {
	seconds: number
	dispatch: React.Dispatch<unknown>
}
const QuizTimer: React.FC<QuizTimerProps> = ({ seconds, dispatch }) => {
	const timer = secondsToTimeFormat(seconds)
	React.useEffect(
		function () {
			const id = setInterval(() => dispatch({ type: 'tick' }), 1000)
			return () => clearInterval(id)
		},
		[dispatch]
	)

	return <QuizTimerContainer>{timer}</QuizTimerContainer>
}

export default QuizTimer
