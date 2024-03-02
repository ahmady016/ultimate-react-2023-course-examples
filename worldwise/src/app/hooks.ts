import React from 'react'
import { useSearchParams } from 'react-router-dom'

import { GeoPosition } from './helpers'

export function useGeolocation() {
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState('')
	const [position, setPosition] = React.useState<GeoPosition | undefined>(undefined)

	const getPosition = React.useCallback(() => {
		if (!navigator.geolocation)
			return setError('Your browser does not support geolocation')

		setIsLoading(true)
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
				setIsLoading(false)
			},
			(error) => {
				setError(error.message)
				setIsLoading(false)
			}
		)
	}, [])

	return {
		getPosition,
		isLoading,
		error,
		position,
	}
}

export function useUrlPosition() {
	const [searchParams] = useSearchParams()
	return [searchParams.get('lat'), searchParams.get('lng')]
}
