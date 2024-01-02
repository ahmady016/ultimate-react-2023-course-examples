import React from 'react'

import { useKeyHandler } from '../../hooks/useKeyHandler'

type SearchLocationProps = {
	location: string
	changeLocation: (e: React.ChangeEvent<HTMLInputElement> | string) => void
}
const SearchLocation: React.FC<SearchLocationProps> = ({ location, changeLocation }) => {
    const searchInputRef = React.useRef<HTMLInputElement>(null)
	useKeyHandler((e: KeyboardEvent) => {
		if (document.activeElement !== searchInputRef.current && e.key === 'Enter') {
			searchInputRef.current!.focus()
			changeLocation('')
		}
	})

    return (
		<input
			ref={searchInputRef}
			type="text"
			placeholder="Search Weather Location ..."
			value={location}
			onChange={changeLocation}
		/>
	)
}

export default SearchLocation
