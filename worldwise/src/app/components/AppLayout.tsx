import React from 'react'
import styled from 'styled-components'

import AppSidebar from './AppSidebar'
import AppMap from './AppMap'
import AppUser from './AppUser'

const AppLayoutContainer = styled.div`
	position: relative;
	height: 100vh;
	padding: 1rem;
	overscroll-behavior-y: none;
	display: flex;
`
const AppLayout: React.FC = () => {
	return (
		<AppLayoutContainer>
			<AppSidebar />
			<AppMap />
			<AppUser />
		</AppLayoutContainer>
	)
}

export default AppLayout
