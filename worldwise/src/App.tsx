import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import HomeLayout from './home/HomeLayout'
import HomePage from './home/HomePage'
import ProductPage from './home/ProductPage'
import LoginPage from './home/LoginPage'
import PricingPage from './home/PricingPage'

import AppLayout from './app/AppLayout'
import Cities from './app/Cities'
import City from './app/City'
import Countries from './app/Countries'
import AddCityForm from './app/AddCityForm'

import NotFoundPage from './NotFoundPage'


const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<HomeLayout />}>
					<Route index element={<HomePage />} />
					<Route path="product" element={<ProductPage />} />
					<Route path="pricing" element={<PricingPage />} />
					<Route path="login" element={<LoginPage />} />
				</Route>
				<Route path="app" element={<AppLayout />}>
					<Route index element={<Navigate replace to="cities" />} />
					<Route path="cities" element={<Cities />} />
					<Route path="cities/:id" element={<City />} />
					<Route path="countries" element={<Countries />} />
					<Route path="add-city" element={<AddCityForm />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
