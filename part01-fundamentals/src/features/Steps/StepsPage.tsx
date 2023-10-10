import React from 'react'
import styled from 'styled-components'

import { steps } from './data'

import StepsBox from './StepsBox'

const StepsPageContainer = styled.div`
	font-family: 'Roboto Mono', sans-serif;
	color: #333;
`
const StepsPage: React.FC = () => (
	<StepsPageContainer>
        {Object
            .entries(steps)
            .map(([id, step]) => <StepsBox key={id} title={step.title} messages={step.messages} />)
        }
	</StepsPageContainer>
)

export default StepsPage
