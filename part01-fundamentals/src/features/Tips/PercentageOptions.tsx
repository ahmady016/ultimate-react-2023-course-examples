import React from 'react'

type PercentageOptionsProps = {
    label: string
    value: number
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const PercentageOptions: React.FC<PercentageOptionsProps> = ({ value, onChange, label }) => {
	return (
        <div className="flex flex-col justify-between my-2">
            <label className="basis-3/12 block mb-2 text-md font-medium text-gray-700" htmlFor="percent-options">{label}</label>
            <select className="basis-9/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="percent-options"
                name="percent-options"
                value={value}
                onChange={onChange}
            >
                <option value="0">Dissatisfied (0%)</option>
                <option value="5">It was Ok (5%)</option>
                <option value="10">It was good (10%)</option>
                <option value="20">Absolutely Amazing (20%)</option>
            </select>
        </div>
    )
}

export default PercentageOptions
