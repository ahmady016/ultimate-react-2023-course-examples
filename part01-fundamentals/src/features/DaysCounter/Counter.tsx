import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

type CounterProps = {
	count: number
    changeCount: (e: React.FormEvent<HTMLInputElement>) => void
	decrementCount: () => void
	incrementCount: () => void
}
const Counter: React.FC<CounterProps> = ({ count, changeCount, incrementCount, decrementCount }) => (
    <div className="w-5/6 mx-auto flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-700">Counter</h3>
        <div className="w-2/3 mx-auto flex justify-evenly items-center">
            <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex justify-center items-center" type="button" onClick={decrementCount}><FaMinus /></button>
            <input
                className="w-48 p-3 font-semibold text-xl text-blue-600 border border-gray-300 rounded-lg"
                type="text"
                value={count}
                onChange={changeCount}
            />
            <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex justify-center items-center" type="button" onClick={incrementCount}><FaPlus /></button>
        </div>
    </div>
)

export default Counter
