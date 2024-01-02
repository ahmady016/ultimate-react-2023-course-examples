import React from 'react'
import styled from 'styled-components'

import { countryCodeToFlagComponent, Weather } from './data'
import DayItem from './DayItem'

const DaysListContainer = styled.div`
    width: 95%;
    margin: auto;
    & > div {
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        h3 {
            text-align: center;
            font-weight: 600;
            font-size: 1.25rem;
            color: #403e80;
        }
        svg {
            width: 2rem;
        }
    }
    ul {
        list-style: none;
        display: flex;
        gap: 1.5rem;
        li {
            cursor: pointer;
            width: 100%;
            padding: 2rem 1rem;
            background-color: #bdcae7;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.1rem;
            svg {
                font-size: 2.25rem;
                color: #252470;
            }
        }
    }
`
type DaysListProps = {
    weatherList: Weather[]
    displayLocation: string
    countryCode: string
}
const DaysList: React.FC<DaysListProps> = ({ weatherList, displayLocation, countryCode }) => {
    const CountryFlag = countryCodeToFlagComponent(countryCode)
	return (
        <DaysListContainer>
            <div>
                <CountryFlag />
                <h3>{displayLocation}</h3>
            </div>
            <ul>
                {weatherList.map(weather => <DayItem key={weather.date} {...weather} />)}
            </ul>
        </DaysListContainer>
    )
}

export default DaysList
