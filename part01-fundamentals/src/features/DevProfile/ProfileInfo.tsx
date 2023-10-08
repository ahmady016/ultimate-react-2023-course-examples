import React from 'react'
import styled from 'styled-components'

const ProfileInfoBox = styled.div`
	padding: 32px;
	padding-top: 24px;
	h2 {
        font-size: 2rem;
        font-wight: bold;
		margin-bottom: 10px;
	}
    h4 {
        margin-bottom: 16px;
        color: #666;
        font-size: 1.2rem;
        font-wight: bold;
    }
    p {
        color: #888
    }
`
type ProfileInfoProps = {
	name: string
	title: string
	description: string
}
const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, title, description }) => (
    <ProfileInfoBox>
        <h2>{name}</h2>
        <h4>{title}</h4>
        <p>{description}</p>
    </ProfileInfoBox>
)

export default ProfileInfo
