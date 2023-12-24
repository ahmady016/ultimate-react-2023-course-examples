import React from 'react'
import styled from 'styled-components'

import { Movie } from '../../data'

const MovieItemContainer = styled.li`
	cursor: pointer;
`
type MovieItemProps = {
	movie: Movie
	selectMovieId: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}
const MovieItem: React.FC<MovieItemProps> = ({ movie: { imdbID, poster, title, year }, selectMovieId }) => {
	return (
		<MovieItemContainer key={imdbID} id={imdbID} onClick={selectMovieId}>
			<img src={poster} alt={`${title} poster`} />
			<h3>{title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{year}</span>
				</p>
			</div>
		</MovieItemContainer>
	)
}

type MovieListProps = {
	movies: Movie[]
	selectMovieId: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}
const MovieList: React.FC<MovieListProps> = ({ movies, selectMovieId }) => (
	<ul>
		{movies?.map(movie => <MovieItem key={movie.imdbID} movie={movie} selectMovieId={selectMovieId}  /> )}
	</ul>
)

export default MovieList
