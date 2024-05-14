import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import { getMenu, Pizza } from '../../services/apiRestaurant'

import PizzaMenuItem from './PizzaMenuItem'

const PizzaMenuPage: React.FC = () => {
	const { data: pizzaMenuItems } = useLoaderData() as AxiosResponse

	return (
		<div className="py-3">
			<h1 className="mb-2 text-center text-xl font-semibold md:text-2xl">The Pizza Menu</h1>
			<ul className="divide-y divide-stone-200 px-2">
				{pizzaMenuItems?.map((item: Pizza) => <PizzaMenuItem key={item.id} {...item} />)}
			</ul>
		</div>
	)
}

export async function PizzaMenuPageLoader() {
	return getMenu()
}

export default PizzaMenuPage
