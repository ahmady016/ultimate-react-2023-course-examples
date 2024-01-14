/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'

import {
	BASE_QUIZ_URL,
	getCurrentQuestion,
	getTotalQuizPoints,
	getTotalQuizQuestions,
	initialQuizState,
	quizReducer,
} from './state'

import QuizzesPicker from './components/QuizzesPicker'
import QuizLoader from './components/QuizLoader'
import QuizError from './components/QuizError'
import QuizHeader from './components/QuizHeader'
import QuizStartScreen from './components/QuizStartScreen'
import QuizProgress from './components/QuizProgress'
import QuizQuestion from './components/QuizQuestion'
import QuizFooter from './components/QuizFooter'
import QuizTimer from './components/QuizTimer'
import QuizNavButtons from './components/QuizNavButtons'
import QuizFinishScreen from './components/QuizFinishScreen'

const QuizPageContainer = styled.div`
	--color-semi-dark: #555;
	--color-dark: #3c3c3c;
	--color-darkest: #303030;
	--color-medium: #a7a7a7;
	--color-light: #ccc;
	--color-lightest: #eee;
    --color-error: #a40021;
	--color-theme: #1d7525;
	--color-accent: #771613;

	min-height: 80vh;
	padding: 2rem 0;
	background-color: var(--color-light);
	color: var(--color-darkest);
	font-family: 'IBM Plex Mono', sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	main {
		width: 70%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
    h3, h4 {
        margin-bottom: 2rem;
        font-weight: 600;
    }
    h3 {
        font-size: 2rem;
    }
    h4 {
        font-size: 1.25rem;
    }
    p {
        font-size: 1.25rem;
    }
    button {
        cursor: pointer;
        align-self: flex-end;
        padding: 1rem 2rem;
        border-radius: 50px;
        border: 2px solid var(--color-dark);
        background-color: var(--color-dark);
        color: var(--color-lightest);
        font-size: 1.25rem;
        transition: 0.3s;
        &:not([disabled]):hover {
            background-color: var(--color-darkest);
        }
        &:is([disabled]):hover {
            cursor: not-allowed;
        }
    }
`
const QuizPage: React.FC = () => {
	const [quizState, dispatch] = React.useReducer(quizReducer, initialQuizState)

	const [selectedQuizId, setSelectedQuizId] = React.useState('')
	const changeQuizId = React.useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedQuizId(e.target.value)
	, [])

	React.useEffect(() => {
		dispatch({ type: 'quizzesRequested' })
		fetch(`${BASE_QUIZ_URL}/quizzes`)
			.then((res) => res.json())
			.then((data) => dispatch({ type: 'quizzesReceived', payload: data }) )
			.catch((error) => dispatch({ type: 'quizError', payload: error.message }))
	}, [])
	React.useEffect(() => {
		if(selectedQuizId) {
			dispatch({ type: 'quizRequested' })
			fetch(`${BASE_QUIZ_URL}/quizzes/${selectedQuizId}?_embed=questions`)
				.then((res) => res.json())
				.then((data) => dispatch({ type: 'quizReceived', payload: data }))
				.catch((error) => dispatch({ type: 'quizError', payload: error.message }))
		}
	}, [selectedQuizId])

	return (
		<QuizPageContainer>
			<QuizzesPicker
				selectedQuizId={selectedQuizId}
				changeQuizId={changeQuizId}
				quizState={quizState}
			/>
			{quizState.quizStatus === 'pending' && <p>Please Choose a Quiz from the list ...</p>}
			{quizState.quizStatus === 'loading' && <QuizLoader />}
			{quizState.quizStatus === 'error' && <QuizError>{quizState.quizError}</QuizError>}
			{quizState.quizStatus === 'ready' && !quizState.quiz && <p>No Quiz Found</p>}
			{quizState.quiz && (
				<QuizHeader
					title={quizState.quiz.title}
					description={quizState.quiz.description}
				/>
			)}
			{quizState.quizStatus === 'ready' && quizState.quiz && quizState.quiz.questions && (
				<QuizStartScreen
                    title={quizState.quiz.title}
					questionsCount={getTotalQuizQuestions(quizState.quiz.questions)}
					dispatch={dispatch}
				/>
			)}
			{quizState.quizStatus === 'active' && quizState.quiz && quizState.quiz.questions && (
				<main>
					<QuizProgress
						currentQuestionOrder={quizState.currentQuestionOrder}
						questionsCount={getTotalQuizQuestions(quizState.quiz.questions)}
						totalPoints={getTotalQuizPoints(quizState.quiz.questions)}
						score={quizState.score}
						hasAnswer={quizState.answers
							? !!quizState.answers[quizState.currentQuestionOrder]
							: false
						}
					/>
					<QuizQuestion
						question={getCurrentQuestion(quizState.quiz.questions, quizState.currentQuestionOrder)}
						answer={quizState.answers
							? quizState.answers[quizState.currentQuestionOrder]
							: -1
						}
						dispatch={dispatch}
					/>
					<QuizFooter>
						<QuizTimer
							seconds={quizState.secondsRemaining}
							dispatch={dispatch}
						/>
						<QuizNavButtons
							currentQuestionOrder={quizState.currentQuestionOrder}
							totalQuestions={getTotalQuizQuestions(quizState.quiz.questions)}
							dispatch={dispatch}
						/>
					</QuizFooter>
				</main>
			)}
			{quizState.quizStatus === 'finished' && quizState.quiz && (
				<QuizFinishScreen
					totalPoints={getTotalQuizPoints(quizState.quiz.questions)}
					score={quizState.score}
					highScore={quizState.highScore}
					dispatch={dispatch}
				/>
			)}
		</QuizPageContainer>
	)
}

export default QuizPage
