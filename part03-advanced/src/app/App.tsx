import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { QuizContextProvider } from '../Quiz/QuizContext'

import AppLayout from './AppLayout'
import QuizPage from '../Quiz'
import BankAccountPage from '../Bank'
import AtomicBlogPage from '../AtomicBlog'
import WorkoutTimerPage from '../WorkoutTimer'
import ReduxBankPage from '../ReduxBank'
import ReduxToolkitBankPage from '../ReduxToolkitBank'

import { Provider } from 'react-redux'
import { store } from '../ReduxBank/store'

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={
					<QuizContextProvider>
						<QuizPage />
					</QuizContextProvider>
				} />
				<Route path="bank" element={<BankAccountPage />} />
				<Route path="blog" element={<AtomicBlogPage />} />
				<Route path="workout" element={<WorkoutTimerPage />} />
				<Route path="redux-bank" element={
					<Provider store={store}>
						<ReduxBankPage />
					</Provider>
				} />
				<Route path="redux-toolkit-bank" element={<ReduxToolkitBankPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
)

export default App
