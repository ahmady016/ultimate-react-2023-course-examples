import React from 'react'
import styled from 'styled-components'

import { Pizza } from './data'

type PizzaListItemProps = {
    $soldOut: boolean
}
const PizzaListItem = styled.li<PizzaListItemProps>`
	display: flex;
	gap: 3.2rem;
    color: ${({ $soldOut }) => $soldOut ? '#888' : 'inherit'};
	img {
		width: 12rem;
		aspect-ratio: 1;
		align-self: start;
        filter: ${({ $soldOut }) => $soldOut ? 'grayscale()' : 'none'};
		opacity: ${({ $soldOut }) => $soldOut ? '0.8' : '1'};
	}
	div {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding: 0.4rem 0;
	}
	h3 {
		font-size: 2rem;
		font-weight: 400;
	}
	p {
		font-size: 1.4rem;
		font-weight: 300;
		font-style: italic;
		margin-bottom: auto;
	}
	span {
		display: block;
		font-size: 1.6rem;
	}
`
const PizzaItem: React.FC<Pizza> = ({
	name,
	photoName,
	ingredients,
	price,
	soldOut,
}) => {
	return (
		<PizzaListItem $soldOut={soldOut}>
			<img src={`src/features/pizza/images/${photoName}`} alt={name} />
			<div>
				<h3>{name}</h3>
				<p>{ingredients}</p>
				<span>{price}</span>
			</div>
		</PizzaListItem>
	)
}

export default PizzaItem
