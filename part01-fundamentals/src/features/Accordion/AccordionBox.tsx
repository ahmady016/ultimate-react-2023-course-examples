import React from 'react'
import styled from 'styled-components'

import { Question } from './data'

import AccordionItem from './AccordionItem'

const AccordionBoxContainer = styled.div`
    width: 70%;
    margin: auto;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    h2 {
        font-size: 1.75rem;
        color: #444;
        font-weight: 600;
    }
`
type AccordionBoxProps = {
    title: string
    items: Question[]
}
const AccordionBox: React.FC<AccordionBoxProps> = ({ title, items }) => {
    const [currentItem, setCurrentItem] = React.useState(-1)
	return (
        <AccordionBoxContainer>
            <h2>{title}</h2>
            {items.map(({ id, title, content }) =>
                <AccordionItem
                    key={id}
                    id={id}
                    title={title}
                    currentItem={currentItem}
                    setCurrentItem={setCurrentItem}
                >
                    {content}
                </AccordionItem>
            )}
        </AccordionBoxContainer>
    )
}

export default AccordionBox
