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

export const SECONDS_PER_QUESTION = 50
export const BASE_QUIZ_URL = 'http://localhost:5000'

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
export function quizReducer(state: QuizState, action: any): QuizState {
	switch (action.type) {
		case 'quizzesRequested':
			return {
				...state,
				quizzesLoading: true,
				quizzesError: '',
				quizzes: undefined,
			}
		case 'quizzesError':
			return {
				...state,
				quizzesLoading: false,
				quizzesError: action.payload,
				quizzes: undefined,
			}
		case 'quizzesReceived':
			return {
				...state,
				quizzesLoading: false,
				quizzesError: '',
				quizzes: mapQuizzesResponseToQuizzes(action.payload),
			}
		case 'quizRequested':
			return {
				...state,
				quizStatus: 'loading',
			}
		case 'quizReceived':
			return {
				...state,
				quizStatus: 'ready',
				quiz: mapQuizResponseToQuiz(action.payload),
			}
		case 'quizError':
			return {
				...state,
				quizStatus: 'error',
				quizError: action.payload,
			}
		case 'quizStarted':
			return {
				...state,
				quizStatus: 'active',
				currentQuestionOrder: 1,
				secondsRemaining: getTotalQuizSeconds(state.quiz!.questions),
			}
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				quizStatus: state.secondsRemaining === 0 ? 'finished' : state.quizStatus,
			}
		case 'answerReceived':
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
		case 'nextQuestion':
			const totalQuestions = getTotalQuizQuestions(state.quiz!.questions)
			return {
				...state,
				currentQuestionOrder:
					state.currentQuestionOrder < totalQuestions
						? state.currentQuestionOrder + 1
						: totalQuestions,
			}
		case 'prevQuestion':
			return {
				...state,
				currentQuestionOrder:
					state.currentQuestionOrder > 1 ? state.currentQuestionOrder - 1 : 1,
			}
		case 'quizFinished':
			return {
				...state,
				quizStatus: 'finished',
				highScore:
					state.score > state.highScore ? state.score : state.highScore,
			}
		case 'quizRestarted':
			return {
				...initialQuizState,
				quizzes: state.quizzes,
				quiz: state.quiz,
				quizStatus: 'ready',
			}
		default:
			throw new Error('Unknown Action')
	}
}
