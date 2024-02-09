export type Workout = {
    name: string
    exercises: number
}
export const getWorkouts = (partOfDay: string): Workout[] => ([
    {
        name: 'Core only',
        exercises: partOfDay === 'AM' ? 5 : 4,
    },
    {
        name: 'Arms only',
        exercises: 3,
    },
    {
        name: 'Legs only',
        exercises: 4,
    },
    {
        name: 'Arms + Legs',
        exercises: 6,
    },
    {
        name: 'Full-body workout',
        exercises: partOfDay === 'AM' ? 9 : 8,
    },
])

export function formatTime(date: Date) {
	return new Intl.DateTimeFormat('en-gb', {
        day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}).format(date)
}

export function formatDuration(duration: number) {
    const mins = Math.floor(duration)
    const seconds = (duration - mins) * 60

    const formattedMins = mins < 10 ? `0${mins}` : mins
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return `${formattedMins}:${formattedSeconds}`
}
