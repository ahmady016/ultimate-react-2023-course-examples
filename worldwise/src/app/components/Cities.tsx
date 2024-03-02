/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { City, formatDate, countryCodeToFlagComponent } from '../helpers'
import { useCities } from '../CitiesContext'

import Spinner from '../../components/Spinner'
import Message from '../../components/Message'

const CityItemContainer = styled.li`
	padding: 0 0.25rem;
	a, a:link, a:visited {
		cursor: pointer;
		text-decoration: none;
		padding: 0.5rem;
		border-left: 5px solid var(--color-brand--2);
		border-radius: 10px;
		background-color: var(--color-dark--2);
		color: inherit;
		display: flex;
		align-items: center;
		gap: 1rem;
		&:hover, &.active {
			border: 2px solid var(--color-brand--2);
			border-left: 5px solid var(--color-brand--2);
		}
		svg {
			width: 2rem;
			line-height: 1;
		}
		h3 {
			margin-right: auto;
			font-size: 1rem;
			font-weight: 600;
		}
		time {
			font-size: 1rem;
		}
		button {
			cursor: pointer;
			height: 2rem;
			aspect-ratio: 1;
			border: none;
			border-radius: 50%;
			background-color: var(--color-dark--1);
			color: var(--color-light--2);
			font-size: 1.25rem;
			font-weight: 400;
			transition: all 0.2s;
			&:hover {
				background-color: var(--color-brand--1);
				color: var(--color-dark--1);
			}
		}
	}
`
const CityItem: React.FC<City> = ({ id, cityName, countryCode, date, position }) => {
	const CountryFlag = countryCodeToFlagComponent(countryCode)
	const { city, deleteCity } = useCities()
	const handleDeleteCity = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		deleteCity(id)
	}, [deleteCity, id])

	return (
		<CityItemContainer>
			<Link
				className={`${city?.id === id ? "active" : ""}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<CountryFlag />
				<h3>{cityName}</h3>
				<time>({formatDate(date)})</time>
				<button onClick={handleDeleteCity}>&times;</button>
			</Link>
		</CityItemContainer>
	)
}

const CitiesContainer = styled.ul`
	width: 100%;
	height: 70vh;
	margin: 0.75rem 0;
	list-style: none;
	overflow-y: auto;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`
const Cities: React.FC = () => {
	const { fetchCities, isLoading, error, cities } = useCities()
	React.useEffect(() => { fetchCities() }, [])

	if (isLoading) return <Spinner />

	if (error) return <Message type="error" text={error} />

	if(!cities.length) return <Message type="info" text="No City Found! Add your first city by clicking on a city on the map" />

	return (
		<CitiesContainer className='scroll'>
			{cities.map(city => <CityItem key={city.id} {...city} /> )}
		</CitiesContainer>
	)
}

export default Cities
