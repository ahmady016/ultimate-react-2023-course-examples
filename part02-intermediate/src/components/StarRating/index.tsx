import React from 'react'
import styled from 'styled-components'

import { starRatingPropsList } from './data'

import StarRatingBox from './StarRatingBox'

const StarRatingPageContainer = styled.div`
    width:90vw;
	margin: 1rem auto;
	font-family: 'IBM Plex Mono', sans-serif;
    h2 {
        text-align: center;
        font-weight: 600;
        font-size: 1.5rem;
    }
`
const StarRatingPage: React.FC = () => {
	return (
        <StarRatingPageContainer>
            <h2>Star Rating Page</h2>
            {starRatingPropsList.map(rating => <StarRatingBox {...rating} />)}
        </StarRatingPageContainer>
    )
}

export default StarRatingPage
