import React from 'react'
import styled from 'styled-components'

const NavbarContainer = styled.nav`
	display: grid;
	grid-template-columns: 4fr 5fr 3fr;
	align-items: center;
	gap: 1rem;
	height: 7rem;
	padding: 0 2rem;
	background-color: var(--color-primary);
	border-radius: 0.5rem;
	div {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		span {
			font-size: 3rem;
		}
		h1 {
			font-size: 1.75rem;
			font-weight: 600;
			color: #fff;
		}
	}
	input {
		width: 40rem;
		padding: 1rem 1.5rem;
		justify-self: center;
		border: none;
		font-size: 1.4rem;
		border-radius: 0.7rem;
		color: var(--color-text-white);
		background-color: var(--color-primary-light);
		transition: all 0.3s;
		&:focus {
			outline: none;
			box-shadow: 0 2.4rem 2.4rem rgba(65, 19, 81, 0.25);
			transform: translateY(-2px);
		}
		&::placeholder {
			color: var(--color-text-white);
		}
	}
	p {
		justify-self: end;
		font-size: 1.2rem;
		font-weight: 500;
		color: #f0f0f0;
	}
`
const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<NavbarContainer>{children}</NavbarContainer>
)

export default Navbar
