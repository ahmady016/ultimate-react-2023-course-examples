import React from 'react'

import Advice from './features/Advice'

const Header: React.FC = () => {
	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<h1 className="flex items-center">
					<img
						className="h-8 mr-3"
						src="https://flowbite.com/docs/images/logo.svg"
						alt="Flowbite Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Part One: Fundamentals</span>
				</h1>
			</div>
		</nav>
	)
}

const App: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Advice />
			</main>
		</>

	)
}

export default App
