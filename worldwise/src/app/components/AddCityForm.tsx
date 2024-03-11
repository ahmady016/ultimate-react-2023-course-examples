/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

import { useCities } from '../CitiesContext'
import { useFetchCityGeocoding } from '../hooks'
import { City, EMPTY_CITY, countryCodeToFlagComponent } from '../helpers'

import Spinner from '../../components/Spinner'
import Message from '../../components/Message'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'

const AddCityFormContainer = styled.form<{ $isCreateCityLoading: boolean }>`
	margin-top: -4rem;
	margin-bottom: 2.25rem;
	padding: 2rem;
	border-radius: 10px;
	background-color: var(--color-dark--2);
	display: flex;
	flex-direction: column;
	gap: 1rem;
	opacity: ${({ $isCreateCityLoading }) => $isCreateCityLoading ? 0.3 : 1};
	& > div {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		label {
			font-size: 1rem;
		}
		input {
			font-size: 1rem;
		}
		& > svg {
			width: 2rem;
			position: absolute;
			right: 1rem;
			top: 2.75rem;
		}
		textarea {
			font-size: 1rem;
		}
		button[disabled] {
			pointer-events: none;
			border: 1px solid var(--color-light--1);
			background-color: var(--color-light--1);
			color: var(--color-dark--0);
		}
		div.react-datepicker-wrapper {
			div.react-datepicker__input-container {
				svg {
					cursor: pointer;
					fill: #006827;
				}
				input {
					padding-left: 2rem;
				}
			}
		}
	}
	.buttons {
		margin-top: 0.75rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		button {
			flex-basis: 40%;
		}
	}
`
const AddCityForm: React.FC = () => {
	const [formState, setFormState] = React.useState<City>({ ...EMPTY_CITY })
	const changeDate = React.useCallback((date: Date | null) => {
		setFormState(formState => ({ ...formState, date: date ? date.toISOString() : '' }) )
	}, [])
	const formChangeHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormState(formState => ({ ...formState, [e.target.name]: e.target.value }) )
	}, [])

	const navigate = useNavigate()
	const { createCity, isLoading } = useCities()
	const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log("AddCityForm: handleSubmit -> formState:", formState)
		if(formState.cityName && formState.date) {
			await createCity(formState)
			navigate('/app/cities')
		}
	}, [formState])

	const { isGeocodingLoading, geocodingError, city } = useFetchCityGeocoding()
	const CountryFlag = (city && city.countryCode) ? countryCodeToFlagComponent(city.countryCode) : () => <></>
	React.useEffect(() => { setFormState(city) }, [city])

	if (isGeocodingLoading) return <Spinner />

	if (geocodingError) return <Message type="error" text={geocodingError} />

	if (!city) return <Message type="warning" text="Start by clicking somewhere on the map" />

	return (
		<AddCityFormContainer
			$isCreateCityLoading={isLoading}
			onSubmit={handleSubmit}
		>
			<div>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					name="cityName"
					value={formState.cityName}
					onChange={formChangeHandler}
				/>
				<CountryFlag />
			</div>
			<div>
				<label htmlFor="date">When did you go to {formState.cityName}?</label>
				<DatePicker
					id="date"
					name="date"
					dateFormat="dd/MM/yyyy"
					selected={formState.date ? new Date(formState.date) : null}
					onChange={changeDate}
					showMonthDropdown
					showYearDropdown
					showIcon
					toggleCalendarOnIconClick
				/>
			</div>
			<div>
				<label htmlFor="notes">Notes</label>
				<textarea
					id="notes"
					name="notes"
					value={formState.notes}
					onChange={formChangeHandler}
				/>
			</div>
			<div className="buttons">
				<BackButton to="/app/cities" />
				<Button type="submit" variant="primary" disabled={isLoading}>Submit</Button>
			</div>
		</AddCityFormContainer>
	)
}

export default AddCityForm
