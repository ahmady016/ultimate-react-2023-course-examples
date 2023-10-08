import React from 'react'
import styled from 'styled-components'

const ProfileImage = styled.img`
	width: 100%;
	display: block;
`
type ProfilePhotoProps = {
	photoName: string
	name: string
}
const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photoName, name }) => (
    <ProfileImage src={`src/features/devprofile/images/${photoName}`} alt={name} />
)

export default ProfilePhoto
