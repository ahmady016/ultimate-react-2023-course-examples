import React from 'react'
import styled from 'styled-components'

const StarContainer = styled.div<{ $size: number }>`
    cursor: pointer;
    width: ${({ $size }) => `${$size}rem`};
    height: ${({ $size }) => `${$size}rem`};
`
type StarProps = {
	size: number
	color: string
    isFull: boolean
    onClick: () => undefined
    onMouseEnter: () => undefined
    onMouseLeave: () => undefined
}
const Star: React.FC<StarProps> = ({ size, color, isFull, onClick, onMouseEnter, onMouseLeave }) => {
	return (
		<StarContainer
            role="button"
            $size={size}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={isFull ? color : 'none'}
                stroke={color}
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
		</StarContainer>
	)
}

export default Star
