import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './Layout/AppLayout'

import Advice from './features/Advice'
import PizzaPage from './features/Pizza/PizzaPage'
import DevProfilePage from './features/DevProfile/DevProfilePage'
import StepsPage from './features/Steps/StepsPage'
import DaysCounter from './features/DaysCounter'
import TravelListPage from './features/TravelList'

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Advice />} />
				<Route path="pizza" element={<PizzaPage />} />
				<Route path="profile" element={<DevProfilePage />} />
				<Route path="steps" element={<StepsPage />} />
				<Route path="days-counter" element={<DaysCounter />} />
				<Route path="travel-list" element={<TravelListPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
)

export default App
