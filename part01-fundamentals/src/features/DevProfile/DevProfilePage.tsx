import React from 'react'
import styled from 'styled-components'

import { developers } from './data'

import ProfileCard from './ProfileCard'

const DevProfilesContainer = styled.div`
    width: 90%;
    margin: 1rem auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 10px;
`
const DevProfilePage: React.FC = () => (
    <DevProfilesContainer>
        {developers.map(developer => <ProfileCard key={developer.id} {...developer} />)}
    </DevProfilesContainer>
)

export default DevProfilePage
