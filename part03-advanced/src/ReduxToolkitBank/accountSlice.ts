import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { DepositPayload, RequestLoanPayload } from '../ReduxBank/Accounts/accountSlice'

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

const accountSlice = createSlice({
	name: 'account',
	initialState: initialAccountState,
	reducers: {
		deposit: (state, action: PayloadAction<number>) => {
			state.balance = state.balance + action.payload
			state.isLoading = false
		},
		withdraw: (state, action: PayloadAction<number>) => {
			state.balance = state.balance - action.payload
		},
		requestLoan: (state, action: PayloadAction<RequestLoanPayload>) => {
			if (state.loan > 0) return state
			state.loan = action.payload.amount
			state.loanPurpose = action.payload.purpose
			state.balance = state.balance + action.payload.amount
		},
		payLoan: (state) => {
			if (state.loan === 0) return state
			state.loan = 0
			state.loanPurpose = ''
			state.balance = state.balance - state.loan
		},
	},
})

export default accountSlice.reducer
export const { withdraw, requestLoan, payLoan } = accountSlice.actions
export function deposit({ amount, currency }: DepositPayload) {
	if (currency === 'USD') return { type: 'account/deposit', payload: amount }

	return async function (dispatch: Dispatch) {
		dispatch({ type: 'account/convertingCurrency' })

		const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
		const data = await res.json()

		dispatch({ type: 'account/deposit', payload: data.rates.USD })
	}
}
