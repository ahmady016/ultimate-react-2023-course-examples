import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import AppLogo from '../components/AppLogo'

const HomeNavContainer = styled.nav`
	padding: 0.75rem 1.75rem;
    display: flex;
	justify-content: space-between;
	align-items: center;
	ul {
		list-style: none;
		display: flex;
		align-items: center;
		gap: 2rem;
        li {
			a {
				color: var(--color-light--2);
				text-transform: uppercase;
				text-decoration: none;
				font-size: 1rem;
				font-weight: 600;
				&:hover {
					color: var(--color-brand--1);
				}
				&.active {
					color: var(--color-brand--2);
				}
			}
        }
	}
`
const HomeNav: React.FC = () => {
	return (
		<HomeNavContainer>
			<AppLogo />
			<ul>
				<li>
					<NavLink to="/product">Product</NavLink>
				</li>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
			</ul>
		</HomeNavContainer>
	)
}

export default HomeNav
