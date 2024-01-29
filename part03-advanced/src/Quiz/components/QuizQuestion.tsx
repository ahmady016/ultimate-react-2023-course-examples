import React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

import { QuizActionTypes } from '../state'
import { useQuizContext } from '../QuizContext'

const QuizQuestionContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	& > div {
		width: 100%;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		button {
			align-self: flex-start;
			font-size: 1rem;
			&.answered {
				transform: translateX(2rem);
			}
			&.correct {
				border: 2px solid var(--color-theme);
				background-color: var(--color-theme);
				color: var(--color-lightest);
			}
			&.wrong {
				border: 2px solid var(--color-accent);
				background-color: var(--color-accent);
				color: var(--color-lightest);
			}
		}
	}
`
const QuizQuestion: React.FC = () => {
	const { currentQuizQuestion, currentQuestionAnswer, dispatch } = useQuizContext()

	const { title, answers, correctAnswer } = currentQuizQuestion!
	const hasAnswer = currentQuestionAnswer > 0
	const getButtonClasses = (currentOption: number) => {
		return hasAnswer
			? classNames({
				answered: currentOption === currentQuestionAnswer,
				correct: currentOption === correctAnswer,
				wrong: currentOption !== correctAnswer,
			})
			: classNames({})
	}
	const setAnswer = React.useCallback((currentOption: number) => () => {
		dispatch({ type: QuizActionTypes.ANSWER_RECEIVED, payload: currentOption })
	}, [dispatch])

	return (
		<QuizQuestionContainer>
			<h4>{title}</h4>
			<div>
				{Object.entries(answers).map(([order, option]) => (
					<button
						key={option}
						type="button"
						className={getButtonClasses(Number(order))}
						onClick={setAnswer(Number(order))}
						disabled={hasAnswer}
					>
						{option}
					</button>
				))}
			</div>
		</QuizQuestionContainer>
	)
}

export default QuizQuestion
