/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */

export type Question = {
	id: string
	order: number
	title: string
	answers: Record<string, string>
	correctAnswer: number
	points: number
	quizId: string
}
export type QuizResponse = {
	id: string
	order: number
	title: string
	description: string
	questions: Question[]
}
export type Quiz = {
	id: string
	order: number
	title: string
	description: string
	questions: Record<number, Question>
}
export type QuizWithoutQuestions = Omit<Quiz, 'questions'>
export type QuizzesResponseWithoutQuestions = QuizWithoutQuestions[]
export type QuizState = {
	quizzesLoading: boolean
	quizzesError: string
	quizzes: Record<string, QuizWithoutQuestions> | undefined
	quizStatus: 'pending' | 'loading' | 'error' | 'ready' | 'active' | 'finished'
	quizError: string
	quiz: Quiz | undefined
	currentQuestionOrder: number
	answers: Record<number, number> | undefined
	score: number
	highScore: number
	secondsRemaining: number
}

export function mapQuizzesResponseToQuizzes(quizzes: QuizzesResponseWithoutQuestions): Record<string, QuizWithoutQuestions> | undefined {
	return quizzes.length > 0
		? quizzes.reduce((acc, quiz) => {
				acc[quiz.id] = quiz
				return acc
			}, {} as Record<string, QuizWithoutQuestions>)
		: undefined
}
export function getTotalQuizQuestions(questions: Record<number, Question>) {
	return Object.keys(questions).length
}
export function getTotalQuizPoints(questions: Record<number, Question>) {
	return Object.entries(questions).reduce(
		(prev, [_, value]) => prev + value.points,
		0
	)
}
export function getTotalQuizSeconds(questions: Record<number, Question>) {
	return Object.keys(questions).length * SECONDS_PER_QUESTION
}
export function getCurrentQuestion(
	questions: Record<number, Question>,
	order: number
) {
	return questions[order]
}
export function mapQuizResponseToQuiz(quiz: QuizResponse): Quiz | undefined {
	return Object.keys(quiz).length > 0
		? {
			...quiz,
			questions: quiz.questions.reduce((acc, question) => {
				acc[question.order] = question
				return acc
			}, {} as Record<number, Question>),
		}
		: undefined
}
export function secondsToTimeFormat(seconds: number) {
	const mins = Math.floor(seconds / 60)
	const sec = seconds % 60
	return `${mins < 10 ? '0' : ''}${mins}:${sec < 10 ? '0' : ''}${sec}`
}

export enum QuizActionTypes {
	QUIZZES_REQUESTED = 'quizzesRequested',
	QUIZZES_ERROR = 'quizzesError',
	QUIZZES_RECEIVED = 'quizzesReceived',
	QUIZ_REQUESTED = 'quizRequested',
	QUIZ_ERROR = 'quizError',
	QUIZ_RECEIVED = 'quizReceived',
	QUIZ_STARTED = 'quizStarted',
	TICK = 'tick',
	ANSWER_RECEIVED = 'answerReceived',
	NEXT_QUESTION = 'nextQuestion',
	PREV_QUESTION = 'prevQuestion',
	QUIZ_FINISHED = 'quizFinished',
	QUIZ_RESTARTED = 'quizRestarted',
}
export type QuizWithoutPayloadAction = {
	type: QuizActionTypes.QUIZZES_REQUESTED |
		QuizActionTypes.QUIZ_REQUESTED |
		QuizActionTypes.QUIZ_STARTED |
		QuizActionTypes.TICK |
		QuizActionTypes.NEXT_QUESTION |
		QuizActionTypes.PREV_QUESTION |
		QuizActionTypes.QUIZ_FINISHED |
		QuizActionTypes.QUIZ_RESTARTED
}
export type QuizErrorAction = {
	type: QuizActionTypes.QUIZZES_ERROR | QuizActionTypes.QUIZ_ERROR
	payload: string
}
export type QuizzesReceivedAction = {
	type: QuizActionTypes.QUIZZES_RECEIVED
	payload: QuizzesResponseWithoutQuestions
}
export type QuizReceivedAction = {
	type: QuizActionTypes.QUIZ_RECEIVED
	payload: QuizResponse
}
export type AnswerReceivedAction = {
	type: QuizActionTypes.ANSWER_RECEIVED
	payload: number
}
export type QuizAction =
	QuizWithoutPayloadAction |
	QuizErrorAction |
	QuizzesReceivedAction |
	QuizReceivedAction |
	AnswerReceivedAction

