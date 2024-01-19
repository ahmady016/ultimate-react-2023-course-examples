import React from 'react'
import styled from 'styled-components'

import { BankActionTypes, bankReducer, initialBankState } from './state'

const BankAccountPageContainer = styled.section`
	--color-semi-dark: #555;
	--color-dark: #3c3c3c;
	--color-darkest: #303030;
	--color-primary: #2939cc;
	--color-secondary: #16297d;
	--color-medium: #a7a7a7;
	--color-light: #ccc;
    --color-semi-light: #ddd;
	--color-lightest: #eee;

	min-height: 75vh;
	width: 70%;
	margin: 2rem auto;
	padding: 1rem;
	border-radius: 25px;
	background-color: var(--color-lightest);
    color: var(--color-semi-dark);
	font-family: 'IBM Plex Mono', sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	&:hover {
        border: 2px solid var(--color-medium);
		background-color: var(--color-semi-light);
        color: var(--color-darkest);
	}
	h1 {
		font-size: 2rem;
		font-weight: 600;
		text-align: center;
	}
	& > div {
		width: 50%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		p {
			text-align: center;
			font-size: 1.25rem;
			font-weight: 600;
		}
		input {
			padding: 0.6rem;
			border-radius: 10px;
			border: 2px solid var(--color-medium);
			background-color: var(--color-lightest);
			color: var(--color-darkest);
			font-size: 1rem;
			font-weight: 500;
			&:disabled {
				background-color: var(--color-light);
				color: var(--color-medium);
				border: 2px solid var(--color-light);
				cursor: not-allowed;
			}
		}
		button {
			cursor: pointer;
			width: 11rem;
			padding: 0.75rem 1.5rem;
			border-radius: 10px;
			border: 2px solid var(--color-light);
			background-color: var(--color-primary);
			color: var(--color-light);
			font-size: 1rem;
			font-weight: 500;
			&:hover {
				background-color: var(--color-secondary);
				border: 2px solid var(--color-secondary);
				color: var(--color-lightest);
			}
			&:disabled {
				background-color: var(--color-medium);
				border: 2px solid var(--color-medium);
				color: var(--color-lightest);
				cursor: not-allowed;
			}
		}
	}
`
const BankAccountPage: React.FC = () => {
	const [deposit, setDeposit] = React.useState(0)
    const changeDeposit = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDeposit(Number(e.target.value))
    }, [])
	const [withdraw, setWithdraw] = React.useState(0)
    const changeWithdraw = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setWithdraw(Number(e.target.value))
    }, [])
	const [requestLoan, setRequestLoan] = React.useState(0)
    const changeRequestLoan = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRequestLoan(Number(e.target.value))
    }, [])
	const [payLoan, setPayLoan] = React.useState(0)
    const changePayLoan = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPayLoan(Number(e.target.value))
    }, [])

	const [{ balance, loan, isActive }, dispatch] = React.useReducer(bankReducer, initialBankState)
    const openAccountAction = React.useCallback(() => dispatch({ type: BankActionTypes.OPEN_ACCOUNT }), [])
    const depositAction = React.useCallback(() => {
        dispatch({ type: BankActionTypes.DEPOSIT, payload: deposit })
    }, [deposit])
    const withdrawAction = React.useCallback(() => {
        dispatch({ type: BankActionTypes.WITHDRAW, payload: withdraw })
    }, [withdraw])
    const requestLoanAction = React.useCallback(() => {
        dispatch({ type: BankActionTypes.REQUEST_LOAN, payload: requestLoan })
    }, [requestLoan])
    const payLoanAction = React.useCallback(() => {
        dispatch({ type: BankActionTypes.PAY_LOAN, payload: payLoan })
    }, [payLoan])
    const closeAccountAction = React.useCallback(() => dispatch({ type: BankActionTypes.CLOSE_ACCOUNT }), [])

	return (
		<BankAccountPageContainer>
			<h1>Simple Bank Account</h1>

			<div>
				<p>Balance: {balance}</p>
				<p>Loan: {loan}</p>
			</div>

			<div>
				<button onClick={openAccountAction} disabled={isActive}>
					Open Account
				</button>
			</div>
			<div>
				<input
					type="number"
					value={deposit}
					onChange={changeDeposit}
                    disabled={!isActive}
				/>
				<button onClick={depositAction} disabled={!isActive}>
					Deposit
				</button>
			</div>
			<div>
				<input
					type="number"
					value={withdraw}
					onChange={changeWithdraw}
                    disabled={!isActive}
				/>
				<button onClick={withdrawAction} disabled={!isActive}>
					Withdraw
				</button>
			</div>
			<div>
				<input
					type="number"
					value={requestLoan}
					onChange={changeRequestLoan}
                    disabled={!isActive || loan > 0}
				/>
				<button onClick={requestLoanAction} disabled={!isActive || loan > 0}>
					Request Loan
				</button>
			</div>
			<div>
				<input
					type="number"
					value={payLoan}
					onChange={changePayLoan}
                    disabled={!isActive || loan === 0}
				/>
				<button onClick={payLoanAction} disabled={!isActive || loan === 0}>
					Pay Loan
				</button>
			</div>
			<div>
				<button
					onClick={closeAccountAction}
					disabled={!isActive || loan > 0 || balance !== 0}
				>
					Close Account
				</button>
			</div>
		</BankAccountPageContainer>
	)
}

export default BankAccountPage
