import React from 'react'

import BillInput from './BillInput'
import PercentageOptions from './PercentageOptions'
import PayOutput from './PayOutput'
import ResetButton from './ResetButton'

const TipsCalculator: React.FC = () => {
    const [bill, setBill] = React.useState(0)
    const changeBill = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setBill(Number(e.currentTarget.value))
    }, [])

    const [percentOne, setPercentOne] = React.useState(0)
    const changePercentOne = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setPercentOne(Number(e.currentTarget.value))
    }, [])
    const [percentTwo, setPercentTwo] = React.useState(0)
    const changePercentTwo = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setPercentTwo(Number(e.currentTarget.value))
    }, [])

    const tip = bill * (((percentOne + percentTwo) / 2) / 100)
    const reset = React.useCallback(() => {
        setBill(0)
        setPercentOne(0)
        setPercentTwo(0)
    }, [])

	return (
        <div className="w-7/12 mx-auto relative top-4 p-6 flex flex-col gap-3 items-start bg-gray-200 border border-gray-400 rounded-lg font-mono">
            <BillInput value={bill} onChange={changeBill} />
            <PercentageOptions
                label="How did you like the service ?"
                value={percentOne}
                onChange={changePercentOne}
            />
            <PercentageOptions
                label="How did your friends like the service ?"
                value={percentTwo}
                onChange={changePercentTwo}
            />
            {bill > 0
                ?   <>
                        <PayOutput bill={bill} tip={tip} />
                        <ResetButton reset={reset} />
                    </>
                : <p className="my-4 text-md text-red-800 font-semibold">please type bill and choose your and your friends rating to get your payment</p>
            }
        </div>
    )
}

export default TipsCalculator
