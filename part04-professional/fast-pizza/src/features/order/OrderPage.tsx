import React from 'react'
import { Params, useLoaderData } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import { calcMinutesLeft, formatCurrency, formatDate } from '../../services/helpers'
import { getOrder, Order } from '../../services/apiRestaurant'

const OrderPage: React.FC = () => {
	const { data: order } = useLoaderData() as AxiosResponse<Order>
	console.log('OrderPage -> order:', order)
	const deliveryIn = calcMinutesLeft(order.estimatedDelivery)

	return (
		<div className="my-10 px-4 text-center sm:my-16">
			<h1 className="mb-8 text-xl font-semibold md:text-3xl">The Order Page</h1>
			<div>
				<h2>Order Status</h2>
				<div>
					<span>Customer: {order.customer} has </span>
					{order.priority && <span>Prioritized Order and </span>}
					<span>{order.status} Order</span>
				</div>
			</div>
			<div>
				<p>
					{deliveryIn >= 0
						? `Only ${calcMinutesLeft(order.estimatedDelivery)} minutes left 😃`
						: 'Order should have arrived'}
				</p>
				<p>(Estimated delivery: {formatDate(order.estimatedDelivery)})</p>
			</div>
			<div>
				<p>Price pizza: {formatCurrency(order.orderPrice)}</p>
				{order.priority && <p>Price priority: {formatCurrency(order.priorityPrice)}</p>}
				<p>To pay on delivery: {formatCurrency(order.orderPrice + order.priorityPrice)}</p>
			</div>
		</div>
	)
}

export async function OrderPageLoader({ params }: { params: Params<'orderId'> }) {
	return params.orderId
		? getOrder(params.orderId)
		: null
}

export default OrderPage
