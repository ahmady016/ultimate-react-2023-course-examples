import React from 'react'
import styled from 'styled-components'

const StepsMessageBox = styled.p`
    margin: 2.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 1.4rem;
    font-weight: bold;
`
type StepsMessageProps = {
    currentStep: number
    messages: string[]
}
const StepsMessage: React.FC<StepsMessageProps> = ({ currentStep, messages }) => (
    <StepsMessageBox>
        {`Step ${currentStep}: ${messages[currentStep - 1]}`}
    </StepsMessageBox>
)

export default StepsMessage
