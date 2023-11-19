import React from 'react'
import styled from 'styled-components'

import { Friend, toFriendsArray } from './data'

import FriendItem from './FriendItem'

const FriendListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
    background-color: #fff4e6;
    list-style: none;
    font-size: 1rem;
`

type FriendListProps = {
    friends: Record<string, Omit<Friend, "id">>
    selectedFriendId: string
    changeSelectedFriendId: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    removeFriend: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const FriendList: React.FC<FriendListProps> = ({ friends, selectedFriendId, changeSelectedFriendId, removeFriend }) => (
    <FriendListContainer>
        {toFriendsArray(friends)
            .map(friend =>
                <FriendItem
                    key={friend.id}
                    friend={friend}
                    removeFriend={removeFriend}
                    selectedFriendId={selectedFriendId}
                    changeSelectedFriendId={changeSelectedFriendId}
                />
            )
        }
    </FriendListContainer>
)

export default FriendList
