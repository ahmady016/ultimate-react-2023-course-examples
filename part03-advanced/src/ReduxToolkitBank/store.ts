import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './accountSlice'
import customerReducer from './customerSlice'

const store = configureStore({
	reducer: {
		account: accountReducer,
		customer: customerReducer,
	},
})

export default store
export type ReduxToolkitBankDispatch = typeof store.dispatch
export type ReduxToolkitBankRootState = ReturnType<typeof store.getState>
