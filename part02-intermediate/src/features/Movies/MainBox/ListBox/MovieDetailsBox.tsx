/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { FcUpLeft } from 'react-icons/fc'
import { GrStar, GrStarOutline } from 'react-icons/gr'
import { FiPlus } from 'react-icons/fi'
import styled from 'styled-components'

import Alert from '../../../../components/Alert'
import Spinner from '../../../../components/Spinner'
import StarRatingBox from '../../../../components/StarRating/StarRatingBox'

import { MovieDetails, Watched, useFetchMovieDetails } from '../../data'

const MovieDetailsBoxContainer = styled.div`
    font-size: 1.2rem;
    line-height: 1.4;
    & > div {
        margin-top: 5rem;
    }
    p {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    header {
        display: flex;
        button {
            z-index: 999;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0.6rem;
            left: 0.6rem;
            height: 3.2rem;
            aspect-ratio: 1;
            border-radius: 50%;
            border: none;
            background-color: #fff;
            color: var(--color-background-500);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
            font-family: sans-serif;
            font-size: 2.4rem;
            font-weight: bold;
        }
        img {
            width: 33%;
        }
        div {
            width: 100%;
            padding: 2rem 2.75rem;
            background-color: var(--color-background-100);
            display: flex;
            flex-direction: column;
            gap: 1.4rem;
            h2 {
                margin-bottom: 0.4rem;
                font-size: 2rem;
                line-height: 1;
            }
        }
    }
    section {
        padding: 4rem;
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        & > div {
            background-color: var(--color-background-100);
            margin: 0.75rem auto;
            padding: 2rem;
            border-radius: 1rem;
            font-weight: 600;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            button {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem;
                border: none;
                border-radius: 10rem;
                background-color: var(--color-primary);
                color: var(--color-text);
                font-size: 1.4rem;
                font-weight: 600;
                transition: all 0.3s;
                &:hover {
                    background-color: var(--color-primary-light);
                }
                svg {
                    font-size: 1.5rem;
                }
            }
        }
    }
`
type MovieDetailsBoxProps = {
    watchedList: Watched[]
    selectedMovieId: string
    clearMovieId: () => void
    addToWatchedList: (movie: MovieDetails, userRating: number) => void
}
const MovieDetailsBox: React.FC<MovieDetailsBoxProps> = ({
    watchedList, selectedMovieId, clearMovieId, addToWatchedList
}) => {
    const { isLoading, error, movie } = useFetchMovieDetails(selectedMovieId)

    const isWatched = watchedList.map(movie => movie.imdbID).includes(selectedMovieId)
    const watchedUserRating = watchedList.find(movie => movie.imdbID === selectedMovieId)?.userRating

    const [userRating, setUserRating] = React.useState(0)
    const addMovieToWatchedList = React.useCallback(() => {
        if(movie) {
            addToWatchedList(movie, userRating)
            clearMovieId()
        }
    }, [movie, userRating])

    React.useEffect(() => {
        const clearMovieSelection = (e: KeyboardEvent) => {
            if (e.code === "Escape")
                clearMovieId()
        }
        document.addEventListener("keydown", clearMovieSelection)
        return () => { document.removeEventListener("keydown", clearMovieSelection) }
    }, [clearMovieId])

    React.useEffect(() => {
        if (movie?.title) document.title = `Movie | ${movie.title}`
        return () => { document.title = "Search Movies" }
    }, [movie?.title])

	return (
		<MovieDetailsBoxContainer>
			{isLoading && <Spinner marginTop={12} size={8} align='center' />}
			{error && <Alert type="danger">{error}</Alert>}
			{!isLoading && !error && movie && (
                <>
                    <header>
                        <button onClick={clearMovieId}>
                            <FcUpLeft />
                        </button>
                        <img src={movie.poster} alt={`Poster of ${movie} movie`} />
                        <div>
                            <h2>{movie.title}</h2>
                            <p>
                                {movie.released} &bull; {movie.runtime}
                            </p>
                            <p>{movie.genre}</p>
                            <p>
                                <span><GrStar /></span>
                                {movie.imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div>
                            {!isWatched
                                ?   <>
                                        <StarRatingBox
                                            limit={10}
                                            size={2}
                                            color="#222"
                                            onChange={setUserRating}
                                        />
                                        {userRating > 0 && (
                                            <button type="button" onClick={addMovieToWatchedList}>
                                                <FiPlus />
                                                <span>Add to list</span>
                                            </button>
                                        )}
                                    </>
                                : <p>You rated this movie with: {watchedUserRating}<span><GrStarOutline /></span></p>
                            }
                        </div>
                        <p><em>{movie.plot}</em></p>
                        <p>Cast are {movie.actors}</p>
                        <p>Directed by {movie.director}</p>
                    </section>
                </>
			)}
		</MovieDetailsBoxContainer>
	)
}

export default MovieDetailsBox
