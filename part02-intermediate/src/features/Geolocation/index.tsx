/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'

import { useGeolocation } from './useGeolocation'

import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'

const GeolocationPageContainer = styled.div`
    width:80vw;
	margin: auto;
    padding-top: 2rem;
	font-family: 'IBM Plex Mono', sans-serif;
    h2 {
        margin-bottom: 2rem;
        text-align: center;
        font-weight: 600;
        font-size: 1.5rem;
        color: #0e0a75;
    }
    div {
        text-align: center;
        button {
            height: 3.75rem;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1.25rem;
        }
        p {
            margin: 1rem 0;
            font-size: 1.2rem;
            a, span {
                display: inline-block;
                margin: 0 1rem;
                font-size: 1.75rem;
                font-weight: 500;
                color: #0e0a75;
            }
        }
    }
`
const GeolocationPage: React.FC = () => {
    const { getPosition, isLoading, error, position } = useGeolocation()
	const [countClicks, setCountClicks] = React.useState(0)
    const handleClick = React.useCallback(() => {
        setCountClicks(c => c + 1)
        getPosition()
    }, [])

	return (
		<GeolocationPageContainer>
            <h2>Geolocation Page</h2>
            <div>
                <button
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    type="button"
                    onClick={handleClick}
                    disabled={isLoading}
                >
                    Get my position
                </button>
                {isLoading && <Spinner size={8} align='center' />}
                {error && <Alert type='danger'>{error}</Alert>}
                {!isLoading && !error && position && (
                    <p>
                        Your GPS position:
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://www.openstreetmap.org/#map=16/${position.lat}/${position.lng}`}
                        >
                            {position.lat}, {position.lng}
                        </a>
                    </p>
                )}
                <p>You requested position <span>{countClicks}</span> times</p>
            </div>
		</GeolocationPageContainer>
	)
}

export default GeolocationPage
