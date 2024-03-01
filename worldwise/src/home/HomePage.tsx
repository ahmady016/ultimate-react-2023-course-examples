import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HomePageContainer = styled.div`
	height: calc(100vh - 4.25rem);
	background-image: linear-gradient(
			rgba(36, 42, 46, 0.8),
			rgba(36, 42, 46, 0.8)
		),
		url('/bg.jpg');
	background-size: cover;
	background-position: center;
	section {
		height: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3rem;
		h1 {
			font-size: 2rem;
			line-height: 1.5;
		}
		h2 {
			width: 90%;
			margin-bottom: 2rem;
			color: var(--color-light--1);
			font-size: 1.5rem;
		}
		a, a:link, a:visited {
			padding: 0.75rem 1.25rem;
			border-radius: 8px;
			background-color: var(--color-brand--2);
			color: var(--color-dark--0);
			text-decoration: none;
			text-transform: uppercase;
			font-size: 1.25rem;
			font-wight: 800;
			transition: all 0.2s;
			&:hover {
				transform: scale(1.1);
				background-color: var(--color-brand--1);
				color: var(--color-dark--1);
			}
		}
	}
`
const HomePage: React.FC = () => {
	return (
		<HomePageContainer>
			<section>
				<h1>
					You travel the world.
					<br />
					WorldWise keeps track of your adventures.
				</h1>
				<h2>
					A world map that tracks your footsteps into every city you can think
					of. Never forget your wonderful experiences, and show your friends how
					you have wandered the world.
				</h2>
				<Link to="/login">Start Tracking Now</Link>
			</section>
		</HomePageContainer>
	)
}

export default HomePage
