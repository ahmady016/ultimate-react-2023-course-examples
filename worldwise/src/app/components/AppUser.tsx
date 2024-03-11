import React from 'react'
import styled from 'styled-components'

import { getFakeUser } from '../helpers'

const AppUserContainer = styled.div`
	position: absolute;
	top: 1.25rem;
	right: 1.25rem;
	background-color: var(--color-dark--1);
	padding: 0.5rem 1rem;
	border-radius: 7px;
	z-index: 999;
	box-shadow: 0 0.75rem 2rem rgba(36, 42, 46, 0.5);
	font-size: 1rem;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	img {
		border-radius: 100px;
		height: 3rem;
	}
	button {
		cursor: pointer;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 8px;
		background-color: var(--color-dark--2);
		color: inherit;
		text-transform: uppercase;
		font-family: inherit;
		font-size: 1rem;
		font-weight: 700;
	}
`
const AppUser: React.FC = () => {
	const user = getFakeUser()
	return (
		<AppUserContainer>
			<img src={user.avatar} alt={user.name} />
			<span>Welcome, {user.name}</span>
			<button>Logout</button>
		</AppUserContainer>
	)
}

export default AppUser
