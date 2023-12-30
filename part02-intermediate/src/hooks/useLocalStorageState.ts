/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export function useLocalStorageState<T>(key: string, initialState: T) {
	const [state, setState] = React.useState<T>(() => {
		const storedState = localStorage.getItem(key)
		if (storedState) {
			try {
				return JSON.parse(storedState)
			} catch (err) {
				return storedState
			}
		} else {
			return initialState
		}
	})

	React.useEffect(() => {
		localStorage.setItem(key, typeof state === 'object' ? JSON.stringify(state) : String(state))
	}, [key, state])

	return [state, setState] as const
}
