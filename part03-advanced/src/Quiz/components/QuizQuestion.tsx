import React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

import { Question } from '../state'

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
type QuizQuestionProps = {
	question: Question
	answer: number
	dispatch: React.Dispatch<unknown>
}
const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, answer, dispatch }) => {
	const { title, answers, correctAnswer } = question
	const hasAnswer = answer > 0
	const getButtonClasses = (currentOption: number) => {
		return hasAnswer
			? classNames({
				answered: currentOption === answer,
				correct: currentOption === correctAnswer,
				wrong: currentOption !== correctAnswer,
			})
			: classNames({})
	}
	const setAnswer = React.useCallback((currentOption: number) => () => {
		dispatch({ type: 'answerReceived', payload: currentOption })
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
