import React from 'react'
import styled from 'styled-components'

import { formatTime, getWorkouts } from './data'

import WorkoutCalculator from './WorkoutCalculator'

const StyledWorkoutTimerPage = styled.div`
	width: 100%;
	padding-bottom: 2rem;
	background-image: linear-gradient(to right bottom, #80ceff, #639fe8);
	color: #333;
	font-family: 'Quicksand', sans-serif;
	h1 {
		width: 75%;
		margin: 0 auto;
		background-clip: text;
		background-image: linear-gradient(to right bottom, #80ceff, #2b56d5);
		color: transparent;
		text-transform: uppercase;
		text-align: center;
		letter-spacing: 1px;
		word-spacing: 5px;
		font-size: 4rem;
		font-weight: 900;
		transform: skew(-20deg);
	}
	time {
		display: block;
		width: 75%;
		margin: 0.25rem auto;
		padding: 1rem;
		border-radius: 1rem;
		background-color: #eee;
		color: #2b72b5;
		text-transform: uppercase;
		text-align: center;
		font-size: 1.2rem;
		font-weight: 700;
	}
`
const WorkoutTimerPage: React.FC = () => {
	// mutable state for the current formatted time
	const [time, setTime] = React.useState(formatTime(new Date()))
	// effect to update the formatted time each second
	React.useEffect(() => {
		const timerId = setInterval(() => setTime(formatTime(new Date())), 1000)
		return () => clearInterval(timerId)
	}, [])
	// get the "AM" or "PM" part of the time
	const partOfDay = time.slice(-2)
	// memoized list of workouts based on the "AM" or "PM" part
	const workouts = React.useMemo(() => getWorkouts(partOfDay), [partOfDay])

	return (
		<StyledWorkoutTimerPage>
			<h1>Workout timer</h1>
			<time>For your workout on [{time}]</time>
			<WorkoutCalculator workouts={workouts} />
		</StyledWorkoutTimerPage>
	)
}

export default WorkoutTimerPage
