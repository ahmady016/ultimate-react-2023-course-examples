import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom'

import Loader from '../components/Loader'
import Header from './Header'
import Footer from './Footer'
import CartStatusBar from '../features/cart/CartStatusBar'

const AppLayout: React.FC = () => {
	const navigation = useNavigation()
	const isLoading = navigation.state === 'loading'
	return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {isLoading && <Loader />}
            <Header />
            <div className="overflow-auto">
                <main className="mx-auto max-w-3xl">
                    <Outlet />
                </main>
            </div>
            <CartStatusBar />
            <Footer />
        </div>
    )
}

export default AppLayout
