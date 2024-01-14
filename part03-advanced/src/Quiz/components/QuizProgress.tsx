import React from 'react'
import styled from 'styled-components'

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
type QuizProgressProps = {
	questionsCount: number
	currentQuestionOrder: number
	score: number
	totalPoints: number
	hasAnswer: boolean
}
const QuizProgress: React.FC<QuizProgressProps> = ({
	questionsCount,
	currentQuestionOrder,
	score,
	totalPoints,
	hasAnswer,
}) => {
	return (
		<QuizProgressContainer
			$score={score}
			$totalPoints={totalPoints}
			$hasAnswer={hasAnswer}
		>
			<progress
				max={questionsCount}
				value={hasAnswer ? currentQuestionOrder : currentQuestionOrder - 1}
			/>
			<p>
				Question <strong>{currentQuestionOrder}</strong>/{questionsCount}
			</p>
			<p>
				Score <strong>{score}</strong>/{totalPoints}
			</p>
		</QuizProgressContainer>
	)
}

export default QuizProgress
