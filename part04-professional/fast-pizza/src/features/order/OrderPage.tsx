import React from 'react'
import { Params, useLoaderData } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import { calcMinutesLeft, formatCurrency, formatDate } from '../../services/helpers'
import { getOrder, Order } from '../../services/apiRestaurant'

import OrderItem from './OrderItem'

const OrderPage: React.FC = () => {
	const { data: order } = useLoaderData() as AxiosResponse<Order>
	const deliveryIn = calcMinutesLeft(order.estimatedDelivery)

	return (
		<div className="space-y-5 px-4 py-6">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<h2 className="text-xl font-semibold">
					{order.customer} (Order #{order.id}) Status
				</h2>
				<div className="space-x-2">
					{order.priority && (
						<span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
							Prioritized Order
						</span>
					)}
					<span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
						{order.status} Order
					</span>
				</div>
			</div>
			<div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
				<p className="text-md font-semibold">
					{deliveryIn >= 0
						? `Only ${calcMinutesLeft(order.estimatedDelivery)} minutes left 😃`
						: 'Order should have arrived'}
				</p>
				<p className="text-sm text-stone-600">(Estimated delivery: {formatDate(order.estimatedDelivery)})</p>
			</div>
			<ul className="divide-y divide-stone-200 border-b border-t py-2">
				{order.cart.map(item => <OrderItem key={item.pizzaId} {...item} />)}
			</ul>
			<div className="space-y-2 bg-stone-200 px-6 py-5">
				<p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(order.orderPrice)}</p>
				{order.priority && (
					<p className="text-sm font-medium text-stone-600">
						Price priority: {formatCurrency(order.priorityPrice)}
					</p>
				)}
				<p className="text-md font-bold text-stone-600">
					To pay on delivery: {formatCurrency(order.orderPrice + order.priorityPrice)}
				</p>
			</div>
		</div>
	)
}

export async function OrderPageLoader({ params }: { params: Params<'orderId'> }) {
	return params.orderId ? getOrder(params.orderId) : null
}

export default OrderPage
