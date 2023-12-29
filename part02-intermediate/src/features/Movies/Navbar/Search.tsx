import React from 'react'

type SearchProps = {
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
}
const Search: React.FC<SearchProps> = ({ query, setQuery }) => {
	const searchInputRef = React.useRef<HTMLInputElement>(null)
	React.useEffect(() => {
		function keyHandler(e: KeyboardEvent) {
			if (document.activeElement !== searchInputRef.current && e.key === 'Enter') {
				searchInputRef.current!.focus()
				setQuery('')
			}
		}
		document.addEventListener('keydown', keyHandler)
		return () => document.addEventListener('keydown', keyHandler)
	}, [setQuery])

	return (
		<input
			ref={searchInputRef}
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	)
}

export default Search
