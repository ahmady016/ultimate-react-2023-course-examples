import React from 'react'
import styled from 'styled-components'

import { useQuizContext } from '../QuizContext'

const QuizHeaderContainer = styled.div`
	width: 60%;
	margin: 1rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	h3, h4 {
		margin-bottom: 0.75rem;
	}
`
const QuizHeader: React.FC = () => {
	const { quiz } = useQuizContext()
	return (
		<QuizHeaderContainer>
			<h3>{quiz?.title}</h3>
			<h4>{quiz?.description}</h4>
		</QuizHeaderContainer>
	)
}

export default QuizHeader
