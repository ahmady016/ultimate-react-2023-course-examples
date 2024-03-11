import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AppLogoImage = styled.img`
    height: 2.25rem;
	display: block;
	padding-top: 1rem;
	box-sizing: content-box;
`
const AppLogo: React.FC = () => {
	return (
		<Link to="/">
			<AppLogoImage src="/logo.png" alt="WorldWise logo" />
		</Link>
	)
}

export default AppLogo
