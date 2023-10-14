import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

type StepperProps = {
	step: number
	decrementStep: () => void
	incrementStep: () => void
}
const Stepper: React.FC<StepperProps> = ({ step, incrementStep, decrementStep }) => (
	<div className="w-1/2 mx-auto flex justify-around items-center">
		<button className="w-8 h-8 rounded-full bg-orange-500 text-white flex justify-center items-center" type="button" onClick={decrementStep}><FaMinus /></button>
		<p className="font-semibold text-3xl text-orange-600">{step}</p>
		<button className="w-8 h-8 rounded-full bg-orange-500 text-white flex justify-center items-center" type="button" onClick={incrementStep}><FaPlus /></button>
	</div>
)

export default Stepper
