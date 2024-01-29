import React from 'react'
import styled from 'styled-components'

import { useQuizContext } from '../QuizContext'
import { QuizActionTypes, secondsToTimeFormat } from '../state'

const QuizTimerContainer = styled.div`
    padding: 0.25rem 1rem;
    border-radius: 50px;
    border: 2px solid var(--color-semi-dark);
    background-color: var(--color-medium);
    color: var(--color-darkest);
    font-size: 1.25rem;
`
const QuizTimer: React.FC = () => {
	const { secondsRemaining, dispatch } = useQuizContext()
	const timer = secondsToTimeFormat(secondsRemaining)
	React.useEffect(
		function () {
			const id = setInterval(() => dispatch({ type: QuizActionTypes.TICK }), 1000)
			return () => clearInterval(id)
		},
		[dispatch]
	)

	return <QuizTimerContainer>{timer}</QuizTimerContainer>
}

export default QuizTimer
