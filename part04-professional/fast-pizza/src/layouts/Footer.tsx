import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
	return (
		<footer className="bg-stone-300 shadow">
			<div className="w-full mx-auto max-w-screen-xl py-3 flex items-center justify-center">
				<p className="text-md text-center text-stone-700">
					© 2024 &nbsp;
					<Link to="/" className="text-bold hover:underline">Fast Pizza Co™</Link>
					&nbsp;. All Rights Reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer
