/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
	WiCloudy,
	WiDayCloudyGusts,
	WiDayLightning,
	WiDayRain,
	WiDayShowers,
	WiDaySleet,
	WiDaySnowThunderstorm,
	WiDaySunny,
	WiDaySunnyOvercast,
	WiRaindrop
} from 'react-icons/wi'
import Flags from 'country-flag-icons/react/3x2'

type GeoResponseResult = {
    id: number
    name: string
    latitude: number
    longitude: number
    elevation: number
    feature_code: string
    country_code: string
    admin1_id: number
    timezone: string
    population: number
    country_id: number
    country: string
    admin1: string
}
type GeoResponse = {
    results: GeoResponseResult[]
    generationtime_ms: number
}
type WeatherDailyUnits = {
    time: string
    weathercode: string
    temperature_2m_max: string
    temperature_2m_min: string
}
type WeatherDaily = {
    time: string[]
    weathercode: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
}
type WeatherResponse = {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    daily_units: WeatherDailyUnits
    daily: WeatherDaily
}

export function getWeatherIcon(weatherCode: number) {
	const icons = new Map<number[], React.ReactNode>([
		[[0], <WiDaySunny />],
		[[1], <WiDaySunnyOvercast />],
		[[2], <WiDayCloudyGusts />],
		[[3], <WiRaindrop />],
		[[45, 48], <WiCloudy />],
		[[51, 56, 61, 66, 80], <WiDaySleet />],
		[[53, 55, 63, 65, 57, 67, 81, 82], <WiDayShowers />],
		[[71, 73, 75, 77, 85, 86], <WiDayRain />],
		[[95], <WiDayLightning />],
		[[96, 99], <WiDaySnowThunderstorm />],
	])
	const arr = [...icons.keys()].find((key) => key.includes(weatherCode))
	if (!arr)
        return 'NOT FOUND'
	return icons.get(arr)
}
export function countryCodeToFlag(countryCode: string) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt(0))
	return String.fromCodePoint(...codePoints)
}
export function countryCodeToFlagComponent(countryCode: string) {
	return Flags[countryCode.toUpperCase() as keyof typeof Flags]
}
export function dateToWeekDay(dateStr: string) {
	const currentDate = new Date(dateStr)
	if (currentDate === new Date())
        return 'Today'
	return new Intl
        .DateTimeFormat('en', { weekday: 'short' })
        .format(currentDate)
}

export type Weather = {
	date: string
	code: number
	minTemperature: number
	maxTemperature: number
}
const WEATHER_BASE_URL = 'https://geocoding-api.open-meteo.com/v1'
function weatherDailyToWeatherList(weather: WeatherDaily) {
    return weather.time.map((date, i) => ({
        date,
        code: weather.weathercode[i],
        minTemperature: weather.temperature_2m_min[i],
        maxTemperature: weather.temperature_2m_max[i],
    }))
}
export function useFetchWeather(location: string) {
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState('')
    const [displayLocation, setDisplayLocation] = React.useState('')
	const [countryCode, setCountryCode] = React.useState('')
	const [weatherList, setWeatherList] = React.useState<Weather[] | undefined>(undefined)

	const geoAbortController = new AbortController()
	const weatherAbortController = new AbortController()
	async function fetchWeather() {
		setIsLoading(true)
		setError('')
		try {
            // (1) Getting location (geocoding)
			const geoResponse = await fetch(
                `${WEATHER_BASE_URL}/search?name=${location}`,
                { signal: geoAbortController.signal }
            )
			const geoData = await geoResponse.json() as unknown as GeoResponse
			if (!geoData.results)
                throw new Error('Location Not Found')

            const { name, country_code, latitude, longitude, timezone } = geoData.results[0]
            setDisplayLocation(name)
			setCountryCode(country_code)

            // (2) Getting actual weather
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
                { signal: weatherAbortController.signal }
            )
            const weatherData = await weatherResponse.json() as unknown as WeatherResponse
            if (!weatherData)
                throw new Error('Weather Info Not Found')

			setWeatherList(weatherDailyToWeatherList(weatherData.daily))
			setError('')
		} catch (error: any) {
			if (error.name !== 'AbortError') {
				console.error(error.message)
				setError(error.message)
			}
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
		if (location.length >= 3) {
			fetchWeather()
		} else {
			setIsLoading(false)
			setError('')
			setWeatherList(undefined)
		}

		return () => {
			geoAbortController.abort()
			weatherAbortController.abort()
		}
	}, [location])

	return {
		isLoading,
		error,
		weatherList,
        displayLocation,
		countryCode
	}
}
