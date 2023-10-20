import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

type StepperProps = {
	step: number
	changeStep: (e: React.FormEvent<HTMLInputElement>) => void
	decrementStep: () => void
	incrementStep: () => void
}
const Stepper: React.FC<StepperProps> = ({ step, changeStep, decrementStep, incrementStep }) => (
	<div className="w-5/6 mx-auto flex justify-around items-center">
		<h3 className="text-2xl font-semibold text-gray-700">Stepper</h3>
		<div className="w-2/3 mx-auto flex flex-col items-center">
			<p className="font-semibold text-3xl text-orange-600">{step}</p>
			<div className="flex justify-between items-center">
				<button className="w-8 h-8 rounded-full bg-orange-500 text-white flex justify-center items-center" type="button" onClick={decrementStep}><FaMinus /></button>
				<input
					className="w-48 mx-4 cursor-pointer"
					type="range"
					min={1}
					max={100}
					value={step}
					onChange={changeStep}
				/>
				<button className="w-8 h-8 rounded-full bg-orange-500 text-white flex justify-center items-center" type="button" onClick={incrementStep}><FaPlus /></button>
			</div>
		</div>
	</div>
)

export default Stepper
