import React from 'react'
import styled from 'styled-components'

import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'

import { useCurrencyConverter, useFetchCurrencies } from './data'

type CurrenciesSelectProps = {
    options: Record<string, string>
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    disabled?: boolean | undefined
}
const CurrenciesSelect: React.FC<CurrenciesSelectProps> = ({ options, value, onChange, disabled }) => {
    return (
        <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={value}
            onChange={onChange}
            disabled={disabled}
        >
            {Object.entries(options).map(([value, text]) => <option key={value} value={value}>{text}</option>)}
        </select>
    )
}

type AmountInputProps = {
    name: string
    label: string
    value: number
    onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
    disabled?: boolean | undefined
}
const AmountInput: React.FC<AmountInputProps> = ({ name, label, value, onChange, disabled }) => {
    return (
        <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="number"
            id={name}
            name={name}
            placeholder={`type ${label}`}
            value={value}
            onChange={onChange}
            readOnly={(typeof onChange === 'function') ? false : true}
            disabled={disabled}
        />
    )
}

const CurrencyConverterBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 3rem 3rem;
    gap: 0.75rem;
    justify-items: center;
    align-items: center;
    input, select {
        height: 100%;
    }
`
const CurrencyConverter: React.FC = () => {
    const [baseAmount, setBaseAmount] = React.useState(0)
    const changeBaseAmount = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setBaseAmount(Number(e.target.value)), [])

    const [baseCurrency, setBaseCurrency] = React.useState('')
    const changeBaseCurrency = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => void setBaseCurrency(e.target.value), [])

    const [targetCurrency, setTargetCurrency] = React.useState('')
    const changeTargetCurrency = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => void setTargetCurrency(e.target.value), [])

    const { isLoading, error, currencies } = useFetchCurrencies()
    React.useEffect(() => {
        if(currencies) {
            const currenciesKeys = Object.keys(currencies)
            setBaseCurrency(currenciesKeys[0])
            setTargetCurrency(currenciesKeys[1])
        } else {
            setBaseCurrency('')
            setTargetCurrency('')
        }
    }, [currencies])

    const [delayedBaseAmount, setDelayedBaseAmount] = React.useState(0)
    React.useEffect(() => {
        const timeoutId = window.setTimeout(() => setDelayedBaseAmount(baseAmount), 700)
        return () => clearTimeout(timeoutId)
    }, [baseAmount])
    const [targetAmount, setTargetAmount] = React.useState(0)
    const { isLoading: isConverterLoading, result } = useCurrencyConverter(delayedBaseAmount, baseCurrency, targetCurrency)
    React.useEffect(() => {
        setTargetAmount(result)
    }, [result])

	return (
        <form className="w-4/6 mx-auto p-5 border border-gray-300 rounded-lg">
            {isLoading && <Spinner size={8} align='center' />}
			{error && <Alert type='danger'>{error}</Alert>}
            {!isLoading && !error && currencies &&
                <CurrencyConverterBox>
                    <AmountInput
                        label="Amount"
                        name="amount"
                        value={baseAmount}
                        onChange={changeBaseAmount}
                        disabled={isConverterLoading}
                    />
                    <CurrenciesSelect
                        options={currencies}
                        value={baseCurrency}
                        onChange={changeBaseCurrency}
                        disabled={isConverterLoading}
                    />
                    <AmountInput
                        label="Converted"
                        name="converted"
                        value={targetAmount}
                    />
                    <CurrenciesSelect
                        options={currencies}
                        value={targetCurrency}
                        onChange={changeTargetCurrency}
                        disabled={isConverterLoading}
                    />
                </CurrencyConverterBox>
            }
        </form>
    )
}

export default CurrencyConverter
