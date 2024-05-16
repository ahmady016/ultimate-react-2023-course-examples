import axios from 'axios'

const BASE_GEOCODING_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
export type GeoAddressResponse = {
	continent: string
	continentCode: string
	countryName: string
	countryCode: string
	principalSubdivision: string
	principalSubdivisionCode: string
	city: string
	locality: string
	postcode: string
}
export type GeoPosition = {
	latitude: number
	longitude: number
}
export type GeoAddress = {
	position: GeoPosition
	address: string
}

async function getAddress(position: GeoPosition) {
	try {
		const res = await axios.get<GeoAddressResponse>(
			`${BASE_GEOCODING_URL}?latitude=${position.latitude}&longitude=${position.longitude}`
		)
		return res.data
	} catch (error) {
		throw Error('Failed Getting Geo Address')
	}
}
function getPosition(): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
}

export async function fetchUserAddress() {
	// 1) We get the user's geolocation position
	const positionResponse = await getPosition()
	const position = {
		latitude: positionResponse.coords.latitude,
		longitude: positionResponse.coords.longitude,
	}
	// 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
	const addressResponse = await getAddress(position)
	const address = `${addressResponse?.locality}, ${addressResponse?.city} ${addressResponse?.postcode}, ${addressResponse?.countryName}`
	// 3) Then we return an object with the data that we are interested in.
	return { position, address } as GeoAddress
}
