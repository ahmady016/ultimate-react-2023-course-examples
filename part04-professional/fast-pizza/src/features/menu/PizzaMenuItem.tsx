import React from 'react'

import { Pizza } from '../../services/apiRestaurant'
import { formatCurrency } from '../../services/helpers'

import Button from '../../components/Button'

const PizzaMenuItem: React.FC<Pizza> = ({ id, name, imageUrl, ingredients, unitPrice, soldOut }) => {
	return (
		<li className="flex gap-4 py-2" key={id}>
			<img className={`h-28 ${soldOut ? 'opacity-70 grayscale' : ''}`} src={imageUrl} alt={name} />
			<div className="flex grow flex-col pt-1">
				<h3 className='font-semibold'>{name}</h3>
				<p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
				<div className="mt-auto flex items-center justify-between">
					{!soldOut
						?	<p className="text-sm">{formatCurrency(unitPrice)}</p>
						:	<p className="text-sm font-medium uppercase text-stone-500">SOLD OUT</p>
					}
					<Button variant="small">Add To Cart</Button>
				</div>
			</div>
		</li>
	)
}

export default PizzaMenuItem
