import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import AppLogo from '../../components/AppLogo'
import AppNav from './AppNav'
import AppFooter from './AppFooter'

const AppSidebarContainer = styled.div`
	height: calc(100vh - 3rem);
	background-color: var(--color-dark--1);
	flex-basis: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
`
const AppSidebar: React.FC = () => {
	return (
		<AppSidebarContainer>
			<AppLogo />
			<AppNav />
			<Outlet />
			<AppFooter />
		</AppSidebarContainer>
	)
}

export default AppSidebar
