import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const AppNavContainer = styled.nav`
	margin-top: 2rem;
	margin-bottom: 1rem;
	ul {
		list-style: none;
		background-color: var(--color-dark--2);
		border-radius: 8px;
		display: flex;
		li {
			a:link,
			a:visited {
				display: block;
				padding: 0.5rem 2rem;
				border-radius: 5px;
				color: inherit;
				text-decoration: none;
				text-transform: uppercase;
				font-size: 1rem;
				font-weight: 700;
			}
			a.active {
				background-color: var(--color-dark--0);
			}
		}
	}
`
const AppNav: React.FC = () => {
	return (
		<AppNavContainer>
			<ul>
				<li>
					<NavLink to="cities">Cities</NavLink>
				</li>
				<li>
					<NavLink to="countries">Countries</NavLink>
				</li>
			</ul>
		</AppNavContainer>
	)
}

export default AppNav
