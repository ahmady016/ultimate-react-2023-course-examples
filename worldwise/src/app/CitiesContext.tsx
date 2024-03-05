/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'

import { City } from './helpers'

enum CitiesActionTypes {
	CITIES_LOADING = 'cities/loading',
	CITIES_ERROR = 'cities/error',
	CITIES_LIST_LOADED = 'cities/listLoaded',
	CITIES_CITY_LOADED = 'cities/cityLoaded',
	CITIES_CITY_CREATED = 'cities/cityCreated',
	CITIES_CITY_DELETED = 'cities/cityDeleted',
}
type CitiesLoadingAction = {
	type: CitiesActionTypes.CITIES_LOADING
}
type CitiesErrorAction = {
	type: CitiesActionTypes.CITIES_ERROR
	payload: string
}
type CitiesListLoadedAction = {
	type: CitiesActionTypes.CITIES_LIST_LOADED
	payload: City[]
}
type CitiesCityLoadedAction = {
	type: CitiesActionTypes.CITIES_CITY_LOADED
	payload: City
}
type CitiesCityCreatedAction = {
	type: CitiesActionTypes.CITIES_CITY_CREATED
	payload: City
}
type CitiesCityDeletedAction = {
	type: CitiesActionTypes.CITIES_CITY_DELETED
	payload: string
}
type CitiesAction =
	| CitiesLoadingAction
	| CitiesErrorAction
	| CitiesListLoadedAction
	| CitiesCityLoadedAction
	| CitiesCityCreatedAction
	| CitiesCityDeletedAction

type CitiesContextState = {
	isLoading: boolean
	error: string
	cities: City[]
	city: City | undefined
}
const initialState: CitiesContextState = {
	isLoading: false,
	error: '',
	cities: [],
	city: undefined,
}
export function citiesReducer(state: CitiesContextState, action: CitiesAction) {
	switch (action.type) {
		case CitiesActionTypes.CITIES_LOADING:
			return { ...state, isLoading: true }
		case CitiesActionTypes.CITIES_ERROR:
			return { ...state, isLoading: false, error: action.payload }
		case CitiesActionTypes.CITIES_LIST_LOADED:
			return { ...state, isLoading: false, cities: action.payload }
		case CitiesActionTypes.CITIES_CITY_LOADED:
			return { ...state, isLoading: false, city: action.payload }
		case CitiesActionTypes.CITIES_CITY_CREATED:
			return {
				...state,
				cities: [...state.cities, action.payload],
				city: action.payload,
				isLoading: false,
			}
		case CitiesActionTypes.CITIES_CITY_DELETED:
			return {
				...state,
				cities: state.cities.filter((city) => city.id !== action.payload),
				city: undefined,
				isLoading: false,
			}
		default:
			throw new Error('Unknown Action Type')
	}
}

type CitiesContextValue = CitiesContextState & {
	fetchCities: () => Promise<void>
	fetchCity: (cityId: string) => Promise<void>
	createCity: (newCity: Omit<City, 'id'>) => Promise<void>
	deleteCity: (cityId: string) => Promise<void>
}
const CitiesContextInitialValue: CitiesContextValue = {
	...initialState,
	fetchCities: () => Promise.resolve(),
	fetchCity: () => Promise.resolve(),
	createCity: () => Promise.resolve(),
	deleteCity: () => Promise.resolve(),
}
const CitiesContext = React.createContext<CitiesContextValue>(CitiesContextInitialValue)
const BASE_URL = 'http://localhost:7000'
const CITIES_URL = `${BASE_URL}/cities`
const CitiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = React.useReducer(citiesReducer, initialState)

	const fetchCities = React.useCallback(async () => {
		try {
			dispatch({ type: CitiesActionTypes.CITIES_LOADING })
			const response = await fetch(CITIES_URL)
			const cities = await response.json()
			dispatch({
				type: CitiesActionTypes.CITIES_LIST_LOADED,
				payload: cities,
			})
		} catch (error: unknown) {
			dispatch({
				type: CitiesActionTypes.CITIES_ERROR,
				payload: `There was an error loading the cities: ${(error as Error).message}`,
			})
		}
	}, [])
	const fetchCity = React.useCallback(async (cityId: string) => {
		try {
			dispatch({ type: CitiesActionTypes.CITIES_LOADING })
			const response = await fetch(`${CITIES_URL}/${cityId}`)
			if(!response.ok)
				throw new Error("City doesn't exist")
			const city = await response.json()
			dispatch({
				type: CitiesActionTypes.CITIES_CITY_LOADED,
				payload: city,
			})
		} catch (error: unknown) {
			dispatch({
				type: CitiesActionTypes.CITIES_ERROR,
				payload: `There was an error loading the city: ${(error as Error).message}`,
			})
		}
	}, [])
	const createCity = React.useCallback(async (newCity: Omit<City, 'id'>) => {
		try {
			dispatch({ type: CitiesActionTypes.CITIES_LOADING })
			const res = await fetch(CITIES_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newCity),
			})
			const data = await res.json()
			dispatch({ type: CitiesActionTypes.CITIES_CITY_CREATED, payload: data })
		} catch (error: unknown) {
			dispatch({
				type: CitiesActionTypes.CITIES_ERROR,
				payload: `There was an error creating the city: ${(error as Error).message}`,
			})
		}
	}, [])
	const deleteCity = React.useCallback(async (cityId: string) => {
		try {
			dispatch({ type: CitiesActionTypes.CITIES_LOADING })
			await fetch(`${CITIES_URL}/${cityId}`, { method: 'DELETE' })
			dispatch({ type: CitiesActionTypes.CITIES_CITY_DELETED, payload: cityId })
		} catch (error: unknown) {
			dispatch({
				type: CitiesActionTypes.CITIES_ERROR,
				payload: `There was an error deleting the city: ${(error as Error).message}`,
			})
		}
	}, [])

	const value = React.useMemo(() => ({
		...state,
		fetchCities,
		fetchCity,
		createCity,
		deleteCity,
	}), [state])

	return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
}
function useCities() {
	const context = React.useContext(CitiesContext)
	if (context === undefined)
		throw new Error('CitiesContext Was Used Outside The CitiesProvider')
	return context
}

export { CitiesProvider, useCities }
