import { createBrowserRouter } from 'react-router-dom'

import AppLayout from './layouts/AppLayout'
import ErrorBox from './components/Error'

import HomePage from './layouts/HomePage'
import CartPage from './features/cart/CartPage'
import PizzaMenuPage, { PizzaMenuPageLoader } from './features/menu/PizzaMenuPage'
import OrderPage, { OrderPageLoader } from './features/order/OrderPage'
import CreateOrderForm, { createOrderFormAction } from './features/order/CreateOrderForm'
import { updateOrderPriorityAction } from './features/order/UpdateOrderPriority'

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
                path: 'cart',
                element: <CartPage />
            },
            {
                path: 'pizza-menu',
                element: <PizzaMenuPage />,
                loader: PizzaMenuPageLoader,
                errorElement: <ErrorBox />
            },
            {
                path: 'order/:orderId',
                element: <OrderPage />,
                loader: OrderPageLoader,
                action: updateOrderPriorityAction,
                errorElement: <ErrorBox />
            },
            {
                path: 'order/new',
                element: <CreateOrderForm />,
                action: createOrderFormAction,
                errorElement: <ErrorBox />
            },
            {
                path: '*',
                element: <ErrorBox />
            }
        ]
    }
])

export default router
