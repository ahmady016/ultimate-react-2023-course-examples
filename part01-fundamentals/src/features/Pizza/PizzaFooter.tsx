import React from 'react'
import styled from 'styled-components'

import { openHour, closeHour } from './data'

const PizzaFooterContainer = styled.footer`
	font-size: 1.4rem;
	margin: 2rem 0;
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2.4rem;
		button {
			border: none;
			border-radius: 5px;
			font-size: 1.4rem;
			font-weight: 500;
			background-color: #edc84b;
			padding: 1rem 2rem;
			cursor: pointer;
			transition: all 0.2s;
			&:hover {
				background-color: #e9bb24;
			}
		}
	}
`

const PizzaFooter: React.FC = () => {
	const hour = new Date().getHours()
	const isOpen = hour >= openHour && hour <= closeHour
	return (
		<PizzaFooterContainer>
            {isOpen
                ?   <div>
                        <p>we will be opened until {closeHour}:00 come visit us or Order online</p>
                        <button type="button">Order Now</button>
                    </div>
                :   <p>Oops We Are Closed Now, please come back between {openHour}:00 and {closeHour}:00 o'clock</p>
            }
		</PizzaFooterContainer>
	)
}

export default PizzaFooter
