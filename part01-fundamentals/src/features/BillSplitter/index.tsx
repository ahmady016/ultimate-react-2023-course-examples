import React from 'react'
import styled from 'styled-components'

import { Friend, SplitBillInputs, getSelectedFriend, initialFriendsMap } from './data'

import AddFriendForm from './AddFriendForm'
import FriendList from './FriendList'
import SplitBillForm from './SplitBillForm'

const BillSplitterContainer = styled.div`
    display: grid;
    grid-template-columns: 6fr 6fr;
    column-gap: 2rem;
    align-items: start;
    padding: 0.5rem 1rem 0;
    font-family: "Quicksand", sans-serif;
    color: #495057;
    button {
        cursor: pointer;
        padding: 0.4rem 1.2rem;
        border: none;
        border-radius: 8px;
        background-color: #ffa94d;
        color: #343a40;
        font-weight: bold;
        transition: 0.3s;
    }
`
const BillSplitterSidebar = styled.div`
    width: 100%;
`
const BillSplitterPage: React.FC = () => {
    const [friends, setFriends] = React.useState(initialFriendsMap)
    const addNewFriend = React.useCallback((friend: Friend) => {
        const { id, ...friendWithoutId } = friend
        setFriends(friendsMap => ({
            ...friendsMap,
            [id]: friendWithoutId
        }))
    }, [])
    const removeFriend = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = e.currentTarget.id
        setFriends(friendsMap => {
            const newFriendsMap = { ...friendsMap }
            delete newFriendsMap[id]
            return newFriendsMap
        })
    }, [])

    const [selectedFriendId, setSelectedFriendId] = React.useState('')
    const changeSelectedFriendId = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const friendId = e.currentTarget.id
        setSelectedFriendId((prevId) => (friendId === prevId ? '' : friendId))
    }, [])

    const doSplitBill = React.useCallback((inputs: SplitBillInputs) => {
        setFriends(friendsMap => {
            const selectedFriend = getSelectedFriend(friendsMap)(selectedFriendId)
            const value = inputs.whoIsPaying === 'user' ? inputs.paidByFriend : -inputs.paidByUser
            return {
                ...friendsMap,
                [selectedFriendId]: {
                    ...selectedFriend,
                    balance: selectedFriend.balance + value
                }
            }
        })
    }, [selectedFriendId])

    return (
        <BillSplitterContainer>
            <BillSplitterSidebar>
                <AddFriendForm addNewFriend={addNewFriend} />
                <FriendList
                    friends={friends}
                    removeFriend={removeFriend}
                    selectedFriendId={selectedFriendId}
                    changeSelectedFriendId={changeSelectedFriendId}
                />
            </BillSplitterSidebar>
            {selectedFriendId &&
                <SplitBillForm
                    selectedFriend={getSelectedFriend(friends)(selectedFriendId)}
                    doSplitBill={doSplitBill}
                />
            }
        </BillSplitterContainer>
    )
}

export default BillSplitterPage
