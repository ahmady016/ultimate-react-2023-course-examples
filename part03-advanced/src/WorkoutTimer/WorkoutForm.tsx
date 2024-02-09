/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'

import { Workout } from './data'

const WorkoutFormContainer = styled.form`
    width: 100%;
    margin-bottom: 2rem;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    gap: 2.4rem;
    & > div {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 2rem;
        label {
            width: 25%;
            display: block;
            font-weight: 500;
        }
        select {
            width: 50%;
            cursor: pointer;
            padding: 0.75rem;
            border: 1px solid #999;
            border-radius: 0.75rem;
        }
        input {
            width: 50%;
            cursor: pointer;
        }
        span {
            width: 25%;
            font-size: 1rem;
            font-weight: 600;
        }
    }
`
type WorkoutFormProps = {
    workouts: Workout[]
    exercises: number
    setExercises: React.Dispatch<React.SetStateAction<number>>
    sets: number
    setSets: React.Dispatch<React.SetStateAction<number>>
    speed: number
    setSpeed: React.Dispatch<React.SetStateAction<number>>
    breakDuration: number
    setBreakDuration: React.Dispatch<React.SetStateAction<number>>
}
const WorkoutForm: React.FC<WorkoutFormProps> = ({
    workouts,
    exercises, setExercises,
    sets, setSets,
    speed, setSpeed,
    breakDuration, setBreakDuration,
}) => {
    const changeExercises = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setExercises(Number(e.target.value)), [])
    const changeSets = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSets(Number(e.target.value)), [])
    const changeSpeed = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSpeed(Number(e.target.value)), [])
    const changeBreakDuration = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setBreakDuration(Number(e.target.value)), [])

	return (
		<WorkoutFormContainer>
			<div>
				<label>Type of workout</label>
                <select value={exercises} onChange={changeExercises}>
                    {workouts.map(({ name, exercises }) =>
                        <option key={name} value={exercises}>{name} ({exercises} exercises)</option>
                    )}
                </select>
                <span>{exercises} exercises</span>
			</div>
			<div>
                <label>How many sets?</label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={sets}
                    onChange={changeSets}
                />
                <span>{sets} sets</span>
            </div>
			<div>
                <label>How fast are you?</label>
                <input
                    type="range"
                    min="30"
                    max="180"
                    step="30"
                    value={speed}
                    onChange={changeSpeed}
                />
                <span>{speed} sec/exercise</span>
            </div>
            <div>
                <label>Break length</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={breakDuration}
                    onChange={changeBreakDuration}
                />
                <span>{breakDuration} minutes/break</span>
            </div>
		</WorkoutFormContainer>
	)
}

export default WorkoutForm
