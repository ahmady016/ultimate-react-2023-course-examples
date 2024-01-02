import React from 'react'
import { WiBarometer } from 'react-icons/wi'
import styled from 'styled-components'

import { useLocalStorageState } from '../../hooks/useLocalStorageState'
import { useFetchWeather } from './data'

import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import SearchLocation from './SearchLocation'
import DaysList from './DaysList'

const WeatherPageContainer = styled.div`
    width:93vw;
	margin: auto;
    padding: 2rem 0;
    & > div {
        min-height: 66vh;
        padding: 1.25rem 0;
        border: 2px solid #777;
        outline: 2px solid #777;
        outline-offset: 1rem;
        font-family: 'IBM Plex Mono', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: evenly;
        gap: 1.25rem;
        h2 {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.6rem;
            text-align: center;
            font-weight: 600;
            font-size: 1.5rem;
            color: #0e0a75;
            svg {
                font-size: 2.5rem;
                margin-top: 0.25rem;
            }
        }
        input {
            width: 33rem;
            padding: 1rem 1.5rem;
            border: 1px solid #acacac;
            border-radius: 0.7rem;
            font-size: 1.25rem;
            color: #555;
            &:focus {
                outline: none;
                box-shadow: 0 0.75rem 0.75rem rgba(120, 120, 120, 0.25);
                transform: translateY(-2px);
            }
            &::placeholder {
                color: #555;
            }
        }
    }
`
const WeatherPage: React.FC = () => {
    const [location, setLocation] = useLocalStorageState('WEATHER_LOCATION', '')
    const changeLocation = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | string) =>
            (typeof e === 'string')
                ? setLocation(e)
                : setLocation(e.currentTarget.value)
    , [setLocation])

    const { isLoading, error, weatherList, displayLocation, countryCode } = useFetchWeather(location)
	return (
        <WeatherPageContainer>
            <div>
                <h2>
                    <WiBarometer />
                    Classy Weather
                </h2>
                <SearchLocation location={location} changeLocation={changeLocation} />
                {isLoading && <Spinner size={8} align='center' marginTop={14} />}
                {error && <Alert type='danger'>{error}</Alert>}
                {!isLoading && !error && weatherList &&
                    <DaysList
                        weatherList={weatherList}
                        displayLocation={displayLocation}
                        countryCode={countryCode}
                    />
                }
            </div>
        </WeatherPageContainer>
    )
}

export default WeatherPage
