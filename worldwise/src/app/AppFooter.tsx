import React from 'react'
import styled from 'styled-components'

const AppFooterContainer = styled.footer`
	margin-top: auto;
	p {
		font-size: 0.9rem;
		color: var(--color-light--1);
	}
`
const AppFooter: React.FC = () => {
	return (
		<AppFooterContainer>
			<p>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
		</AppFooterContainer>
	)
}

export default AppFooter
