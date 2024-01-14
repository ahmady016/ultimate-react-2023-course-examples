import React from 'react'
import styled from 'styled-components'
import { GrPrevious, GrNext } from 'react-icons/gr'

const QuizNavButtonsContainer = styled.nav`
    button.nav-button {
        margin: 0 0.5rem;
        padding: 0.5rem 1.25rem;
        background-color: var(--color-dark);
        font-size: 1.5rem;
        &:is([disabled]) {
            background-color: var(--color-medium);
            border: 2px solid var(--color-medium);
        }
    }
`
type QuizNavButtonsProps = {
	currentQuestionOrder: number
	totalQuestions: number
	dispatch: React.Dispatch<unknown>
}
const QuizNavButtons: React.FC<QuizNavButtonsProps> = ({ currentQuestionOrder, totalQuestions, dispatch }) => {
    const goNext = React.useCallback(() => {
        dispatch({ type: 'nextQuestion' })
    }, [dispatch])
    const goPrev = React.useCallback(() => {
        dispatch({ type: 'prevQuestion' })
    }, [dispatch])
    const finalizeQuiz = React.useCallback(() => {
        dispatch({ type: 'quizFinished' })
    }, [dispatch])

    if(currentQuestionOrder === totalQuestions)
        return (
            <QuizNavButtonsContainer>
                <button
                    type="button"
                    onClick={finalizeQuiz}
                >
                    Finish Quiz
                </button>
            </QuizNavButtonsContainer>
        )
	return (
		<QuizNavButtonsContainer>
			<button
				type="button"
                className="nav-button"
                title='Previous Question'
				onClick={goPrev}
				disabled={currentQuestionOrder === 1}
			>
				<GrPrevious />
			</button>
			<button
				type="button"
                className="nav-button"
                title='Next Question'
				onClick={goNext}
				disabled={currentQuestionOrder === totalQuestions}
			>
				<GrNext />
			</button>
		</QuizNavButtonsContainer>
	)
}

export default QuizNavButtons
