import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	cursor: pointer;
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 8px;
	color: inherit;
	text-transform: uppercase;
	font-family: inherit;
	font-size: 1rem;
	&.primary {
		font-weight: 700;
		background-color: var(--color-brand--2);
		color: var(--color-dark--1);
	}
	&.back {
		font-weight: 600;
		background: none;
		border: 1px solid #333;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		&:hover {
			font-weight: 700;
			background-color: var(--color-brand--2);
			color: var(--color-dark--1);
		}
	}
	&.position {
		z-index: 1000;
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 0.4rem 1.2rem rgba(36, 42, 46, 0.16);
		background-color: var(--color-brand--2);
		color: var(--color-dark--1);
		font-weight: 700;
	}
`
type ButtonProps = React.ComponentProps<'button'> & {
	variant?: 'primary' | 'back' | 'position'
}
const Button: React.FC<ButtonProps> = ({
    type = 'button',
	variant = 'primary',
	onClick,
	children,
}) => (
	<StyledButton type={type} onClick={onClick} className={variant}>
		{children}
	</StyledButton>
)

export default Button
