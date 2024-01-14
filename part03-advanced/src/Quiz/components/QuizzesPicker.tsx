import React from 'react'

import { QuizState } from '../state'

type QuizzesPickerProps = {
	selectedQuizId: string
	changeQuizId: (e: React.ChangeEvent<HTMLSelectElement>) => void
	quizState: QuizState
}
const QuizzesPicker: React.FC<QuizzesPickerProps> = ({
    selectedQuizId,
    changeQuizId,
    quizState
}) => (
    <select className="cursor-pointer w-2/6 p-4 mb-3 text-lg text-gray-700 border border-gray-400 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500" value={selectedQuizId} onChange={changeQuizId}>
        <option value="">Select Quiz</option>
        {quizState.quizzes && (Object
            .entries(quizState.quizzes)
            .map(([id, quiz]) => <option key={id} value={id}>{quiz.title}</option>)
        )}
    </select>
)

export default QuizzesPicker
