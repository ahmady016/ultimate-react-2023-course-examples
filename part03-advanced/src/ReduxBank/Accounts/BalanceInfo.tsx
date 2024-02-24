import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { ReduxBankRootState } from '../store'

function formatCurrency(value: number) {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
	}).format(value)
}

const BalanceInfoContainer = styled.div`
    font-size: 1.25rem;
    span:last-child {
        margin-left: 1rem;
        font-weight: 600;
    }
`
const BalanceInfo: React.FC = () => {
    const balance = useSelector((state: ReduxBankRootState) => state.account.balance)
	return (
        <BalanceInfoContainer>
            <span>Your Current Balance:</span>
            <span>{formatCurrency(balance)}</span>
        </BalanceInfoContainer>
    )
}

export default BalanceInfo
