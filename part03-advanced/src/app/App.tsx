import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { QuizContextProvider } from '../Quiz/QuizContext'

import reduxBankStore from '../ReduxBank/store'
import reduxToolkitBankStore from '../ReduxToolkitBank/store'

import AppLayout from './AppLayout'
import QuizPage from '../Quiz'
import BankAccountPage from '../Bank'
import AtomicBlogPage from '../AtomicBlog'
import WorkoutTimerPage from '../WorkoutTimer'
import ReduxBankPage from '../ReduxBank'

const App: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route
					index
					element={
						<QuizContextProvider>
							<QuizPage />
						</QuizContextProvider>
					}
				/>
				<Route path="bank" element={<BankAccountPage />} />
				<Route path="blog" element={<AtomicBlogPage />} />
				<Route path="workout" element={<WorkoutTimerPage />} />
				<Route
					path="redux-bank"
					element={
						<Provider store={reduxBankStore}>
							<ReduxBankPage />
						</Provider>
					}
				/>
				<Route
					path="redux-toolkit-bank"
					element={
						<Provider store={reduxToolkitBankStore}>
							<ReduxBankPage />
						</Provider>
					}
				/>
			</Route>
		</Routes>
	</BrowserRouter>
)

export default App
