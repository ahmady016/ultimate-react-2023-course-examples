import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import styled from 'styled-components'

import { formatDuration } from './data'

const WorkoutDurationContainer = styled.section`
	width: 70%;
	margin: 0 auto;
	padding: 1rem;
	border-radius: 1.5rem;
	background-color: #c8dcff;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 3.6rem;
	&:hover {
		background-color: #bdd4fe;
	}
	p {
		background-image: linear-gradient(to right bottom, #80ceff, #2b56d5);
		background-clip: text;
		color: transparent;
		text-align: center;
		font-size: 4rem;
		font-weight: 900;
	}
	button {
		cursor: pointer;
		width: 3rem;
		height: 3rem;
		border: none;
		border-radius: 50%;
		background-color: #5a96ce;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		font-weight: 900;
	}
`
type WorkoutDurationProps = {
	duration: number
	incrementDuration: () => void
	decrementDuration: () => void
}
const WorkoutDuration: React.FC<WorkoutDurationProps> = ({
	duration,
	incrementDuration,
	decrementDuration,
}) => (
	<WorkoutDurationContainer>
		<button type="button" onClick={decrementDuration}><FaMinus /></button>
		<p>{formatDuration(duration)}</p>
		<button type="button" onClick={incrementDuration}><FaPlus /></button>
	</WorkoutDurationContainer>
)

export default WorkoutDuration
