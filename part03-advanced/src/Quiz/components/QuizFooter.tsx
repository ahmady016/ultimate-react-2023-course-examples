import React from 'react'
import styled from 'styled-components'

const QuizFooterContainer = styled.footer`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30%;
`
type QuizFooterProps = {
    children: React.ReactNode
}
const QuizFooter: React.FC<QuizFooterProps> = ({ children }) => (
    <QuizFooterContainer>{children}</QuizFooterContainer>
)

export default QuizFooter
