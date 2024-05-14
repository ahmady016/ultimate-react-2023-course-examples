/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector } from 'react-redux'
import { BiArrowBack } from 'react-icons/bi'

import { useAppDispatch } from '../../store'
import { selectUserName } from '../user/userSlice'
import { clearCart, selectCartList, selectIsEmptyCart } from './cartSlice'

import Button from '../../components/Button'
import LinkButton from '../../components/LinkButton'
import EmptyCart from './EmptyCart'
import CartItem from './CartItem'

const CartPage: React.FC = () => {
	const isEmptyCart = useSelector(selectIsEmptyCart)
	const username = useSelector(selectUserName)
	const cart = useSelector(selectCartList)

	console.log("🚀 ~ isEmptyCart:", isEmptyCart)
	console.log("🚀 ~ cart:", cart)

	const dispatch = useAppDispatch()
	const handleClearCart = React.useCallback(() => void dispatch(clearCart()), [])

	if(isEmptyCart) return <EmptyCart />

	return (
		<div className="text-center sm:my-16 lg:my-4">
			<LinkButton to="/pizza-menu" className="text-md flex w-32 items-center justify-evenly font-medium scale-125">
				<BiArrowBack />
				<span>Back To Menu</span>
			</LinkButton>
			<h2 className="mt-6 text-xl font-semibold md:text-2xl">Your Cart {username}</h2>
			<ul className="mt-3 divide-y divide-stone-200 border-b">
				{cart.map(item => <CartItem key={item.pizzaId} {...item} /> )}
			</ul>
			<div className="mt-6 space-x-2">
				<Button to="/order/new" variant="primary">Order Pizzas</Button>
				<Button variant="secondary" onClick={handleClearCart}>Clear Cart</Button>
			</div>
		</div>
	)
}

export default CartPage
