import axios from 'axios'
export type Pizza = {
  id: number
  name: string
  imageUrl: string
  ingredients: string[]
  unitPrice: number
  soldOut: boolean
}
export type Cart = {
  pizzaId: number
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}
export type Order = {
  id: string
  customer: string
  status: string
  priority: string
  priorityPrice: number
  orderPrice: number
  estimatedDelivery: string
  cart: Cart[]
}
const BASE_PIZZA_API_URL = 'https://react-fast-pizza-api.onrender.com/api'

export async function getMenu() {
  try {
    const res = await axios.get<Pizza[]>(`${BASE_PIZZA_API_URL}/menu`)
    return res.data
  } catch (error) {
    throw new Error('Failed getting menu')
  }
}

export async function getOrder(id: string) {
  try {
    const res = await axios.get<Order>(`${BASE_PIZZA_API_URL}/order/${id}`)
    return res.data
  } catch (error) {
    throw new Error(`Couldn't find order #${id}`)
  }
}

export async function createOrder(newOrder: Order) {
	try {
		const res = await axios.post(`${BASE_PIZZA_API_URL}/order`, newOrder)
		return res.data
	} catch {
		throw Error('Failed creating your order')
	}
}

export async function updateOrder(id: string, updatedValues: Partial<Order>) {
	try {
		await axios.patch(`${BASE_PIZZA_API_URL}/order/${id}`, updatedValues)
	} catch (err) {
		throw Error('Failed updating your order')
	}
}
