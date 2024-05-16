import React from 'react'
import { useSelector } from 'react-redux'

import { selectUserName } from '../features/user/userSlice'

import Button from '../components/Button'
import CreateUserForm from '../features/user/CreateUserForm'

const HomePage: React.FC = () => {
	const username = useSelector(selectUserName)

	return (
		<div className="my-5 px-4 text-center sm:my-10">
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
