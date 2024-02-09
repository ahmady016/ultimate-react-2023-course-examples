import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { QuizContextProvider } from '../Quiz/QuizContext'

import AppLayout from './AppLayout'
import QuizPage from '../Quiz'
import BankAccountPage from '../Bank'
import AtomicBlogPage from '../AtomicBlog'
import WorkoutTimerPage from '../WorkoutTimer'

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<QuizContextProvider><QuizPage /></QuizContextProvider>} />
				<Route path="bank" element={<BankAccountPage />} />
				<Route path="blog" element={<AtomicBlogPage />} />
				<Route path="workout" element={<WorkoutTimerPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
)

export default App
