import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { QuizContextProvider } from '../Quiz/QuizContext'

import AppLayout from './AppLayout'
import QuizPage from '../Quiz'
import BankAccountPage from '../Bank'

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<QuizContextProvider><QuizPage /></QuizContextProvider>} />
				<Route path="bank" element={<BankAccountPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
)

export default App
