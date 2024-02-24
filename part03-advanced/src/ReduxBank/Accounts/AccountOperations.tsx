/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { ReduxBankDispatch, ReduxBankRootState, deposit } from '../store'
import { withdraw, requestLoan, payLoan } from './accountSlice'

import currencies from '../currencies.json'

const AccountOperationsContainer = styled.form`
    width: 100%;
    padding: 2rem;
    border: 2px solid var(--color-medium);
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    legend {
        font-size: 1.25rem;
        font-weight: 600;
        text-align: center;
    }
    & > div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        label {
            flex-basis: 15%;
        }
        select {
            padding: 0.5rem;
        }
    }
`
const AccountOperations: React.FC = () => {
    const dispatch = useDispatch<ReduxBankDispatch>()

	const [depositAmount, setDepositAmount] = React.useState(0)
	const changeDepositAmount = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => void setDepositAmount(Number(e.target.value)), [])
	const [currency, setCurrency] = React.useState('USD')
	const changeCurrency = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => void setCurrency(e.target.value), [])
    const handleDeposit = React.useCallback(() => {
        if(depositAmount) {
            deposit({ amount: depositAmount, currency })
            setDepositAmount(0)
            setCurrency('USD')
        }
    }, [depositAmount, currency])

    const [withdrawAmount, setWithdrawAmount] = React.useState(0)
    const changeWithdrawAmount = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => void setWithdrawAmount(Number(e.target.value)), [])
    const handleWithdraw = React.useCallback(() => {
        if(withdrawAmount) {
            dispatch(withdraw(withdrawAmount))
            setWithdrawAmount(0)
        }
    }, [withdrawAmount])

    const [loanAmount, setLoanAmount] = React.useState(0)
    const changeLoanAmount = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => void setLoanAmount(Number(e.target.value)), [])
    const [loanPurpose, setLoanPurpose] = React.useState('')
    const changeLoanPurpose = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => void setLoanPurpose(e.target.value), [])
    const handleRequestLoan = React.useCallback(() => {
        if(loanAmount) {
            dispatch(requestLoan({ amount: loanAmount, purpose: loanPurpose }))
            setLoanAmount(0)
            setLoanPurpose('')
        }
    }, [loanAmount, loanPurpose])

    const handlePayLoan = React.useCallback(() => {
        dispatch(payLoan())
    }, [])

    const { isLoading, loan: currentLoan, loanPurpose: currentLoanPurpose } = useSelector((state: ReduxBankRootState) => state.account)

	return (
		<AccountOperationsContainer>
			<legend>Account Operations</legend>
			<div>
				<label htmlFor="deposit">Deposit</label>
				<input
					type="number"
					name="deposit"
					value={depositAmount}
					onChange={changeDepositAmount}
				/>
				<select name="currency" value={currency} onChange={changeCurrency}>
					{Object
                        .entries(currencies)
                        .map(([key, currency]) => <option key={key} value={key}>{currency}</option>)
                    }
				</select>
                <button type="button" onClick={handleDeposit} disabled={isLoading}>
                    {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
                </button>
			</div>
            <div>
                <label htmlFor="withdraw">Withdraw</label>
                <input
                    type="number"
                    name="withdraw"
                    value={withdrawAmount}
                    onChange={changeWithdrawAmount}
                />
                <button type="button" onClick={handleWithdraw}>Withdraw {withdrawAmount}</button>
            </div>
            <div>
                <label htmlFor="loan">Request Loan</label>
                <input
                    type="number"
                    name="loan"
                    value={loanAmount}
                    onChange={changeLoanAmount}
                />
                <input
                    type="text"
                    name="loanPurpose"
                    value={loanPurpose}
                    onChange={changeLoanPurpose}
                />
                <button type="button" onClick={handleRequestLoan}>Request Loan {loanAmount}</button>
            </div>
            {currentLoan > 0 && (
                <div>
                    <p>Pay back ${currentLoan} ({currentLoanPurpose})</p>
                    <button type="button" onClick={handlePayLoan}>Pay loan</button>
                </div>
            )}
		</AccountOperationsContainer>
	)
}

export default AccountOperations
