import Flags from 'country-flag-icons/react/3x2'

export type Country = {
	name: string
	code: string
}
export type GeoPosition = {
	lat: number
	lng: number
}
export type City = {
	id: number
	cityName: string
	countryName: string
	countryCode: string
	date: string
	notes: string
	position: GeoPosition
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
