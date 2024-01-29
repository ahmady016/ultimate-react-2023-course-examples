/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styled from 'styled-components'

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
import { useQuizContext } from './QuizContext'

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
	const { quizStatus, quizError, quiz } = useQuizContext()

	return (
		<QuizPageContainer>
			<QuizzesPicker />
			{quizStatus === 'pending' && <p>Please Choose a Quiz from the list ...</p>}
			{quizStatus === 'loading' && <QuizLoader />}
			{quizStatus === 'error' && <QuizError>{quizError}</QuizError>}
			{quizStatus === 'ready' && !quiz && <p>No Quiz Found</p>}
			{quiz && <QuizHeader />}
			{quizStatus === 'ready' && quiz && quiz.questions && <QuizStartScreen />}
			{quizStatus === 'active' && quiz && quiz.questions && (
				<main>
					<QuizProgress />
					<QuizQuestion />
					<QuizFooter>
						<QuizTimer />
						<QuizNavButtons />
					</QuizFooter>
				</main>
			)}
			{quizStatus === 'finished' && quiz && <QuizFinishScreen />}
		</QuizPageContainer>
	)
}

export default QuizPage
