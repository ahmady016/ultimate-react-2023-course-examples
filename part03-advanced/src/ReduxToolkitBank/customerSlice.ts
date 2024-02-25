import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CreateCustomerPayload } from '../ReduxBank/Customers/customerSlice'

export type CustomerState = {
	nationalId: string
	fullName: string
	createdAt: string
}
export const initialCustomerState: CustomerState = {
	nationalId: '',
	fullName: '',
	createdAt: '',
}

const customerSlice = createSlice({
	name: 'customer',
	initialState: initialCustomerState,
	reducers: {
		createCustomer: {
			prepare: (payload: CreateCustomerPayload) => ({
				payload: {
                    ...payload,
					createdAt: new Date().toISOString(),
				},
			}),
			reducer(state, action: PayloadAction<CustomerState>) {
				state.fullName = action.payload.fullName
				state.nationalId = action.payload.nationalId
				state.createdAt = action.payload.createdAt
			},
		},
		updateName(state, action: PayloadAction<string>) {
			state.fullName = action.payload
		},
	},
})

export default customerSlice.reducer
export const { createCustomer, updateName } = customerSlice.actions
