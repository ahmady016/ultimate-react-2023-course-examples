/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { ReduxBankDispatch } from '../store'
import { createCustomer } from './customerSlice'

import { ReduxToolkitBankDispatch } from '../../ReduxToolkitBank/store'
import { createCustomer as rtkCreateCustomer } from '../../ReduxToolkitBank/customerSlice'

const CreateCustomerFormContainer = styled.form`
    width: 60%;
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
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        label {
            flex-basis: 30%;
        }
        input {
            flex-basis: 70%;
        }
    }
`
const CreateCustomerForm: React.FC = () => {
	const [nationalId, setNationalId] = React.useState('')
	const changeNationalId = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => void setNationalId(e.target.value), [])
	const [fullName, setFullName] = React.useState('')
	const changeFullName = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => void setFullName(e.target.value), [])

    const location = useLocation()
    const isRTK = React.useMemo(() => location.pathname === '/redux-toolkit-bank', [location.pathname])

    const dispatch = useDispatch<ReduxBankDispatch>()
    const rtkDispatch = useDispatch<ReduxToolkitBankDispatch>()

	const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (nationalId.trim() && fullName.trim()) {
            (isRTK)
                ? rtkDispatch(rtkCreateCustomer({ nationalId, fullName }))
                : dispatch(createCustomer({ nationalId, fullName }))
            setNationalId('')
            setFullName('')
        }
	}, [nationalId, fullName])

	return (
		<CreateCustomerFormContainer onSubmit={handleSubmit}>
            <legend>Create Customer</legend>
			<div>
				<label htmlFor="nationalId">National ID</label>
				<input
					type="text"
					name="nationalId"
					value={nationalId}
					onChange={changeNationalId}
				/>
			</div>
			<div>
				<label htmlFor="fullName">Full Name</label>
				<input
					type="text"
					name="fullName"
					value={fullName}
					onChange={changeFullName}
				/>
			</div>
			<button type="submit">Create Customer</button>
		</CreateCustomerFormContainer>
	)
}

export default CreateCustomerForm
