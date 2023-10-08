import React from 'react'
import styled from 'styled-components'

import { Developer } from './data'

import ProfilePhoto from './ProfilePhoto'
import ProfileInfo from './ProfileInfo'
import ProfileSkills from './ProfileSkills'

const ProfileCardContainer = styled.div`
    flex: 0 0 45%;
	border: 4px solid #222;
    font-family: "IBM Plex Mono", sans-serif;
    background-color: #f7f7f7;
    &::after {
        content: "";
        display: block;
    }
`
const ProfileCard: React.FC<Developer> = ({ name, photoName, title, description, skills }) => (
    <ProfileCardContainer>
        <ProfilePhoto photoName={photoName} name={name} />
        <ProfileInfo name={name} title={title} description={description} />
        <ProfileSkills skills={skills} />
    </ProfileCardContainer>
)

export default ProfileCard
