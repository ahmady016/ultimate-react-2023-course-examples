import { createBrowserRouter } from 'react-router-dom'

import AppLayout from './layouts/AppLayout'
import ErrorBox from './components/Error'

import HomePage from './layouts/HomePage'
import PizzaMenuPage, { PizzaMenuPageLoader } from './features/menu/PizzaMenuPage'
import CartPage from './features/cart/CartPage'
import OrderPage from './features/order/OrderPage'
import CreateOrderForm from './features/order/CreateOrderForm'

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
                path: 'pizza-menu',
                element: <PizzaMenuPage />,
                loader: PizzaMenuPageLoader,
                errorElement: <ErrorBox />
            },
            {
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'order/:orderId',
                element: <OrderPage />
            },
            {
                path: 'order/new',
                element: <CreateOrderForm />
            },
            {
                path: '*',
                element: <ErrorBox />
            }
        ]
    }
])

export default router
