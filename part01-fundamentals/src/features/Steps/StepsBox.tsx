import React from 'react'
import { FiX } from "react-icons/fi"
import styled from 'styled-components'

import StepsNumbers from './StepsNumbers'
import StepsMessage from './StepsMessage'
import StepsButtons from './StepsButtons'

const StepsContainer = styled.div`
	width: 60%;
	margin: 1rem auto;
	padding: 3rem 4rem;
	border-radius: 8px;
	background-color: #e3e3e3;
    text-align: center;
    position: relative;
    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.4rem;
        font-weight: bold;
    }
    & > div {
        & > button {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 1.5rem;
            color: #5f2aff
        }
    }
    & > button {
        margin: 6rem auto;
        padding: 1rem;
        border-radius: 10px;
        background-color: #5f2aff;
        color: #fff;
        text-align; center;
        font-weight: 500;
    }
`
type StepsBoxProps = {
    title: string
    messages: string[]
}
const StepsBox: React.FC<StepsBoxProps> = ({ title, messages }) => {
    const [currentStep, setCurrentStep] = React.useState(1)
    const toNextStep = React.useCallback(() => {
        if(currentStep < messages.length) setCurrentStep(s => s + 1)
    }, [currentStep, messages.length])
    const toPrevStep = React.useCallback(() => {
        if(currentStep > 1) setCurrentStep(s => s - 1)
    }, [currentStep])

    const [isOpen, setIsOpen] = React.useState(true)
    const openSteps = React.useCallback(() => void setIsOpen(true), [])
    const closeSteps = React.useCallback(() => void setIsOpen(false), [])

    return (
        <StepsContainer>
            {isOpen
                ?   <div>
                        <button type="button" onClick={closeSteps}>
                            <FiX />
                        </button>
                        <h2>{title}</h2>
                        <StepsNumbers length={messages.length} currentStep={currentStep} />
                        <StepsMessage currentStep={currentStep} messages={messages} />
                        <StepsButtons
                            goForward={toNextStep}
                            goBack={toPrevStep}
                            length={messages.length}
                            currentStep={currentStep}
                        />
                    </div>
                :   <button type="button" onClick={openSteps}>Open {title}</button>
            }
        </StepsContainer>
    )
}

export default StepsBox
