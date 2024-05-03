import React from 'react'

import { formatCurrency } from '../../services/helpers'
import { Pizza } from '../../services/apiRestaurant'

const PizzaMenuItem: React.FC<Pizza> = ({
	id, name, imageUrl, ingredients, unitPrice, soldOut,
}) => {
	return (
		<li key={id}>
			<img src={imageUrl} alt={name} />
			<div>
				<h3>{name}</h3>
				<p>{ingredients.join(', ')}</p>
				<div>
					{!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>SOLD OUT</p>}
				</div>
			</div>
		</li>
	)
}

export default PizzaMenuItem
