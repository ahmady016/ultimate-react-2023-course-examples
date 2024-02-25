/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import CreateCustomerForm from './Customers/CreateCustomerForm'
import CustomerInfo from './Customers/CustomerInfo'
import AccountOperations from './Accounts/AccountOperations'
import BalanceInfo from './Accounts/BalanceInfo'
import UpdateCustomerNameForm from './Customers/UpdateCustomerNameForm'

const ReduxBankPageContainer = styled.div`
	--color-semi-dark: #555;
	--color-dark: #3c3c3c;
	--color-darkest: #303030;
	--color-primary: #2939cc;
	--color-secondary: #16297d;
	--color-medium: #a7a7a7;
	--color-light: #ccc;
    --color-semi-light: #ddd;
	--color-lightest: #eee;

	min-height: 90vh;
	width: 75%;
	margin: 2rem auto;
	padding: 1rem;
	border-radius: 25px;
	background-color: var(--color-lightest);
    color: var(--color-semi-dark);
	font-family: 'IBM Plex Mono', sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
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
	input {
		padding: 0.5rem;
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
`
const ReduxBankPage: React.FC = () => {
	const customerName = useSelector((state: any) => state.customer.fullName)
	const [editMode, setEditMode] = React.useState(false)
	const toggleEditMode = React.useCallback(() => setEditMode(editMode => !editMode), [])
	return (
		<ReduxBankPageContainer>
			<h1>Redux Bank Page</h1>
			{!customerName
				?	<CreateCustomerForm />
				: 	<>
						<CustomerInfo toggleEditMode={toggleEditMode} />
						{editMode && <UpdateCustomerNameForm toggleEditMode={toggleEditMode} />}
						<AccountOperations />
						<BalanceInfo />
					</>
			}
		</ReduxBankPageContainer>
	)
}

export default ReduxBankPage
