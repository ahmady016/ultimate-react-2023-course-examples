import React from 'react'

const Search: React.FC = () => {
	const [query, setQuery] = React.useState('')
	return (
		<input
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	)
}

export default Search
