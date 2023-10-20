import React from 'react'

import add from 'date-fns/add'
import format from 'date-fns/format'

import Stepper from './Stepper'
import Counter from './Counter'
import Message from './Message'

const today = new Date()
const DaysCounter: React.FC = () => {
	const [step, setStep] = React.useState(0)
	const changeStep = React.useCallback((e: React.FormEvent<HTMLInputElement>) => setStep(Number(e.currentTarget.value)), [])
	const incrementStep = React.useCallback(() => { if (step < 100) setStep(s => s + 1) }, [step])
	const decrementStep = React.useCallback(() => { if (step > 1) setStep(s => s - 1) }, [step])

	const [count, setCount] = React.useState(0)
	const changeCount = React.useCallback((e: React.FormEvent<HTMLInputElement>) => setCount(Number(e.currentTarget.value)), [])
	const incrementCount = React.useCallback(() => void setCount(c => c + step), [step])
	const decrementCount = React.useCallback(() => void setCount(c => c - step), [step])

    const [date, setDate] = React.useState('')
    React.useEffect(() => {
        setDate(format(add(today, { days: count }), 'iiii, dd MMMM yyyy'))
    }, [count])

	return (
		<div className="w-1/2 mx-auto relative top-4 py-6 px-4 rounded-md bg-gray-200 flex flex-col gap-8">
			<Stepper
				step={step}
				changeStep={changeStep}
				incrementStep={incrementStep}
				decrementStep={decrementStep}
			/>
			<Counter
				count={count}
				changeCount={changeCount}
				incrementCount={incrementCount}
				decrementCount={decrementCount}
			/>
            <Message
				count={count}
				date={date}
			/>
		</div>
	)
}

export default DaysCounter
