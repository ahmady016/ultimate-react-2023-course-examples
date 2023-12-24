import React from 'react'
import { FaTrashCan } from 'react-icons/fa6'

import { Watched } from '../../data'

type WatchedItemProps = {
	watched: Watched
	removeFromWatchedList: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const WatchedItem: React.FC<WatchedItemProps> = ({
	watched: { imdbID, poster, title, imdbRating, userRating, runtime },
	removeFromWatchedList
}) => (
	<li key={imdbID}>
		<img src={poster} alt={`${title} poster`} />
		<h3>{title}</h3>
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
				<span>{runtime}</span>
			</p>
			<button
				className="delete"
				title="delete"
				id={imdbID}
				type="button"
				onClick={removeFromWatchedList}
			>
				<FaTrashCan />
			</button>
		</div>
	</li>
)

type WatchedListProps = {
	watchedList: Watched[]
	removeFromWatchedList: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const WatchedList: React.FC<WatchedListProps> = ({ watchedList, removeFromWatchedList }) => (
	<ul>
		{watchedList.map(watched =>
			<WatchedItem
				key={watched.imdbID}
				watched={watched}
				removeFromWatchedList={removeFromWatchedList}
			/>
		)}
	</ul>
)

export default WatchedList
