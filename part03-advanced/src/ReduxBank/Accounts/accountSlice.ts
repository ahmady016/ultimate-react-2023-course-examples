
export type AccountState = {
	balance: number
	loan: number
	loanPurpose: string
	isLoading: boolean
}
export const initialAccountState: AccountState = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
	isLoading: false,
}

export enum AccountActionTypes {
	CONVERTING_CURRENCY = 'account/convertingCurrency',
	DEPOSIT = 'account/deposit',
	WITHDRAW = 'account/withdraw',
	REQUEST_LOAN = 'account/requestLoan',
	PAY_LOAN = 'account/payLoan',
}

export type RequestLoanPayload = {
	amount: number
	purpose: string
}
export type RequestLoanAction = {
	type: AccountActionTypes.REQUEST_LOAN
	payload: RequestLoanPayload
}
export type AccountAction = {
	type:
		| AccountActionTypes.DEPOSIT
		| AccountActionTypes.WITHDRAW
		| AccountActionTypes.PAY_LOAN
	payload: number
}
export type ConvertingCurrencyAction = {
	type: AccountActionTypes.CONVERTING_CURRENCY
}
export type PayLoanAction = {
	type: AccountActionTypes.PAY_LOAN
}
export type DepositPayload = {
	amount: number
	currency: string
}

const accountReducer = (
	state: AccountState = initialAccountState,
	action: ConvertingCurrencyAction | AccountAction | RequestLoanAction | PayLoanAction
) => {
	switch (action.type) {
		case AccountActionTypes.DEPOSIT:
			return {
				...state,
				balance: state.balance + action.payload,
				isLoading: false,
			}
		case AccountActionTypes.WITHDRAW:
			return { ...state, balance: state.balance - action.payload }
		case AccountActionTypes.REQUEST_LOAN:
			if (state.loan > 0) return state
			return {
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			}
		case AccountActionTypes.PAY_LOAN:
			if (state.loan === 0) return state
			return {
				...state,
				loan: 0,
				loanPurpose: '',
				balance: state.balance - state.loan,
			}
		case AccountActionTypes.CONVERTING_CURRENCY:
			return { ...state, isLoading: true }

		default:
			return state
	}
}
export default accountReducer

export const withdraw = (payload: number) => {
	return { type: AccountActionTypes.WITHDRAW, payload } as const
}
export const requestLoan = (payload: RequestLoanPayload) => {
	return {
		type: AccountActionTypes.REQUEST_LOAN,
		payload,
	} as const
}
export const payLoan = () => {
	return { type: AccountActionTypes.PAY_LOAN } as const
}
