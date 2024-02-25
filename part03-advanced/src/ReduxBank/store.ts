import { legacy_createStore as createStore, combineReducers } from 'redux'
import accountReducer, { AccountActionTypes, DepositPayload } from './Accounts/accountSlice'
import customerReducer from './Customers/customerSlice'

const store = createStore(
	combineReducers({
		account: accountReducer,
		customer: customerReducer,
	})
)
export default store
export type ReduxBankDispatch = typeof store.dispatch
export type ReduxBankRootState = ReturnType<typeof store.getState>

export const deposit = async ({ amount, currency }: DepositPayload) => {
	if (currency === 'USD')
        return store.dispatch({ type: AccountActionTypes.DEPOSIT, payload: amount })

	else {
		store.dispatch({ type: AccountActionTypes.CONVERTING_CURRENCY })

		const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
		const data = await res.json()

		store.dispatch({ type: AccountActionTypes.DEPOSIT, payload: data.rates.USD })
	}
}
