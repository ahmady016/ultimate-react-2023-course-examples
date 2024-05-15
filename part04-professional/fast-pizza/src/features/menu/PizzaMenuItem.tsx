/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector } from 'react-redux'

import { Pizza } from '../../services/apiRestaurant'
import { formatCurrency } from '../../services/helpers'

import { useAppDispatch } from '../../store'
import { addToCart, selectCartItemQuantity, selectIsItemInCart } from '../cart/cartSlice'

import Button from '../../components/Button'
import UpdateCartItemQuantity from '../cart/UpdateCartItemQuantity'
import RemoveCartItemButton from '../cart/RemoveCartItemButton'

const PizzaMenuItem: React.FC<Pizza> = ({ id, name, imageUrl, ingredients, unitPrice, soldOut }) => {
	const dispatch = useAppDispatch()
	const handleAddToCart = React.useCallback(() => {
		dispatch(
			addToCart({
				pizzaId: id,
				name,
				quantity: 1,
				unitPrice,
				totalPrice: unitPrice,
			})
		)
	}, [id, name, unitPrice])

	const isItemInCart = useSelector(selectIsItemInCart(id))
	const quantity = useSelector(selectCartItemQuantity(id))

	return (
		<li className="flex gap-4 py-2" key={id}>
			<img className={`h-28 ${soldOut ? 'opacity-70 grayscale' : ''}`} src={imageUrl} alt={name} />
			<div className="flex grow flex-col pt-1">
				<h3 className="font-semibold">{name}</h3>
				<p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
				<div className="mt-auto flex items-center justify-between">
					{soldOut
						?	<p className="text-sm font-medium uppercase text-stone-500">SOLD OUT</p>
						: 	<>
								<p className="text-sm">{formatCurrency(unitPrice)}</p>
								{isItemInCart &&
									<div className="flex items-center gap-2 sm:gap-6">
										<UpdateCartItemQuantity pizzaId={id} quantity={quantity} />
										<RemoveCartItemButton pizzaId={id} />
									</div>
								}
							</>
					}
					{!isItemInCart && !soldOut &&
						<Button variant="small" onClick={handleAddToCart}>
							Add To Cart
						</Button>
					}
				</div>
			</div>
		</li>
	)
}

export default PizzaMenuItem
