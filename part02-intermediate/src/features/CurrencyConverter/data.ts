/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

const BASE_URL = `https://api.frankfurter.app`
export function useFetchCurrencies() {
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState('')
	const [currencies, setCurrencies] = React.useState<Record<string, string> | undefined>(undefined)

	async function fetchCurrencies() {
		setIsLoading(true)
		setError('')
		try {
			const res = await fetch(`${BASE_URL}/currencies`)
			if (!res.ok) throw new Error('Something went wrong with fetching movies')
			const data = await res.json()
			setCurrencies(data)
			setError('')
		} catch (error: any) {
            console.log(error.message)
            setError(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
        fetchCurrencies()
	}, [])

	return { isLoading, error, currencies }
}

export function useCurrencyConverter(
    baseAmount: number,
    baseCurrency: string,
    targetCurrency: string,
) {
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState('')
	const [result, setResult] = React.useState<number>(0)

	async function doConvertCurrency(amount: number, from: string, to: string) {
		setIsLoading(true)
		setError('')
		try {
			const res = await fetch(`${BASE_URL}/latest?amount=${amount}&from=${from}&to=${to}`)
			if (!res.ok) throw new Error('Something went wrong when converting currencies')
			const data = await res.json()
			setResult(data.rates[to])
			setError('')
		} catch (error: any) {
            console.log(error.message)
            setError(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
		if(baseAmount && baseCurrency && targetCurrency) {
			if(baseCurrency === targetCurrency)
				setResult(baseAmount)
			else
				doConvertCurrency(baseAmount, baseCurrency, targetCurrency)
		}
	}, [baseCurrency, targetCurrency, baseAmount])

	return { isLoading, error, result }
}
