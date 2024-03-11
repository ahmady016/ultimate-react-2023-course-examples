/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import styled from 'styled-components'

import { useCities } from '../CitiesContext'
import { useFetchGeolocation, useUrlPosition } from '../hooks'
import {
	City,
	STARTER_GEO_POSITION,
	getGeoPosition,
	countryCodeToFlagComponent,
} from '../helpers'

import Button from '../../components/Button'

const AppMapMarker: React.FC<City> = ({ cityName, countryCode, position }) => {
	const CountryFlag = countryCodeToFlagComponent(countryCode)
	return (
		<Marker position={position}>
			<Popup>
				<CountryFlag />
				<span>{cityName}</span>
			</Popup>
		</Marker>
	)
}
type UpdateMapCenterPositionProps = {
	position: LatLngExpression
}
const UpdateMapCenterPosition: React.FC<UpdateMapCenterPositionProps> = ({ position }) => {
	const map = useMap()
	map.setView(position)
	return null
}
const HandleMapClick: React.FC = () => {
	const navigate = useNavigate()
	const navigateToAddCityForm = React.useCallback((e: LeafletMouseEvent) => { navigate(`add-city?lat=${e.latlng.lat}&lng=${e.latlng.lng}`) }, [])
	useMapEvent('click', navigateToAddCityForm)
	return null
}
const AppMapContainer = styled.div`
	flex: 1;
	width: 95%;
	height: 100%;
	background-color: var(--color-dark--2);
	position: relative;
	div.leaflet-container  {
		width: 100%;
		height: 100%;
		div.leaflet-popup {
			div.leaflet-popup-content-wrapper {
				padding-right: 0.5rem;
				border-left: 0.25rem solid var(--color-brand--2);
				border-radius: 0.25rem;
				background-color: var(--color-dark--1);
				color: var(--color-light--2);
				div.leaflet-popup-content {
					span {
						display: block;
						margin-top: 0.25rem;
						text-align: center;
						font-size: 0.75rem;
						font-weight: 600;
						line-height: 1;
					}
				}
			}
			div.leaflet-popup-tip-container {
				div.leaflet-popup-tip {
					background-color: var(--color-dark--1);
				}
			}
		}
	}
`
const AppMap: React.FC = () => {
	const { fetchCities, cities } = useCities()
	React.useEffect(() => { fetchCities() }, [])

	const [lat, lng] = useUrlPosition()
	const [mapPosition, setMapPosition] = React.useState<LatLngExpression>(STARTER_GEO_POSITION)
	React.useEffect(() => { if(lat && lng) setMapPosition(getGeoPosition(lat, lng)) }, [lat, lng])

	const { getCurrentLocation, isGeoLocationLoading, geoPosition } = useFetchGeolocation()
	React.useEffect(() => { if(geoPosition) setMapPosition(geoPosition) }, [geoPosition])

	return (
		<AppMapContainer>
			<Button
				variant="position"
				onClick={getCurrentLocation}
				disabled={isGeoLocationLoading}
			>
				{isGeoLocationLoading ? 'Loading...' : 'Use Your Location'}
			</Button>
			<MapContainer
				center={mapPosition}
				zoom={5}
				scrollWheelZoom
			>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
			/>
				{cities.map(city => <AppMapMarker key={city.id} {...city} />)}
				<UpdateMapCenterPosition position={mapPosition} />
				<HandleMapClick />
			</MapContainer>
		</AppMapContainer>
	)
}

export default AppMap
