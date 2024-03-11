/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import { City, EMPTY_CITY, GeoPosition, getGeonameId } from './helpers'

/*
	hook to set search params while preserve the current pathname in the url
	used when you want to set search params from a fixed component [ie not in the router outlet]
	and you want to preserve the current pathname as well
*/
export const useSetSearchParams = () => {
	const navigate = useNavigate()
	return (pathname: string, params: Record<string, string>) => navigate({ pathname, search: `?${createSearchParams(params)}` })
}
export function useUrlPosition() {
	const [searchParams] = useSearchParams()
	return [searchParams.get('lat'), searchParams.get('lng')] as const
}

const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
export function useFetchCityGeocoding() {
	const [searchParams] = useSearchParams()
	const [isGeocodingLoading, setIsGeocodingLoading] = React.useState(false)
	const [geocodingError, setGeocodingError] = React.useState('')
	const [city, setCity] = React.useState<City>(EMPTY_CITY)

	const fetchCityGeocoding = React.useCallback(async (lat: number, lng: number) => {
		setIsGeocodingLoading(true)
		setGeocodingError('')
		try {
			const res = await fetch(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
			const data = await res.json()
			if (!data.countryCode)
				throw new Error("That doesn't seem to be a City. Click somewhere else")
			const geoName = data.city || data.locality || ''
			setCity({
				id: getGeonameId(geoName, data.localityInfo.informative),
				cityName: geoName,
				countryName: data.countryName,
				countryCode: data.countryCode,
				date: new Date().toISOString(),
				notes: '',
				position: { lat, lng },
			})
		} catch (error) {
			setGeocodingError((error as Error).message)
		} finally {
			setIsGeocodingLoading(false)
		}
	}, [])

	React.useEffect(() => {
		const [lat, lng] = [searchParams.get('lat'), searchParams.get('lng')]
		if(lat && lng)
			fetchCityGeocoding(Number(lat), Number(lng))
	}, [searchParams])

	return {
		isGeocodingLoading,
		geocodingError,
		city,
	}
}
export function useFetchGeolocation() {
	const [isGeoLocationLoading, setIsGeoLocationLoading] = React.useState(false)
	const [geoLocationError, setGeoLocationError] = React.useState('')
	const [geoPosition, setGeoPosition] = React.useState<GeoPosition | undefined>(undefined)

	const getCurrentLocation = React.useCallback(() => {
		if (!navigator.geolocation)
			return setGeoLocationError('Your browser does not support geolocation')

		setIsGeoLocationLoading(true)
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setGeoPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude })
				setIsGeoLocationLoading(false)
			},
			(error) => {
				setGeoLocationError(error.message)
				setIsGeoLocationLoading(false)
			}
		)
	}, [])

	return {
		getCurrentLocation,
		isGeoLocationLoading,
		geoLocationError,
		geoPosition,
	}
}
