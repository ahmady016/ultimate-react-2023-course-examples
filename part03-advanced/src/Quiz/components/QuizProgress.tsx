import React from 'react'
import styled from 'styled-components'
import { useQuizContext } from '../QuizContext'

type QuizProgressContainerProps = {
	$score: number
	$totalPoints: number
	$hasAnswer: boolean
}
const QuizProgressContainer = styled.header<QuizProgressContainerProps>`
	width: 100%;
	color: var(--color-medium);
	font-size: 1.5rem;
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;
	gap: 1rem;
	::-webkit-progress-bar {
		background-color: var(--color-medium);
		border-radius: 100px;
	}
	::-webkit-progress-value {
		background-color: var(--color-theme);
		border-radius: 100px;
	}
	progress {
		width: 100%;
		height: 12px;
		grid-column: 1 / -1;
		-webkit-appearance: none;
	}
	p {
		color: ${({ $totalPoints, $score, $hasAnswer }) =>
			$hasAnswer
				? $score === $totalPoints
					? 'var(--color-theme)'
					: 'var(--color-darkest)'
				: 'var(--color-semi-dark)'};
	}
`
const QuizProgress: React.FC = () => {
	const {
		totalQuizPoints,
		totalQuizQuestions,
		currentQuestionOrder,
		currentQuestionHasAnswer,
		score,
	} = useQuizContext()

	return (
		<QuizProgressContainer
			$score={score}
			$totalPoints={totalQuizPoints}
			$hasAnswer={currentQuestionHasAnswer}
		>
			<progress
				max={totalQuizQuestions}
				value={
					currentQuestionHasAnswer
						? currentQuestionOrder
						: currentQuestionOrder - 1
				}
			/>
			<p>
				Question <strong>{currentQuestionOrder}</strong>/{totalQuizQuestions}
			</p>
			<p>
				Score <strong>{score}</strong>/{totalQuizPoints}
			</p>
		</QuizProgressContainer>
	)
}

export default QuizProgress
