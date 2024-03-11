import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import AppLogo from '../../components/AppLogo'
import AppNav from './AppNav'
import AppFooter from './AppFooter'

const AppSidebarContainer = styled.div`
	height: 100vh;
	padding: 0 0.75rem;
	background-color: var(--color-dark--1);
	flex-basis: 32%;
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
