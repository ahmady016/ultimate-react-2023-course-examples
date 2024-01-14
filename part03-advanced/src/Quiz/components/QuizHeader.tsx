import React from 'react'
import styled from 'styled-components'

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
type QuizHeaderProps = {
	title: string
	description: string
}
const QuizHeader: React.FC<QuizHeaderProps> = ({ title, description }) => {
	return (
		<QuizHeaderContainer>
			<h3>{title}</h3>
			<h4>{description}</h4>
		</QuizHeaderContainer>
	)
}

export default QuizHeader
