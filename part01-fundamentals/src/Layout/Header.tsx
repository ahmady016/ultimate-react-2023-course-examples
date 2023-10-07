import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { navLinks } from './navLinks'

const baseLinkClasses =
	'block hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-300 md:dark:hover:text-blue-300'
const normalLinkClasses =
	'text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
const activeLinkClasses =
	'pb-1 border border-l-0 border-r-0 border-t-0 border-b-3 border-blue-300 font-bold text-blue-300 dark:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white'
const Header: React.FC = () => (
	<header>
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<h1 className="flex items-center">
					<img
						className="h-8 mr-3"
						src="https://flowbite.com/docs/images/logo.svg"
						alt="Part Two Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						Part One: Fundamentals
					</span>
				</h1>
				<div id="navbar-default" className="hidden w-full md:block md:w-auto">
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						{Object.entries(navLinks).map(([key, value]) => (
							<li key={key}>
								<NavLink
									className={({ isActive }) =>
										isActive
											? classNames(baseLinkClasses, activeLinkClasses)
											: classNames(baseLinkClasses, normalLinkClasses)
									}
									to={key}
								>
									{value}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	</header>
)

export default Header
