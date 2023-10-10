import React from 'react'
import styled from 'styled-components'

const StepsButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        border: none;
        cursor: pointer;
        padding: 10px 15px;
        border-radius: 100px;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #7950f2;
        color: #fff;
    }
    button:disabled,
    button[disabled] {
        background-color: #bbb;
        color: #444;
    }
`
type StepsButtonsProps = {
    goForward: () => void
    goBack: () => void
    length: number
    currentStep: number
}
const StepsButtons: React.FC<StepsButtonsProps> = ({ goForward, goBack, length, currentStep }) => (
    <StepsButtonsContainer>
        <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 1}
        >
            Previous
        </button>
        <button
            type="button"
            onClick={goForward}
            disabled={currentStep === length}
        >
            Next
        </button>
    </StepsButtonsContainer>
)

export default StepsButtons
