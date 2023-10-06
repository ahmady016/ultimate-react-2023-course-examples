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
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{advice}</h1>
                {advicesCount > 0 && <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">you have read {advicesCount} pieces of advice</p>}
                <button
                    className="py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                    type='button'
                    onClick={getAdvice}
                >
                    Get Advice
                </button>
            </div>
        </section>
    )
}

export default Advice
