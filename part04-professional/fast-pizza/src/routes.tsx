import { createBrowserRouter } from 'react-router-dom'

import AppLayout from './layouts/AppLayout'
import ErrorBox from './components/Error'

import HomePage from './layouts/HomePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorBox />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '*',
                element: <ErrorBox />
            }
        ]
    }
])

export default router
