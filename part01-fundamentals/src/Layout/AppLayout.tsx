import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

const AppLayout: React.FC = () => (
	<>
		<Header />
		<main>
			<Outlet />
		</main>
		<Footer />
	</>
)

export default AppLayout
