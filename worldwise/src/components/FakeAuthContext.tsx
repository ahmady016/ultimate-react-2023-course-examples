/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { faker } from '@faker-js/faker'

export type User = {
	id: string
	name: string
	avatar: string
	email: string
	password: string
}
export const FAKE_USER: User = {
	id: faker.datatype.uuid(),
	name: faker.name.fullName(),
	avatar: faker.image.avatar(),
	email: faker.internet.email(),
	password: faker.internet.password(),
}

export type AuthState = {
    user: User | undefined
    isLoggedIn: boolean
	invalidCredentials: boolean
}
const initialAuthState = {
	user: undefined,
	isLoggedIn: false,
	invalidCredentials: false,
}
export enum AuthActions {
	INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
	LOGGED_IN = 'LOGGED_IN',
	LOGGED_OUT = 'LOGGED_OUT',
	RESET = 'RESET',
}
type AuthAction = {
    type:
		AuthActions.LOGGED_IN |
		AuthActions.LOGGED_OUT |
		AuthActions.INVALID_CREDENTIALS |
		AuthActions.RESET
}
function authReducer(state: AuthState, action: AuthAction) : AuthState {
	switch (action.type) {
		case AuthActions.INVALID_CREDENTIALS:
			return { ...state, invalidCredentials: true }
		case AuthActions.LOGGED_IN:
			return { ...state, user: FAKE_USER, isLoggedIn: true, invalidCredentials: false }
		case AuthActions.LOGGED_OUT:
		case AuthActions.RESET:
			return initialAuthState
		default:
			return state
	}
}

type FakeAuthContextValue = AuthState & {
    login: (email: string, password: string) => void
    logout: () => void
	reset: () => void
}
const initialAuthContextValue = {
    ...initialAuthState,
    login: () => {},
    logout: () => {},
	reset: () => {},
}
export const FakeAuthContext = React.createContext<FakeAuthContextValue>(initialAuthContextValue)
const FakeAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = React.useReducer(authReducer, initialAuthState)
    const login = React.useCallback((email: string, password: string) => {
        (email === FAKE_USER.email && password === FAKE_USER.password)
            ? dispatch({ type: AuthActions.LOGGED_IN })
			: dispatch({ type: AuthActions.INVALID_CREDENTIALS })
    }, [])
	const reset = React.useCallback(() => dispatch({ type: AuthActions.RESET }), [])
    const logout = React.useCallback(() => { dispatch({ type: AuthActions.LOGGED_OUT }) }, [])

    const value = React.useMemo(() => ({ ...state, login, logout, reset }), [state])
	return (
		<FakeAuthContext.Provider value={value}>
			{children}
		</FakeAuthContext.Provider>
	)
}
function useFakeAuth() {
	const context = React.useContext(FakeAuthContext)
	if (context === undefined)
		throw new Error('FakeAuthContext Was Used Outside FakeAuthProvider')
	return context
}

export { FakeAuthProvider, useFakeAuth }
