import Flags from 'country-flag-icons/react/3x2'
import { faker } from '@faker-js/faker'
import { LatLngExpression } from 'leaflet'

export type Country = {
	name: string
	code: string
}
export type GeoPosition = {
	lat: number
	lng: number
}
export type City = {
	id: string
	cityName: string
	countryName: string
	countryCode: string
	date: string
	notes: string
	position: GeoPosition
}
export type GeoInfo = {
	name: string
	description: string
	order: number
	wikidataId?: string
	geonameId?: number
}
export const EMPTY_CITY: City = {
	id: '',
	cityName: '',
	countryName: '',
	countryCode: '',
	date: new Date().toISOString(),
	notes: '',
	position: {
		lat: 0,
		lng: 0
	}
}
export const STARTER_GEO_POSITION: LatLngExpression = {
	lat: 40,
	lng: 0
}
export function getFakeUser() {
	return {
		name: faker.name.fullName(),
		avatar: faker.image.avatar()
	}
}
export function getFakePosition() {
	return {
		lat: faker.address.latitude(),
		lng: faker.address.longitude()
	}
}
export function getGeoPosition(lat: string | null, lng: string | null) : LatLngExpression {
	return (lat && lng)
		?	{ lat: Number(lat), lng: Number(lng) }
		:	{ ...STARTER_GEO_POSITION }
}
export function getGeonameId(geoName: string, geoInfo: GeoInfo[]) {
	const geonameIds = geoInfo.reduce((acc, info) => {
		if(info.geonameId) acc[info.name] = info.geonameId
		return acc
	}, {} as Record<string, number>)
	return (
		geonameIds[geoName] ||
		Object.values(geonameIds).pop() ||
		Date.now()
	).toString()
}
export function countryCodeToFlagComponent(countryCode: string) {
	return Flags[countryCode.toUpperCase() as keyof typeof Flags]
}
export function formatDate(date: string) {
	return new Intl
        .DateTimeFormat('en-gb', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        .format(new Date(date))
}
export function countriesFromCities(cities: City[]): Record<string, Country> {
	return cities.reduce((countries, city) => {
		countries[city.countryCode] = { name: city.countryName, code: city.countryCode }
		return countries
	}, {} as Record<string, Country>)
}
export function getFirstWords(input: string, n: number) {
	return input.split(' ').slice(0, n).join(' ')
}
