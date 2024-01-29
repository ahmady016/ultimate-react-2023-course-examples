import React from 'react'
import styled from 'styled-components'
import { MdEmojiEvents, MdEmojiObjects } from 'react-icons/md'
import { BsEmojiNeutralFill, BsFillEmojiGrimaceFill, BsFillEmojiTearFill } from 'react-icons/bs'

import { QuizActionTypes } from '../state'
import { useQuizContext } from '../QuizContext'

const QuizFinishScreenContainer = styled.div`
	width: 60%;
	margin: 1rem 0 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	p {
		text-align: center;
		font-weight: 600;
	}
	p:first-child {
        padding: 2rem;
		border-radius: 100px;
		background-color: var(--color-theme);
		color: var(--color-light);
		font-size: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
		span {
			margin-right: 0.25rem;
		}
	}
	p:last-child {
		color: var(--color-dark);
		font-size: 1.25rem;
	}
`
const QuizFinishScreen: React.FC = () => {
	const { dispatch, score, totalQuizPoints, highScore } = useQuizContext()
	const percentage = (score / totalQuizPoints) * 100
	let icon
	if (percentage === 100) icon = <MdEmojiEvents />
	if (percentage >= 80 && percentage < 100) icon = <MdEmojiObjects />
	if (percentage >= 50 && percentage < 80) icon = <BsEmojiNeutralFill />
	if (percentage >= 0 && percentage < 50) icon = <BsFillEmojiGrimaceFill />
	if (percentage === 0) icon = <BsFillEmojiTearFill />

	const restartQuiz = React.useCallback(() => dispatch({ type: QuizActionTypes.QUIZ_RESTARTED }), [dispatch])
	return (
		<QuizFinishScreenContainer>
			<p>
				<span>{icon}</span>
				<span>
					You scored <strong>{score}</strong> out of {totalQuizPoints} (
					{Math.ceil(percentage)}%)
				</span>
			</p>
			<p>(High Score: {highScore} points)</p>
			<button onClick={restartQuiz}>Restart quiz</button>
		</QuizFinishScreenContainer>
	)
}

export default QuizFinishScreen
