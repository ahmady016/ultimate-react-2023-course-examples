import React from 'react'
import { Outlet } from 'react-router-dom'

import HomeNav from './HomeNav'

const HomeLayout: React.FC = () => {
	return (
		<>
			<HomeNav />
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default HomeLayout
