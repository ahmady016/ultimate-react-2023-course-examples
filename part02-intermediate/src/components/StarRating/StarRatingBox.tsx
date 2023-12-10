import React from 'react'
import styled from 'styled-components'

import { fillRatingValues, StarRatingProps } from './data'
import Star from './Star'

const StarRatingBoxContainer = styled.div<{ $color: string, $size: number }>`
    margin: 1rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    div {
        display: flex;
    }
    p {
        margin: 0;
        color: ${({ $color }) => $color};
        fontSize: ${({ $size }) => `${$size}rem`};
        lineHeight: ${({ $size }) => `${$size}rem`};
        font-weight: 600;
        span {
            margin-right: 0.5rem;
        }
    }
`
const StarRatingBox: React.FC<StarRatingProps> = ({ limit, size, color, defaultRating = 0, messages = [] }) => {
    const [ratingValues, setRatingValues] = React.useState(fillRatingValues(limit))
    React.useEffect(() => void setRatingValues(fillRatingValues(limit)), [limit])

    const [currentRating, setCurrentRating] = React.useState(defaultRating)
    const changeCurrentRating = React.useCallback((value: number) => () => void setCurrentRating(value), [])

    const [tempRating, setTempRating] = React.useState(0)
    const resetTempRating = React.useCallback(() => void setTempRating(0), [])
    const changeTempRating = React.useCallback((value: number) => () => void setTempRating(value), [])

	return (
        <StarRatingBoxContainer $color={color} $size={size}>
            <div>
                {ratingValues.map(value =>
                    <Star
                        size={size}
                        color={color}
                        isFull={tempRating ? tempRating >= value : currentRating >= value}
                        onClick={changeCurrentRating(value)}
                        onMouseEnter={changeTempRating(value)}
                        onMouseLeave={resetTempRating}
                    />
                )}
            </div>
            <p>
                <span>{tempRating || currentRating || 0}</span>
                <span>{messages.length === limit && messages[tempRating ? tempRating - 1 : currentRating - 1]}</span>
            </p>
        </StarRatingBoxContainer>
    )
}

export default StarRatingBox
