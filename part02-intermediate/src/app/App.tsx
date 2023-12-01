import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './AppLayout'
import MoviesPage from '../features/Movies'

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
                <Route index element={<MoviesPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App
