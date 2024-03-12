/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { FAKE_USER, useFakeAuth } from '../../components/FakeAuthContext'

import Message from '../../components/Message'

const LoginPageContainer = styled.div`
	width: 100%;
	min-height: calc(100vh - 9rem);
	background-color: var(--color-dark--1);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	form {
		width: 35%;
		margin: auto;
		background-color: var(--color-dark--2);
		border-radius: 10px;
		padding: 2.5rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		& > div {
			width: 80%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			label {
				font-size: 1rem;
			}
			input {
				font-size: 1rem;
			}
		}
		div.actions {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			button {
				cursor: pointer;
				border: none;
				border-radius: 5px;
				margin-top: 0.75rem;
				width: 50%;
				padding: 0.75rem 1rem;
				background-color: var(--color-brand--hover);
				color: var(--color-dark--2);
				font-size: 1rem;
				font-weight: 600;
				text-transform: uppercase;
				transition: all 0.2s ease-in-out;
				&:last-child {
					background-color: var(--color-error);
					color: var(--color-light--2);
					&:hover {
						background-color: var(--color-error-hover);
					}
				}
				&:hover {
					background-color: var(--color-brand--1);
				}
			}
		}
	}
`
const LoginPage: React.FC = () => {
	const [email, setEmail] = React.useState(FAKE_USER.email)
	const changeEmail = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [])
	const [password, setPassword] = React.useState(FAKE_USER.password)
	const changePassword = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])

	const navigate = useNavigate()
	const { login, reset, isLoggedIn, invalidCredentials } = useFakeAuth()
	const [authErrorMessage, setAuthErrorMessage] = React.useState('')

	const handleReset = React.useCallback(() => {
		reset()
		setAuthErrorMessage('')
		setEmail(FAKE_USER.email)
		setPassword(FAKE_USER.password)
	}, [])

	const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (email && password) login(email, password)
	}, [email, password])

	React.useEffect(() => {
		if (isLoggedIn)
			navigate('/app', { replace: true })
		if(invalidCredentials)
			setAuthErrorMessage('Invalid credentials. Please try again.')
		else
			setAuthErrorMessage('')
	}, [isLoggedIn, invalidCredentials])

	return (
		<LoginPageContainer>
			<form onSubmit={handleSubmit} onReset={handleReset}>
				{invalidCredentials && authErrorMessage && <Message type="error" text={authErrorMessage} />}
				<div>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={changeEmail}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={changePassword}
					/>
				</div>
				<div className="actions">
					<button type="submit">Login</button>
					<button type="reset">Reset</button>
				</div>
			</form>
		</LoginPageContainer>
	)
}

export default LoginPage
