import React from 'react'

import { Watched } from '../../data'

const WatchedItem: React.FC<Watched> = ({ imdbID, Poster, Title, imdbRating, userRating, runtime }) => (
	<li key={imdbID}>
		<img src={Poster} alt={`${Title} poster`} />
		<h3>{Title}</h3>
		<div>
			<p>
				<span>⭐️</span>
				<span>{imdbRating}</span>
			</p>
			<p>
				<span>🌟</span>
				<span>{userRating}</span>
			</p>
			<p>
				<span>⏳</span>
				<span>{runtime} min</span>
			</p>
		</div>
	</li>
)

const WatchedList: React.FC<{ watchedList: Watched[] }> = ({ watchedList }) => (
	<ul>
		{watchedList.map(watched => <WatchedItem key={watched.imdbID} {...watched} /> )}
	</ul>
)

export default WatchedList
