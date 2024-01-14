import React from 'react'
import { BiError } from 'react-icons/bi'
import styled from 'styled-components'

const QuizErrorContainer = styled.p`
	padding: 2rem;
	border-radius: 25px;
	background-color: var(--color-medium);
    color: var(--color-error);
	text-align: center;
	font-size: 1.5rem;
	font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    svg {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
`
type QuizErrorProps = {
    children: React.ReactNode
}
const QuizError: React.FC<QuizErrorProps> = ({ children }) => {
	return (
		<QuizErrorContainer>
            <p><BiError /></p>
			<p>
                Oops! There was an error fetching quiz data
            </p>
            <p>{children}</p>
		</QuizErrorContainer>
	)
}

export default QuizError
