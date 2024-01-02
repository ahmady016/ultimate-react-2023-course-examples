import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './AppLayout'
import MoviesPage from '../features/Movies'
import StarRatingPage from '../components/StarRating'
import CurrencyConverterPage from '../features/CurrencyConverter'
import GeolocationPage from '../features/Geolocation'
import WeatherPage from '../features/Weather'

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
                <Route index element={<MoviesPage />} />
                <Route path="star-rating" element={<StarRatingPage />} />
                <Route path="currency-converter" element={<CurrencyConverterPage />} />
                <Route path="geolocation" element={<GeolocationPage />} />
                <Route path="weather" element={<WeatherPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App
