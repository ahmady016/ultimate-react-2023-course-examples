/* INSTRUCTIONS / CONSIDERATIONS:
--------------------------------
1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)
2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.
3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer
4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)
5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state
6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)
7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

export const initialBankState = {
	balance: 0,
	loan: 0,
	isActive: false,
}
export type BankState = typeof initialBankState
export enum BankActionTypes {
	OPEN_ACCOUNT = 'openAccount',
	DEPOSIT = 'deposit',
	WITHDRAW = 'withdraw',
	REQUEST_LOAN = 'requestLoan',
	PAY_LOAN = 'payLoan',
	CLOSE_ACCOUNT = 'closeAccount',
}
export type BankAction = {
	type: BankActionTypes
	payload?: number
}
export function bankReducer(state: BankState, action: BankAction) : BankState {
	if (!state.isActive && action.type !== BankActionTypes.OPEN_ACCOUNT)
		return state

	const { type, payload = 0 } = action
	switch (type) {
		case BankActionTypes.OPEN_ACCOUNT:
			return {
				...state,
				balance: payload || 500,
				isActive: true,
			}

		case BankActionTypes.DEPOSIT:
			return { ...state, balance: state.balance + payload }

		case BankActionTypes.WITHDRAW:
			return { ...state, balance: state.balance - payload }

		case BankActionTypes.REQUEST_LOAN:
			if (state.loan > 0)
                return state
			return {
				...state,
				loan: payload,
				balance: state.balance + payload,
			}

		case BankActionTypes.PAY_LOAN:
            if(state.loan - payload < 0)
                return {
                    ...state,
                    loan: 0,
                    balance: state.balance - state.loan
                }
			return {
                ...state,
                loan: state.loan - payload,
                balance: state.balance - payload
            }

		case BankActionTypes.CLOSE_ACCOUNT:
			if (state.loan > 0 || state.balance !== 0)
                return state
			return initialBankState

		default:
			throw new Error('Unknown Action')
	}
}
