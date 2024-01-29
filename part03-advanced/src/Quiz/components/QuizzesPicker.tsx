import React from 'react'

import { useQuizContext } from '../QuizContext'

const QuizzesPicker: React.FC = () => {
    const { quizzes, selectedQuizId, changeQuizId } = useQuizContext()
    return (
        <select className="cursor-pointer w-2/6 p-4 mb-3 text-lg text-gray-700 border border-gray-400 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500" value={selectedQuizId} onChange={changeQuizId}>
            <option value="">Select Quiz</option>
            {quizzes && (Object
                .entries(quizzes)
                .map(([id, quiz]) => <option key={id} value={id}>{quiz.title}</option>)
            )}
        </select>
    )
}


export default QuizzesPicker
