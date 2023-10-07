import React from 'react'
import styled from 'styled-components'

const PizzaHeaderContainer = styled.header`
	align-self: stretch;
	h1 {
		width: 100%;
		margin: 1rem 0;
		display: block;
		position: relative;
		color: #edc84b;
		text-transform: uppercase;
		text-align: center;
		font-size: 3rem;
		font-weight: 300;
		letter-spacing: 3px;
		&::before,
		&::after {
			display: block;
			content: '';
			height: 3px;
			width: 10rem;
			background-color: #edc84b;
			position: absolute;
			top: calc(50% - 1px);
		}
		&::before {
			left: 0;
		}
		&::after {
			right: 0;
		}
	}
`
const PizzaHeader: React.FC = () => (
	<PizzaHeaderContainer>
		<h1>Fast React Pizza Co.</h1>
	</PizzaHeaderContainer>
)

export default PizzaHeader
