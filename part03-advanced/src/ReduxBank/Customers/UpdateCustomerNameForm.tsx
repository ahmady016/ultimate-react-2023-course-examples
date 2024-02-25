/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { ReduxBankDispatch, ReduxBankRootState } from '../store'
import { updateName } from './customerSlice'
import { ReduxToolkitBankDispatch } from '../../ReduxToolkitBank/store'
import { updateName as rtkUpdateName } from '../../ReduxToolkitBank/customerSlice'


const UpdateCustomerNameFormContainer = styled.form`
	width: 70%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	input {
		flex-basis: 50%;
		padding: 0.5rem;
	}
`
export type UpdateCustomerNameProps = {
	toggleEditMode: () => void
}
const UpdateCustomerNameForm: React.FC<UpdateCustomerNameProps> = ({ toggleEditMode }) => {
	const customerName = useSelector((state: ReduxBankRootState) => state.customer.fullName)
	const [name, setName] = React.useState(customerName)
	const changeName = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => void setName(e.target.value), [])

    const location = useLocation()
    const isRTK = React.useMemo(() => location.pathname === '/redux-toolkit-bank', [location.pathname])

    const dispatch = useDispatch<ReduxBankDispatch>()
    const rtkDispatch = useDispatch<ReduxToolkitBankDispatch>()

	const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (name.trim()) {
			(isRTK)
				? rtkDispatch(rtkUpdateName(name))
				: dispatch(updateName(name))
			setName('')
			toggleEditMode()
		}
	}, [name])

	return (
		<UpdateCustomerNameFormContainer onSubmit={handleSubmit}>
			<input type="text" placeholder="Type Name" value={name} onChange={changeName} />
			<button type="submit">Update</button>
		</UpdateCustomerNameFormContainer>
	)
}

export default UpdateCustomerNameForm
