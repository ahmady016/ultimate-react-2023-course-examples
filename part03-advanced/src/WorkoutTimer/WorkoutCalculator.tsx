import React from 'react'
import styled from 'styled-components'

import { Workout } from './data'

import ToggleSound from './ToggleSound'
import WorkoutForm from './WorkoutForm'
import WorkoutDuration from './WorkoutDuration'

import soundFile from './sound.m4a'

const WorkoutCalculatorContainer = styled.div`
	position: relative;
	width: 75%;
	margin: auto;
	padding: 2rem 4rem;
	border-radius: 0.75rem;
	background-color: #eee;
	box-shadow: 0px 2.8px 2.8px rgba(0, 0, 0, 0.028),
		0px 6.7px 6.7px rgba(0, 0, 0, 0.04), 0px 12.5px 12.5px rgba(0, 0, 0, 0.05),
		0px 22.3px 22.3px rgba(0, 0, 0, 0.06),
		0px 41.8px 41.8px rgba(0, 0, 0, 0.072), 0px 100px 100px rgba(0, 0, 0, 0.1);
	& > h2 {
		margin-bottom: 2rem;
		text-align: center;
		font-size: 3rem;
		font-weight: 900;
		color: #2b72b5;
	}
	& > button {
		position: absolute;
		top: 3rem;
		right: 3rem;
		background-color: transparent;
		color: #2b56d5;
		font-size: 3rem;
	}
`
type WorkoutCalculatorProps = {
	workouts: Workout[]
}
const WorkoutCalculator: React.FC<WorkoutCalculatorProps> = ({ workouts }) => {
	// state variables for 4 form values
	const [exercises, setExercises] = React.useState(workouts[0].exercises)
	const [sets, setSets] = React.useState(3)
	const [speed, setSpeed] = React.useState(90)
	const [breakDuration, setBreakDuration] = React.useState(5)

	// state for calculate and set duration
	const [duration, setDuration] = React.useState(0)
    const incrementDuration = () => setDuration(duration => Math.floor(duration) + 1)
    const decrementDuration = () => setDuration(duration => (duration > 1 ? Math.ceil(duration) - 1 : 0))
	// Effect to calculate duration based on 4 chosen workout values
    React.useEffect(() =>
        setDuration((exercises * sets * speed) / 60 + (sets - 1) * breakDuration)
	, [exercises, sets, speed, breakDuration])

	// mutate state to toggle sound
	const [allowSound, setAllowSound] = React.useState(true)
	const toggleSound = React.useCallback(() => setAllowSound((allow) => !allow), [])
	// Effect to play sound when duration changed and/or sound allowed
    React.useEffect(() => {
        const playSound = () => {
            if (allowSound) {
                const sound = new Audio(soundFile)
                sound.play()
            }
        }
        playSound()
    }, [duration, allowSound])

	// Effect to set document title based on chosen exercises
    React.useEffect(() => { document.title = `Your ${exercises}-exercise workout` }, [exercises])

	return (
		<WorkoutCalculatorContainer>
			<h2>Workout Calculator</h2>
			<ToggleSound
                allowSound={allowSound}
                toggleSound={toggleSound}
            />
			<WorkoutForm
                workouts={workouts}
                exercises={exercises}
                setExercises={setExercises}
                sets={sets}
                setSets={setSets}
                speed={speed}
                setSpeed={setSpeed}
                breakDuration={breakDuration}
                setBreakDuration={setBreakDuration}
            />
			<WorkoutDuration
                duration={duration}
                incrementDuration={incrementDuration}
                decrementDuration={decrementDuration}
            />
		</WorkoutCalculatorContainer>
	)
}

export default WorkoutCalculator
