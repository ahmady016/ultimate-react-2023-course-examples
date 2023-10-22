/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { HiPlus, HiMinus } from "react-icons/hi2"
import styled from 'styled-components'

const AccordionItemContainer = styled.div<{ $isOpen: boolean }>`
    cursor: pointer;
    padding: 1.5rem;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    border-bottom: 4px solid #fff;
    border-top: ${({ $isOpen }) => $isOpen ? '4px solid #087f5b' : '4px solid #fff'};
    color: ${({ $isOpen }) => $isOpen ? '#087f5b' : '#333'};
    h3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.75rem;
        span {
            font-size: 1.5rem;
            font-weight: 500;
        }
        span:nth-child(1) {
            color: ${({ $isOpen }) => $isOpen ? '#087f5b' : '#aaa'};
        }
        span:nth-child(2) {
            flex-grow: 1;
        }
    }
    div {
        margin-top: 2rem;
        padding-bottom: 1rem;
        line-height: 1.6;
        color: #333;
        grid-column: 2 / -1;
        ul {
            margin-left: 1rem;
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            color: #868e96;
        }
    }
`
type AccordionItemProps = {
    id: number
    title: string
    children: React.ReactNode
    currentItem: number
    setCurrentItem: React.Dispatch<React.SetStateAction<number>>
}
const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, children, currentItem, setCurrentItem }) => {
    const isOpen = id === currentItem
    const toggleOpen = React.useCallback(() => setCurrentItem(isOpen ? -1 : id) ,[isOpen, id])

	return (
        <AccordionItemContainer $isOpen={isOpen} onClick={toggleOpen}>
            <h3>
                <span>{id < 9 ? `0${id}` : id}</span>
                <span>{title}</span>
                <span>{isOpen ? <HiMinus /> : <HiPlus />}</span>
            </h3>
            {isOpen && <div>{children}</div>}
        </AccordionItemContainer>
    )
}

export default AccordionItem
