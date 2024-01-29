import React from 'react'
import styled from 'styled-components'

import { QuizActionTypes } from '../state'
import { useQuizContext } from '../QuizContext'

const QuizStartScreenContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const QuizStartScreen: React.FC = () => {
	const { quiz, totalQuizQuestions, dispatch } = useQuizContext()
	const startQuiz = React.useCallback(() => {
		dispatch({ type: QuizActionTypes.QUIZ_STARTED })
	}, [dispatch])

	return (
		<QuizStartScreenContainer>
			<h3>Welcome to The {quiz?.title}!</h3>
			<h4>{totalQuizQuestions} questions</h4>
			<button onClick={startQuiz}>Let's start</button>
		</QuizStartScreenContainer>
	)
}

export default QuizStartScreen
