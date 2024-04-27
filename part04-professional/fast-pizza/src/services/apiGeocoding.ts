import axios from 'axios'

type GeoPosition = {
	latitude: number
	longitude: number
}
const BASE_GEOCODING_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
export async function getAddress(position: GeoPosition) {
	try {
		const res = await axios.get(
			`${BASE_GEOCODING_URL}?latitude=${position.latitude}&longitude=${position.longitude}`
		)
		return res.data
	} catch (error) {
		throw Error('Failed Getting Geo Address')
	}
}
