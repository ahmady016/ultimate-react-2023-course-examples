import React from 'react'
import styled from 'styled-components'

import CurrencyConverter from './CurrencyConverter'

const CurrencyConverterPageContainer = styled.div`
    width:80vw;
	margin: auto;
    padding-top: 2rem;
	font-family: 'IBM Plex Mono', sans-serif;
    h2 {
        text-align: center;
        font-weight: 600;
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }
`
const CurrencyConverterPage: React.FC = () => {
	return (
        <CurrencyConverterPageContainer>
            <h2>Currency Converter</h2>
            <CurrencyConverter />
        </CurrencyConverterPageContainer>
    )
}

export default CurrencyConverterPage
