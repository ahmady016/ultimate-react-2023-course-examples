import React from 'react'
import GenerateIds from './GenerateIds'

const QuizPage: React.FC = () => {
	return (
        <>
            <h2 className="p-3 text-2xl font-semibold text-center">Quiz Page</h2>
            <GenerateIds length={6} count={28} />
        </>
    )
}

export default QuizPage