export const initialQuizState: QuizState = {
	quizzesLoading: false,
	quizzesError: '',
	quizzes: undefined,
	quizStatus: 'pending',
	quizError: '',
	quiz: undefined,
	currentQuestionOrder: 0,
	answers: undefined,
	score: 0,
	highScore: 0,
	secondsRemaining: 0,
}

export const SECONDS_PER_QUESTION = 50
export const BASE_QUIZ_URL = 'http://localhost:5000'
export function quizReducer(state: QuizState, action: QuizAction): QuizState {
	switch (action.type) {
		case QuizActionTypes.QUIZZES_REQUESTED:
			return {
				...state,
				quizzesLoading: true,
				quizzesError: '',
				quizzes: undefined,
			}
		case QuizActionTypes.QUIZZES_ERROR:
			return {
				...state,
				quizzesLoading: false,
				quizzesError: action.payload,
				quizzes: undefined,
			}
		case QuizActionTypes.QUIZZES_RECEIVED:
			return {
				...state,
				quizzesLoading: false,
				quizzesError: '',
				quizzes: mapQuizzesResponseToQuizzes(action.payload),
			}
		case QuizActionTypes.QUIZ_REQUESTED:
			return {
				...state,
				quizStatus: 'loading',
			}
		case QuizActionTypes.QUIZ_RECEIVED:
			return {
				...state,
				quizStatus: 'ready',
				quiz: mapQuizResponseToQuiz(action.payload),
			}
		case QuizActionTypes.QUIZ_ERROR:
			return {
				...state,
				quizStatus: 'error',
				quizError: action.payload,
			}
		case QuizActionTypes.QUIZ_STARTED:
			return {
				...state,
				quizStatus: 'active',
				currentQuestionOrder: 1,
				secondsRemaining: getTotalQuizSeconds(state.quiz!.questions),
			}
		case QuizActionTypes.TICK:
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				quizStatus: state.secondsRemaining === 0 ? 'finished' : state.quizStatus,
			}
		case QuizActionTypes.ANSWER_RECEIVED:
			const question = getCurrentQuestion(state.quiz!.questions, state.currentQuestionOrder)
			return {
				...state,
				answers: state.answers
					? { ...state.answers, [state.currentQuestionOrder]: action.payload }
					: { [state.currentQuestionOrder]: action.payload },
				score:
					action.payload === question.correctAnswer
						? state.score + question.points
						: state.score,
			}
		case QuizActionTypes.NEXT_QUESTION:
			const totalQuestions = getTotalQuizQuestions(state.quiz!.questions)
			return {
				...state,
				currentQuestionOrder:
					state.currentQuestionOrder < totalQuestions
						? state.currentQuestionOrder + 1
						: totalQuestions,
			}
		case QuizActionTypes.PREV_QUESTION:
			return {
				...state,
				currentQuestionOrder:
					state.currentQuestionOrder > 1 ? state.currentQuestionOrder - 1 : 1,
			}
		case QuizActionTypes.QUIZ_FINISHED:
			return {
				...state,
				quizStatus: 'finished',
				highScore:
					state.score > state.highScore ? state.score : state.highScore,
			}
		case QuizActionTypes.QUIZ_RESTARTED:
			return {
				...initialQuizState,
				quizStatus: 'ready',
				quizzes: state.quizzes,
				quiz: state.quiz,
				highScore: state.highScore,
			}
		default:
			throw new Error('Unknown Action Type')
	}
}
