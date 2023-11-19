import React from 'react'
import styled from 'styled-components'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { ImRadioUnchecked, ImRadioChecked2 } from 'react-icons/im'

import { Friend } from './data'

const FriendListItem = styled.li<{$isSelected: boolean}>`
    display: grid;
    grid-template-columns: 5rem 1fr auto;
    align-items: center;
    column-gap: 1.5rem;
    padding: 1rem;
    border-radius: 7px;
    transition: 0.5s;
    background-color: ${({ $isSelected }) => $isSelected ? '#ffdeb3' : 'transparent'};
    &:hover {
        background-color: #ffdeb3;
    }
    img {
        width: 100%;
        border-radius: 50%;
        grid-row: span 2;
        grid-column: 1;
    }
    h3 {
        grid-row: 1;
        grid-column: 2;
    }
    p {
        grid-row: 2;
        grid-column: 2;
    }
    button {
        padding: 0.5rem;
        background-color: #ffcc96;
        &.remove {
            grid-row: 1;
            grid-column: 3;
            color: #9a2121;
        }
        &.select {
            grid-row: 2;
            grid-column: 3;
            color: #a85b0a;
        }
    }
`

type FriendItemProps = {
    friend: Friend,
    selectedFriendId: string
    changeSelectedFriendId: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    removeFriend: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const FriendItem: React.FC<FriendItemProps> = ({
    friend: { id, name, imageUrl, balance },
    selectedFriendId,
    changeSelectedFriendId,
    removeFriend
}) => {
    const isSelected = selectedFriendId === id
    return (
        <FriendListItem $isSelected={isSelected}>
            <img src={imageUrl} alt={name} />
            <h3>{name}</h3>
            {balance < 0 &&     <p className='text-red-600'>you owe {name} ${Math.abs(balance)}</p>}
            {balance > 0 &&     <p className='text-green-700'>{name} owes you ${Math.abs(balance)}</p>}
            {balance === 0 &&   <p>you and {name} are even</p>}
            <button className="remove" title="remove" id={id} type="button" onClick={removeFriend}>
                <BiSolidTrashAlt />
            </button>
            <button className="select" title="select" id={id} type="button" onClick={changeSelectedFriendId}>
                {isSelected ? <ImRadioChecked2 /> : <ImRadioUnchecked />}
            </button>
        </FriendListItem>
    )
}

export default FriendItem
