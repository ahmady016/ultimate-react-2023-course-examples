import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

import { formatCurrency } from '../../services/helpers'
import { Cart } from '../../services/apiRestaurant'

type OrderItemProps = Cart & {
	isLoadingIngredients: boolean
	ingredients: string[]
}
const OrderItem: React.FC<OrderItemProps> = ({
	pizzaId,
	name,
	quantity,
	totalPrice,
	isLoadingIngredients,
	ingredients,
}) => {
	return (
		<li id={pizzaId.toString()} className="space-y-2 p-3">
			<div className="flex items-center justify-between gap-4 text-[0.9rem]">
				<p className="mb-2 flex items-center font-bold sm:mb-0">
					{quantity} <IoCloseOutline className="mx-2 sm:mx-1" /> {name}
				</p>
				<p className="font-bold">{formatCurrency(totalPrice)}</p>
			</div>
			<p className="text-sm capitalize italic text-stone-500">
				{isLoadingIngredients ? 'Loading Ingredients ...' : ingredients.join(', ')}
			</p>
		</li>
	)
}

export default OrderItem
