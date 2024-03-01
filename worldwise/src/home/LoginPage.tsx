/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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
			button {
				cursor: pointer;
				border: none;
				border-radius: 5px;
				margin-top: 0.75rem;
				padding: 0.75rem 1rem;
				background-color: var(--color-brand--2);
				color: var(--color-dark--0);
				font-size: 1.1rem;
				font-weight: 600;
				text-transform: uppercase;
				transition: all 0.2s ease-in-out;
				&:hover {
					background-color: var(--color-brand--1);
					color: var(--color-dark--2);
				}
			}
		}
	}
`
const LoginPage: React.FC = () => {
	const [email, setEmail] = React.useState('jack@example.com')
	const changeEmail = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), [])
	const [password, setPassword] = React.useState('qwerty')
	const changePassword = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])

	const navigate = useNavigate()
	const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		navigate('/app', { replace: true })
	}, [])

	return (
		<LoginPageContainer>
			<form onSubmit={handleSubmit}>
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
				<div>
					<button>Login</button>
				</div>
			</form>
		</LoginPageContainer>
	)
}

export default LoginPage
