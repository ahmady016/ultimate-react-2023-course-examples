import React from 'react'
import styled from 'styled-components'

const QuizStartScreenContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
type QuizStartScreen = {
    title: string
	questionsCount: number
	dispatch: React.Dispatch<unknown>
}
const QuizStartScreen: React.FC<QuizStartScreen> = ({ title, questionsCount, dispatch, }) => {
	const startQuiz = React.useCallback(() => {
		dispatch({ type: 'quizStarted' })
	}, [dispatch])
	return (
		<QuizStartScreenContainer>
			<h3>Welcome to The {title}!</h3>
			<h4>{questionsCount} questions</h4>
			<button onClick={startQuiz}>Let's start</button>
		</QuizStartScreenContainer>
	)
}

export default QuizStartScreen
