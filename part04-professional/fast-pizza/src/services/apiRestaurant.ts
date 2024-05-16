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
export type NewOrder = {
  customer: string
  phone: string
  address: string
  priority: boolean
  cart: Cart[]
}
export type Order = {
  id: string
  customer: string
  status: string
  priority: boolean
  priorityPrice: number
  orderPrice: number
  estimatedDelivery: string
  cart: Cart[]
}
export type CreatedOrderResponse = {
  status: string
  data: Order
}
export const initialCart: Cart[] = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetable",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]
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
    const { data } = await axios.get<Order>(`${BASE_PIZZA_API_URL}/order/${id}`)
    return data
  } catch (error) {
    throw new Error(`Couldn't find order #${id}`)
  }
}

export async function createOrder(newOrder: NewOrder) {
	try {
		const { data } = await axios.post<CreatedOrderResponse>(`${BASE_PIZZA_API_URL}/order`, newOrder)
		return data.data
	} catch {
		throw Error('Failed creating your order')
	}
}

export async function updateOrder(id: string, updatedValues: Partial<Order>) {
	try {
		await axios.patch(`${BASE_PIZZA_API_URL}/order/${id}`, updatedValues)
	} catch (err) {
		throw Error('Failed Updating Your Order')
	}
}
