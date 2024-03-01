import React from 'react'
import styled from 'styled-components'

const SpinnerFullScreenContainer = styled.div`
	margin: 2rem;
	height: calc(100vh - 4.25rem);
	background-color: var(--color-dark--1);
`
const SpinnerContainer = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	& > div {
		width: 6rem;
		height: 6rem;
		border-radius: 50%;
		background: conic-gradient(#0000 10%, var(--color-light--2));
		-webkit-mask: radial-gradient(
			farthest-side,
			#0000 calc(100% - 8px),
			#000 0
		);
		animation: rotate 1.5s infinite linear;
	}
	@keyframes rotate {
		to {
			transform: rotate(1turn);
		}
	}
`
type SpinnerProps = {
	fullScreen?: boolean
}
const Spinner: React.FC<SpinnerProps> = ({ fullScreen = false }) => {
	if (fullScreen)
		return (
			<SpinnerFullScreenContainer>
				<SpinnerContainer>
					<div></div>
				</SpinnerContainer>
			</SpinnerFullScreenContainer>
		)
	return (
		<SpinnerContainer>
			<div></div>
		</SpinnerContainer>
	)
}

export default Spinner
