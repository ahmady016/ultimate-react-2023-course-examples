import React from 'react'
import { PiHandsClappingDuotone, PiWarningFill } from 'react-icons/pi'
import { BsEmojiAngry } from 'react-icons/bs'
import { FaInfoCircle } from 'react-icons/fa'
import styled from 'styled-components'

const MessageContainer = styled.p`
	width: 80%;
	margin: 1rem auto;
	text-align: center;
	font-size: 1.25rem;
	font-weight: 600;
    &.success {
        color: var(--color-success);
    }
    &.error {
        color: var(--color-error);
    }
    &.info {
        color: var(--color-info);
    }
    &.warning {
        color: var(--color-warning);
    }
`
const MessageTypes: Record<string, React.ReactNode> = {
    success: <PiHandsClappingDuotone />,
    error: <BsEmojiAngry />,
    info: <FaInfoCircle />,
    warning: <PiWarningFill />,
}
type MessageProps = {
    type: 'error' | 'success' | 'info' | 'warning'
    text: string
}
const Message: React.FC<MessageProps> = ({ text, type = 'info' }) => {
	return (
    <MessageContainer className={type}>
        {MessageTypes[type]}
        {text}
    </MessageContainer>
    )
}

export default Message
