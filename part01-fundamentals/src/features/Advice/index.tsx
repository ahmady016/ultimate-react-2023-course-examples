/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import axios from 'axios'

const Advice: React.FC = () => {
    const [advice, setAdvice] = React.useState("")
    const [advicesCount, setAdvicesCount] = React.useState(0)

    const getAdvice = React.useCallback(async () => {
        const { data } = await axios.get("https://api.adviceslip.com/advice")
        setAdvice(data.slip.advice)
        setAdvicesCount(c => c + 1)
    }, [])

    React.useEffect(() => void getAdvice(), [])

	return (
        <div className="w-2/3 m-auto">
            <div role="alert" className="p-4 text-2xl text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <span>{advice}</span>
            </div>
            {advicesCount > 0 && <div>you have read {advicesCount} pieces of advice</div>}
            <button
                className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type='button'
                onClick={getAdvice}
            >
                Get Advice
            </button>
        </div>
    )
}

export default Advice
