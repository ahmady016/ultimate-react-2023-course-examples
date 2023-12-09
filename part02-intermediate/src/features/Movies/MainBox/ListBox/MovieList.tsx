import React from 'react'

import { Movie } from '../../data'

const MovieItem: React.FC<Movie> = ({ imdbID, Poster, Title, Year }) => (
	<li key={imdbID}>
		<img src={Poster} alt={`${Title} poster`} />
		<h3>{Title}</h3>
		<div>
			<p>
				<span>🗓</span>
				<span>{Year}</span>
			</p>
		</div>
	</li>
)

const MovieList: React.FC<{ movies: Movie[] }> = ({ movies }) => (
	<ul>
		{movies?.map(movie => <MovieItem key={movie.imdbID} {...movie} /> )}
	</ul>
)

export default MovieList
