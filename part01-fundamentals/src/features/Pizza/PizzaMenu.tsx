import React from 'react'
import styled from 'styled-components'

import { pizzaList } from "./data"
import PizzaItem from "./PizzaItem"

const PizzaMenuSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    h2 {
        display: inline-block;
        padding: 0.5rem;
        border-top: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        font-size: 2.4rem;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-weight: 500;
    }
    & > ul {
        list-style: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
    }
    & > p {
        font-size: 1.5rem;
        text-align: center;
        line-height: 1.6;
        width: 80%;
    }
`
const PizzaMenu: React.FC = () => {
    return (
        <PizzaMenuSection>
            <h2>Our Menu</h2>
            {pizzaList.length > 0
                ?   <ul>
                        {pizzaList.map(pizza => <PizzaItem key={pizza.name} {...pizza} />)}
                    </ul>
                :   <p>Oops We are still working on our menu, please come back later!</p>
            }
        </PizzaMenuSection>
    )
}

export default PizzaMenu
