import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { BsPencilFill } from 'react-icons/bs'

import { ReduxBankRootState } from '../store'
import { UpdateCustomerNameProps } from './UpdateCustomerNameForm'

const CustomerInfoContainer = styled.h2`
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    span:last-child {
        font-weight: 600;
    }
    svg {
        display: inline;
        cursor: pointer;
        font-size: 1.25rem;
        color: var(--color-secondary);
        &:hover {
            color: var(--color-primary);
        }
    }
`
const CustomerInfo: React.FC<UpdateCustomerNameProps> = ({ toggleEditMode }) => {
    const customer = useSelector((state: ReduxBankRootState) => state.customer)
	return (
        <CustomerInfoContainer>
            <span>Welcome </span>
            <span>({customer.fullName} / {customer.nationalId})</span>
            <BsPencilFill onClick={toggleEditMode} />
        </CustomerInfoContainer>
    )
}

export default CustomerInfo
