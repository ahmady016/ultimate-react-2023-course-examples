import React from 'react'
import styled from 'styled-components'

import AppSidebar from './AppSidebar'
import AppMap from './AppMap'
import AppUser from './AppUser'

const AppLayoutContainer = styled.div`
	height: 100vh;
	position: relative;
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
