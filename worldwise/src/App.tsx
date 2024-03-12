import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { FakeAuthProvider } from './components/FakeAuthContext'
import { CitiesProvider } from './app/CitiesContext'

import HomeLayout from './home/components/HomeLayout'
import HomePage from './home/components/HomePage'
import ProductPage from './home/components/ProductPage'
import LoginPage from './home/components/LoginPage'
import PricingPage from './home/components/PricingPage'

import AppLayout from './app/components/AppLayout'
import Cities from './app/components/Cities'
import CityDetails from './app/components/CityDetails'
import Countries from './app/components/Countries'
import AddCityForm from './app/components/AddCityForm'

import NotFoundPage from './NotFoundPage'
import AuthedRoute from './components/AuthedRoute'

const App: React.FC = () => {
	return (
		<FakeAuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<HomeLayout />}>
							<Route index element={<HomePage />} />
							<Route path="product" element={<ProductPage />} />
							<Route path="pricing" element={<PricingPage />} />
							<Route path="login" element={<LoginPage />} />
						</Route>
						<Route path="app" element={
							<AuthedRoute>
								<AppLayout />
							</AuthedRoute>
						}>
							<Route index element={<Navigate replace to="cities" />} />
							<Route path="cities" element={<Cities />} />
							<Route path="cities/:id" element={<CityDetails />} />
							<Route path="countries" element={<Countries />} />
							<Route path="add-city" element={<AddCityForm />} />
						</Route>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</FakeAuthProvider>
	)
}

export default App
