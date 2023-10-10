import React from 'react'
import styled from 'styled-components'

const StepsNumbersContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const StepNumber = styled.div<{ $currentStep: number, $step: number }>`
    height: 40px;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    background-color: ${({ $step, $currentStep }) => $currentStep >= $step ? '#7950f2' : '#bbb'};
    color: ${({ $step, $currentStep }) => $currentStep >= $step ? '#fff' : '#444'};
`
type StepsNumbersProps = {
    length: number
    currentStep: number
}
const StepsNumbers: React.FC<StepsNumbersProps> = ({ length, currentStep }) => (
    <StepsNumbersContainer>
        {Array
            .from({ length }, (_, i) => i + 1)
            .map(step => <StepNumber $currentStep={currentStep} $step={step}>{step}</StepNumber>)
        }
    </StepsNumbersContainer>
)

export default StepsNumbers
