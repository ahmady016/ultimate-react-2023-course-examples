import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { FakeAuthProvider } from './components/FakeAuthContext'
import { CitiesProvider } from './app/CitiesContext'

import AuthedRoute from './components/AuthedRoute'
import Spinner from './components/Spinner'
import Cities from './app/components/Cities'
import CityDetails from './app/components/CityDetails'
import Countries from './app/components/Countries'
import AddCityForm from './app/components/AddCityForm'

const HomeLayout = React.lazy(() => import('./home/components/HomeLayout'))
const HomePage = React.lazy(() => import('./home/components/HomePage'))
const ProductPage = React.lazy(() => import('./home/components/ProductPage'))
const LoginPage = React.lazy(() => import('./home/components/LoginPage'))
const PricingPage = React.lazy(() => import('./home/components/PricingPage'))
const AppLayout = React.lazy(() => import('./app/components/AppLayout'))
const NotFoundPage = React.lazy(() => import('./NotFoundPage'))

const App: React.FC = () => {
	return (
		<FakeAuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<React.Suspense fallback={<Spinner fullScreen />}>
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
					</React.Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</FakeAuthProvider>
	)
}

export default App
