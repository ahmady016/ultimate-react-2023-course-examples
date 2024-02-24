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

export enum CustomerActionTypes {
	CREATE_CUSTOMER = 'customer/createCustomer',
	UPDATE_NAME = 'customer/updateName',
}
export type CreateCustomerAction = {
	type: CustomerActionTypes.CREATE_CUSTOMER
	payload: CustomerState
}
export type UpdateNameAction = {
	type: CustomerActionTypes.UPDATE_NAME
	payload: string
}

export type CreateCustomerPayload = Omit<CustomerState, 'createdAt'>

const customerReducer = (
	state: CustomerState = initialCustomerState,
	action: CreateCustomerAction | UpdateNameAction
) => {
	switch (action.type) {
		case CustomerActionTypes.CREATE_CUSTOMER:
			return { ...state, ...action.payload }
		case CustomerActionTypes.UPDATE_NAME:
			return { ...state, fullName: action.payload }
		default:
			return state
	}
}
export default customerReducer

export const createCustomer = (payload: CreateCustomerPayload) => {
	return {
		type: CustomerActionTypes.CREATE_CUSTOMER,
		payload: { ...payload, createdAt: new Date().toISOString() },
	} as const
}
export const updateName = (payload: string) => {
	return { type: CustomerActionTypes.UPDATE_NAME, payload } as const
}
