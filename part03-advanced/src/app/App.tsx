import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './AppLayout'
import QuizPage from '../Quiz'

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
        <Route index element={<QuizPage />} />
      </Route>
		</Routes>
	</BrowserRouter>
)

export default App
