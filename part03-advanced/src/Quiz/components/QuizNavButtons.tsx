import React from 'react'
import styled from 'styled-components'
import { GrPrevious, GrNext } from 'react-icons/gr'

import { QuizActionTypes } from '../state'
import { useQuizContext } from '../QuizContext'

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
const QuizNavButtons: React.FC = () => {
    const { currentQuestionOrder, totalQuizQuestions, dispatch } = useQuizContext()

    const goNext = React.useCallback(() => {
        dispatch({ type: QuizActionTypes.NEXT_QUESTION })
    }, [dispatch])
    const goPrev = React.useCallback(() => {
        dispatch({ type: QuizActionTypes.PREV_QUESTION })
    }, [dispatch])
    const finalizeQuiz = React.useCallback(() => {
        dispatch({ type: QuizActionTypes.QUIZ_FINISHED })
    }, [dispatch])

    if(currentQuestionOrder === totalQuizQuestions)
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
				disabled={currentQuestionOrder === totalQuizQuestions}
			>
				<GrNext />
			</button>
		</QuizNavButtonsContainer>
	)
}

export default QuizNavButtons
