/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { setUser, User } from './userSlice'

import Button from '../../components/Button'

const CreateUserForm: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [formState, setFormState] = React.useState<User>({
		name: '',
		email: '',
	})
	const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
	}, [])
	const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (formState.name && formState.email) {
			dispatch(setUser(formState))
			navigate('/pizza-menu')
		}
	}, [formState])

	return (
		<form onSubmit={handleSubmit}>
			<h4 className="text-md mb-4 text-stone-600 md:text-base">
				👋 Welcome! Please start by telling us your name and email
			</h4>
			<div className="flex w-full flex-col items-center gap-3">
				<input
					className="w-[50%] rounded-full border border-stone-400 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:border-stone-100 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
					type="text"
					name="name"
					placeholder="Type Your Full Name"
					required
					value={formState.name}
					onChange={handleChange}
				/>
				<input
					className="w-[50%] rounded-full border border-stone-400 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:border-stone-100 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
					type="email"
					name="email"
					placeholder="Type Your Email"
					required
					value={formState.email}
					onChange={handleChange}
				/>
			</div>
			<div className="mt-4">
				<Button
					type="submit"
					variant="primary"
					disabled={formState.name === '' || formState.email === ''}
				>
					Start ordering
				</Button>
			</div>
		</form>
	)
}

export default CreateUserForm
