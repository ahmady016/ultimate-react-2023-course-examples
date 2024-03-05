/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import styled from 'styled-components'

import Button from '../../components/Button'
import { useSetSearchParams } from '../hooks'

const AppMapContainer = styled.div`
	flex: 1;
	width: 95%;
	height: 100%;
	padding: 1rem;
	background-color: var(--color-dark--2);
	position: relative;
`
const AppMap: React.FC = () => {
	const [searchParams] = useSearchParams()
	const setSearchParams = useSetSearchParams()
	const { pathname } = useLocation()
	const changeUrlPosition = React.useCallback(() => {
		setSearchParams(pathname, { lat: faker.address.latitude(), lng: faker.address.longitude() })
	}, [pathname])

	const navigate = useNavigate()
	const navigateToAddCityForm = React.useCallback(() => { navigate('add-city') }, [])

	return (
		<AppMapContainer>
			<h2>The World Map</h2>
			<h3>
				Position: {searchParams.get('lat')}, {searchParams.get('lng')}
			</h3>
			<Button type="button" variant="back" onClick={navigateToAddCityForm}>
				Go To Add City Form
			</Button>
			<Button type="button" variant="primary" onClick={changeUrlPosition}>
				Change Geo Position
			</Button>
		</AppMapContainer>
	)
}

export default AppMap
