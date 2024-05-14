import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

import LinkButton from '../../components/LinkButton'

const EmptyCart: React.FC = () => {
	return (
		<div className="px-4 py-3">
			<LinkButton
				to="/pizza-menu"
				className="text-md flex w-32 scale-125 items-center justify-evenly font-medium"
			>
				<BiArrowBack />
				<span>Back To Menu</span>
			</LinkButton>
			<p className="mt-5 text-md font-semibold">Your Cart is Still Empty! Start Ordering Some Pizzas</p>
		</div>
	)
}

export default EmptyCart
