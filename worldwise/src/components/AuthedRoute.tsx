/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useFakeAuth } from './FakeAuthContext'

const AuthedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const { isLoggedIn } = useFakeAuth()
    React.useEffect(() => {
        if (!isLoggedIn) navigate('/')
    }, [isLoggedIn])

	return isLoggedIn ? children : null
}

export default AuthedRoute
