import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

import { formatCurrency } from '../../services/helpers'
import { Cart } from '../../services/apiRestaurant'

const OrderItem: React.FC<Cart> = ({ pizzaId, name, quantity, totalPrice }) => {
	return (
		<li id={pizzaId.toString()} className="py-2 px-3">
			<div className="flex items-center justify-between gap-4 text-[0.9rem]">
				<p className="mb-2 flex items-center font-bold sm:mb-0">
					{quantity} <IoCloseOutline className="mx-2 sm:mx-1" /> {name}
				</p>
				<p className="font-bold">{formatCurrency(totalPrice)}</p>
			</div>
		</li>
	)
}

export default OrderItem
