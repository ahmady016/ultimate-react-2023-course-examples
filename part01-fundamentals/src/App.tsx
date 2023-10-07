import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './Layout/AppLayout'

import Advice from './features/Advice'
import PizzaPage from './features/Pizza/PizzaPage'


const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Advice />} />
				<Route path="pizza" element={<PizzaPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
)

export default App
