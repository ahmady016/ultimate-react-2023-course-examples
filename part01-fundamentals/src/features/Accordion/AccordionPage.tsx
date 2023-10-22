import React from 'react'
import styled from 'styled-components'

import { questions1, questions2 } from './data'

import AccordionBox from './AccordionBox'

const AccordionPageContainer = styled.div`
    width: 100%;
    background-color: #f7f7f7;
    color: #343a40;
    font-family: "Quicksand", sans-serif;
    line-height: 1;
`
const AccordionPage: React.FC = () => {
	return (
        <AccordionPageContainer>
            <AccordionBox title="Questions #1" items={questions1} />
            <hr className="w-11/12 mx-auto text-gray-500 font-semibold text-3xl" />
            <AccordionBox title="Questions #2" items={questions2} />
        </AccordionPageContainer>
    )
}

export default AccordionPage
