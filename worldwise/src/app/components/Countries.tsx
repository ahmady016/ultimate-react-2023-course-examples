/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'

import { useCities } from '../CitiesContext'
import { Country, countriesFromCities, countryCodeToFlagComponent } from '../helpers'

import Spinner from '../../components/Spinner'
import Message from '../../components/Message'

const CountryItemContainer = styled.li`
	padding: 1rem 2rem;
	border-radius: 10px;
	border-left: 5px solid var(--color-brand--1);
	background-color: var(--color-dark--2);
	font-size: 1rem;
	font-weight: 600;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.25rem;
	svg {
		width: 3rem;
		font-size: 2rem;
		line-height: 1;
	}
`
const CountryItem: React.FC<Country> = ({ name, code }) => {
	const CountryFlag = countryCodeToFlagComponent(code)
	return (
		<CountryItemContainer>
			<CountryFlag />
			<span>{name}</span>
		</CountryItemContainer>
	)
}

const CountriesContainer = styled.ul`
	width: 100%;
	height: 65vh;
	list-style: none;
	overflow-y: auto;
	overflow-x: hidden;
	padding-right: 0.75rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-content: start;
	gap: 1rem;
`
const Countries: React.FC = () => {
	const { fetchCities, isLoading, error, cities } = useCities()
	React.useEffect(() => { fetchCities() }, [])

	if (isLoading) return <Spinner />

	if (error) return <Message type="error" text={error} />

	if(!cities.length) return <Message type="info" text="No City Found! Add your first city by clicking on a city on the map" />

	const countries = Object.values(countriesFromCities(cities))
	return (
		<CountriesContainer className='scroll'>
			{countries.map(country => <CountryItem key={country.code} {...country} />)}
		</CountriesContainer>
	)
}

export default Countries
