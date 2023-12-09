import React from 'react'
import styled from 'styled-components'

const ListBoxContainer = styled.div`
	width: 42rem;
	max-width: 42rem;
	background-color: var(--color-background-500);
	border-radius: 0.5rem;
	position: relative;
	button.toggle {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		height: 2.4rem;
		aspect-ratio: 1;
		border-radius: 50%;
		border: none;
		background-color: var(--color-background-900);
		color: var(--color-text-white);
		font-size: 1.4rem;
		font-weight: bold;
		cursor: pointer;
		z-index: 999;
	}
	button.delete {
		position: absolute;
		right: 2.4rem;
		height: 1.8rem;
		aspect-ratio: 1;
		border-radius: 50%;
		border: none;
		background-color: var(--color-red);
		color: var(--color-background-900);
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			background-color: var(--color-red-dark);
		}
	}
	ul {
		list-style: none;
		padding: 0.8rem 0;
		li {
			position: relative;
			display: grid;
			grid-template-columns: 4rem 1fr;
			grid-template-rows: auto auto;
			column-gap: 2rem;
			font-size: 1.25rem;
			align-items: center;
			padding: 1.6rem 3.2rem;
			border-bottom: 1px solid var(--color-background-100);
			img {
				width: 100%;
				grid-row: 1 / -1;
			}
			h3 {
				font-size: 1.25rem;
				font-weight: 500;
			}
			div {
				display: flex;
				align-items: center;
				gap: 2rem;
				p {
					display: flex;
					align-items: center;
					gap: 0.8rem;
				}
			}
		}
	}
`
const ListBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = React.useState(true)
	return (
		<ListBoxContainer>
			<button className="toggle" onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? '–' : '+'}
			</button>
			{isOpen && children}
		</ListBoxContainer>
	)
}

export default ListBox
