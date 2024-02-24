import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { ReduxBankRootState } from '../store'

const CustomerInfoContainer = styled.h2`
    font-size: 1.2rem;
    span:last-child {
        font-weight: 600;
    }
`
const CustomerInfo: React.FC = () => {
    const customer = useSelector((state: ReduxBankRootState) => state.customer)
	return (
        <CustomerInfoContainer>
            <span>Welcome </span>
            <span>({customer.fullName} / {customer.nationalId})</span>
        </CustomerInfoContainer>
    )
}

export default CustomerInfo
