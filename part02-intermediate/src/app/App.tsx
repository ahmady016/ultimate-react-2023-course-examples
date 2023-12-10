import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './AppLayout'
import MoviesPage from '../features/Movies'
import StarRatingPage from '../components/StarRating'

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
                <Route index element={<MoviesPage />} />
                <Route path="star-rating" element={<StarRatingPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App
