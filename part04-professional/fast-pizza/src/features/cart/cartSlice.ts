import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { Cart } from '../../services/apiRestaurant'


export type CartState = {
	list: Cart[]
}
const initialState: CartState = {
	list: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<Cart>) {
			state.list.push(action.payload)
		},
		removeFromCart(state, action: PayloadAction<number>) {
			state.list = state.list.filter(item => item.pizzaId !== action.payload)
		},
		clearCart(state) {
			state.list = []
		},
		increaseItemQuantity(state, action: PayloadAction<number>) {
			const item = state.list.find(item => item.pizzaId === action.payload)
			if (item && item.quantity < 100) {
				item.quantity++
				item.totalPrice = item.unitPrice * item.quantity
			}
		},
		decreaseItemQuantity(state, action: PayloadAction<number>) {
			const item = state.list.find(item => item.pizzaId === action.payload)
			if (item && item.quantity > 1) {
				item.quantity--
				item.totalPrice = item.unitPrice * item.quantity
			}
		},
	},
})

export const { addToCart, removeFromCart, clearCart, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions
export default cartSlice.reducer

export const selectCartList = (state: RootState) => state.cart.list
export const selectIsEmptyCart = (state: RootState) => state.cart.list !== undefined && state.cart.list.length === 0

export const selectCartTotalQuantity = (state: RootState) => state.cart.list?.reduce((total, item) => total + item.quantity, 0) || 0
export const selectCartTotalPrice = (state: RootState) => state.cart.list?.reduce((total, item) => total + item.totalPrice, 0) || 0

export const selectIsItemInCart = (pizzaId: number) => (state: RootState) => state.cart.list?.some(item => item.pizzaId === pizzaId)
export const selectCartItemQuantity = (pizzaId: number) => (state: RootState) =>
    state.cart.list?.find(item => item.pizzaId === pizzaId)?.quantity || 0
