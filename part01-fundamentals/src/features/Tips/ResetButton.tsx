import React from 'react'

type ResetButtonProps = {
    reset: () => void
}
const ResetButton: React.FC<ResetButtonProps> = ({ reset }) => (
    <button
        className="w-36 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={reset}
    >
        Reset
    </button>
)

export default ResetButton
