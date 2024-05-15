import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaLongArrowAltRight } from 'react-icons/fa'

import { formatCurrency } from '../../services/helpers'
import { selectCartTotalPrice, selectCartTotalQuantity, selectIsEmptyCart } from './cartSlice'

const CartStatusBar: React.FC = () => {
	const totalQuantity = useSelector(selectCartTotalQuantity)
	const totalPrice = useSelector(selectCartTotalPrice)
	const isEmptyCart = useSelector(selectIsEmptyCart)

	if (isEmptyCart) return null

	return (
		<div className="flex items-center justify-between bg-stone-300 px-4 py-4 text-sm uppercase text-stone-700 sm:px-6 md:text-base">
			<p className="space-x-4 font-semibold text-stone-600 sm:space-x-6">
				<span>{totalQuantity} pizzas</span>
				<span>{formatCurrency(totalPrice)}</span>
			</p>
			<Link to="/cart" className="flex items-center gap-2 font-semibold">
				<span>Open Cart</span>
				<FaLongArrowAltRight />
			</Link>
		</div>
	)
}

export default CartStatusBar
