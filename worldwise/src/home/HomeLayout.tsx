import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout: React.FC = () => {
	return (
		<div>
			<h1>HomeLayout</h1>
			<Outlet />
		</div>
	)
}

export default HomeLayout
