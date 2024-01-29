/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import axios, { AxiosResponse } from 'axios'

import {
	BASE_QUIZ_URL,
	Question,
	QuizState,
    QuizzesResponseWithoutQuestions,
    QuizResponse,
    QuizActionTypes,
    QuizAction,
	getTotalQuizPoints,
	getTotalQuizQuestions,
	getCurrentQuestion,
	initialQuizState,
	quizReducer,
} from './state'

type QuizContextValue = QuizState & {
    totalQuizPoints: number
    totalQuizQuestions: number
    currentQuizQuestion: Question | undefined
    currentQuestionHasAnswer: boolean
    currentQuestionAnswer: number
	selectedQuizId: string
	changeQuizId: (e: React.ChangeEvent<HTMLSelectElement>) => void
	dispatch: React.Dispatch<QuizAction>
}
const initialQuizContextValue: QuizContextValue = {
    ...initialQuizState,
    totalQuizPoints: 0,
    totalQuizQuestions: 0,
    currentQuizQuestion: undefined,
    currentQuestionHasAnswer: false,
    currentQuestionAnswer: -1,
    selectedQuizId: '',
    changeQuizId: () => {},
    dispatch: () => {},
}
const QuizContext = React.createContext<QuizContextValue>(initialQuizContextValue)

const QuizContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [quizState, dispatch] = React.useReducer(quizReducer, initialQuizState)

    const totalQuizPoints = React.useMemo(() =>
        quizState.quiz && quizState.quiz.questions
            ? getTotalQuizPoints(quizState.quiz.questions)
            : 0
    , [quizState])
    const totalQuizQuestions = React.useMemo(() =>
        quizState.quiz && quizState.quiz.questions
            ? getTotalQuizQuestions(quizState.quiz.questions)
            : 0
    , [quizState])
    const currentQuizQuestion = React.useMemo(() =>
        quizState.quiz && quizState.quiz.questions && quizState.currentQuestionOrder > 0
            ? getCurrentQuestion(quizState.quiz.questions, quizState.currentQuestionOrder)
            : undefined
    , [quizState])
    const currentQuestionHasAnswer = React.useMemo(() =>
        quizState.quiz && quizState.answers && quizState.currentQuestionOrder > 0
            ? !!quizState.answers[quizState.currentQuestionOrder]
            : false
    , [quizState])
    const currentQuestionAnswer = React.useMemo(() =>
        quizState.answers && quizState.currentQuestionOrder > 0
            ? quizState.answers[quizState.currentQuestionOrder]
            : -1
    , [quizState])

    const [selectedQuizId, setSelectedQuizId] = React.useState('')
	const changeQuizId = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setSelectedQuizId(e.target.value), [])

    const getQuizzes = React.useCallback(async () => {
        dispatch({ type: QuizActionTypes.QUIZZES_REQUESTED })
        try {
            const { data } = await axios.get<null, AxiosResponse<QuizzesResponseWithoutQuestions>>(`${BASE_QUIZ_URL}/quizzes`)
            dispatch({ type: QuizActionTypes.QUIZZES_RECEIVED, payload: data })
        } catch (error) {
            dispatch({ type: QuizActionTypes.QUIZZES_ERROR, payload: (error as Error).message })
        }
    }, [])
	React.useEffect(() => void getQuizzes(), [])

    const getQuiz = React.useCallback(async () => {
        dispatch({ type: QuizActionTypes.QUIZ_REQUESTED })
        try {
            const { data } = await axios.get<null, AxiosResponse<QuizResponse>>(`${BASE_QUIZ_URL}/quizzes/${selectedQuizId}?_embed=questions`)
            dispatch({ type: QuizActionTypes.QUIZ_RECEIVED, payload: data })
        } catch (error) {
            dispatch({ type: QuizActionTypes.QUIZ_ERROR, payload: (error as Error).message })
        }
    }, [selectedQuizId])
	React.useEffect(() => {
		if (selectedQuizId) getQuiz()
	}, [selectedQuizId])

	return (
		<QuizContext.Provider
			value={{
				...quizState,
                totalQuizPoints,
                totalQuizQuestions,
                currentQuizQuestion,
                currentQuestionHasAnswer,
                currentQuestionAnswer,
				selectedQuizId,
				changeQuizId,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	)
}

function useQuizContext() {
	const context = React.useContext(QuizContext)
	if (context === undefined)
		throw new Error('QuizContext was used outside of the QuizContextProvider')
	return context
}

export { QuizContextProvider, useQuizContext }
