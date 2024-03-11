/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { countryCodeToFlagComponent, formatDate } from '../helpers'
import { useCities } from '../CitiesContext'

import Spinner from '../../components/Spinner'
import Message from '../../components/Message'
import BackButton from '../../components/BackButton'

const CityDetailsContainer = styled.div`
	margin-bottom: 1.75rem;
	padding: 2rem;
	border-radius: 10px;
	background-color: var(--color-dark--2);
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
	& > div {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		font-size: 1rem;
		h6 {
			font-size: 0.9rem;
			text-transform: uppercase;
			font-weight: 900;
			color: var(--color-light--1);
		}
		h3 {
			font-size: 1.5rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			svg {
				width: 4rem;
			}
		}
		a, a:link, a:visited {
			text-decoration: none;
			color: var(--color-brand--2);
			&:hover {
				text-decoration: underline;
				color: var(--color-brand--1);
			}
		}
	}
	& > div:last-of-type {
		align-items: flex-end;
	}
`
const CityDetails: React.FC = () => {
	const { id } = useParams()
	const { fetchCity, isLoading, error, city } = useCities()
	React.useEffect(() => { if (id) fetchCity(id) }, [id])

	if (isLoading) return <Spinner />

	if (error) return <Message type="error" text={error} />

	if (!city) return <Message type="info" text={`No City With Id: ${id} Found!`} />

	const { countryCode, cityName, date, notes } = city
	const CountryFlag = countryCodeToFlagComponent(countryCode)
	return (
		<CityDetailsContainer className='scroll'>
			<div>
				<h6>City Name</h6>
				<h3>
					<CountryFlag />
					<span>{cityName}</span>
				</h3>
			</div>
			<div>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date)}</p>
			</div>
			{notes && (
				<div>
					<h6>Your Notes</h6>
					<p>{notes}</p>
				</div>
			)}
			<div>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer"
				>
					&rarr; Check out {cityName} on Wikipedia
				</a>
			</div>
			<div>
				<BackButton to="/app/cities" />
			</div>
		</CityDetailsContainer>
	)
}

export default CityDetails
