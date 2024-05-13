import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../store'

import Button from '../components/Button'
import CreateUserForm from '../features/user/CreateUserForm'

const HomePage: React.FC = () => {
	const username = useSelector((state: RootState) => state.user.name)

	return (
		<div className="my-10 px-4 text-center sm:my-16">
			<h1 className="mb-8 text-xl font-semibold md:text-3xl">
				<p className="mb-4">The Best Pizza.</p>
				<span className="text-yellow-500">Straight out of the oven, straight to you.</span>
			</h1>
			{username ? (
				<Button to="/pizza-menu" variant="primary">
					Welcome back, {username}! Continue Ordering
				</Button>
			) : (
				<CreateUserForm />
			)}
		</div>
	)
}

export default HomePage
