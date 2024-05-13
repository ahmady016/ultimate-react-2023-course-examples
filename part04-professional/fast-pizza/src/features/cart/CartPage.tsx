import React from 'react'
import { useSelector } from 'react-redux'
import { BiArrowBack } from 'react-icons/bi'

import { RootState } from '../../store'
import { initialCart } from '../../services/apiRestaurant'

import CartItem from './CartItem'
import LinkButton from '../../components/LinkButton'
import Button from '../../components/Button'

const CartPage: React.FC = () => {
	const username = useSelector((state: RootState) => state.user.name)

	return (
		<div className="text-center sm:my-16 lg:my-4">
			<LinkButton to="/pizza-menu" className="text-md flex w-32 items-center justify-evenly font-medium scale-125">
				<BiArrowBack />
				<span>Back To Menu</span>
			</LinkButton>
			<h2 className="mt-6 text-xl font-semibold md:text-2xl">Your Cart {username}</h2>
			<ul className="mt-3 divide-y divide-stone-200 border-b">
				{initialCart.map(item => <CartItem key={item.pizzaId} {...item} /> )}
			</ul>
			<div className="mt-6 space-x-2">
				<Button to="/order/new" variant="primary">Order Pizzas</Button>
				<Button variant="secondary">Clear Cart</Button>
			</div>
		</div>
	)
}

export default CartPage
