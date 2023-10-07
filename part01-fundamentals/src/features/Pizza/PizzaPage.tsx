import React from 'react'
import styled from 'styled-components'

import PizzaHeader from './PizzaHeader'
import PizzaMenu from './PizzaMenu'
import PizzaFooter from './PizzaFooter'

const PizzaPageContainer = styled.div`
    font-family: 'Roboto Mono', sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`
const PizzaPage: React.FC = () => {
	return (
        <PizzaPageContainer>
            <PizzaHeader />
            <PizzaMenu />
            <PizzaFooter />
        </PizzaPageContainer>
    )
}

export default PizzaPage
