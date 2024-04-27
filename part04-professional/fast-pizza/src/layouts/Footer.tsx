import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
	return (
		<footer className="bg-white shadow dark:bg-gray-800">
			<div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-center">
				<p className="text-md text-center text-gray-500 dark:text-gray-400">
					© 2024 &nbsp;
					<Link to="/" className="text-bold hover:underline">Fast Pizza Co™</Link>
					&nbsp;. All Rights Reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer
