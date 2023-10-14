import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

type CounterProps = {
	count: number
	decrementCount: () => void
	incrementCount: () => void
}
const Counter: React.FC<CounterProps> = ({ count, incrementCount, decrementCount }) => (
    <div className="w-1/2 mx-auto flex justify-around items-center">
        <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex justify-center items-center" type="button" onClick={decrementCount}><FaMinus /></button>
        <p className="font-semibold text-3xl text-blue-600">{count}</p>
        <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex justify-center items-center" type="button" onClick={incrementCount}><FaPlus /></button>
    </div>
)

export default Counter
