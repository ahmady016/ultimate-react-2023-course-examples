import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

import { Cart } from '../../services/apiRestaurant'
import { formatCurrency } from '../../services/helpers'

import RemoveCartItemButton from './RemoveCartItemButton'
import UpdateCartItemQuantity from './UpdateCartItemQuantity'

const CartItem: React.FC<Cart> = ({ pizzaId, name, quantity, unitPrice }) => {
	return (
		<li id={pizzaId.toString()} className="py-3 sm:flex sm:items-center sm:justify-between">
			<p className="mb-1 flex items-center sm:mb-0">
				{quantity} <IoCloseOutline className="mx-2 sm:mx-1" /> {name}
			</p>
			<div className="flex items-center justify-between sm:gap-6">
				<p>{formatCurrency(unitPrice)}</p>
				<UpdateCartItemQuantity pizzaId={pizzaId} quantity={quantity} />
				<RemoveCartItemButton pizzaId={pizzaId} />
			</div>
		</li>
	)
}

export default CartItem
