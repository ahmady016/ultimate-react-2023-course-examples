/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchOrder: React.FC = () => {
	const [query, setQuery] = React.useState('')
    const changeQuery = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), [])

	const navigate = useNavigate()
	const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (query) {
            navigate(`/order/${query}`)
            setQuery('')
        }
	}, [query])

	return (
        <form onSubmit={handleSubmit}>
            <input
                type="search"
                className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
                placeholder="Search Order #"
                value={query}
                onChange={changeQuery}
            />
        </form>
    )
}

export default SearchOrder
