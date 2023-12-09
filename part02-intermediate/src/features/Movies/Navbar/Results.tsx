import React from 'react'

import { Movie } from '../data'

const Results: React.FC<{ movies: Movie[] }> = ({ movies }) => (
	<p>Found <strong>{movies.length}</strong> results</p>
)

export default Results
