import React from 'react'
import styled from 'styled-components'

const PackingLogoContainer = styled.h2`
	padding: 1.5rem 0;
	background-color: #3a5dd1;
	color: #fff;
	font-family: "Monoton";
	font-weight: 400;
	font-size: 3rem;
	word-spacing: 30px;
	letter-spacing: -5px;
	text-align: center;
	text-transform: uppercase;
`
const PackingLogo: React.FC = () => (
	<PackingLogoContainer>🏝️ Far Away 🧳</PackingLogoContainer>
)

export default PackingLogo
