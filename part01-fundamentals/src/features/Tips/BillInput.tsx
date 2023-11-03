import React from 'react'

type BillInputProps = {
    value: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const BillInput: React.FC<BillInputProps> = ({ value, onChange }) => {
	return (
        <div>
            <label className="block mb-2 text-md font-medium text-gray-900">How match was the Bill ?</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                placeholder="Bill value here ..."
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default BillInput
