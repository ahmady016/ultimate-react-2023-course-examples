import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import { getMenu, Pizza } from '../../services/apiRestaurant'

import PizzaMenuItem from './PizzaMenuItem'

const PizzaMenuPage: React.FC = () => {
	const { data: pizzaMenuItems } = useLoaderData() as AxiosResponse
	console.log(pizzaMenuItems)

	return (
		<div className="my-3 px-4 text-center">
			<h1 className="mb-3 text-xl font-semibold md:text-3xl">The Pizza Menu</h1>
			<ul>{pizzaMenuItems?.map((item: Pizza) => <PizzaMenuItem key={item.id} {...item} />)}</ul>
		</div>
	)
}

export async function PizzaMenuPageLoader() {
	return getMenu()
}

export default PizzaMenuPage
