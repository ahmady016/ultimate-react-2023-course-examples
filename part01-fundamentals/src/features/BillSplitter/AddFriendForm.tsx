import React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'

import { Friend, getFullImageUrl } from './data'

const AddFriendFormContainer = styled.form`
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #ffdeb3;
    border-radius: 7px;
    font-size: 1rem;
    transition: 0.3s;
    &:hover {
        background-color: #fad19a;
    }
    input {
        width: 82%;
        margin-right: 0.75rem;
        padding: 0.75rem;
        border: 1px solid #ffe8cc;;
        border-radius: 5px;
        font-size: 1rem;
        color: #495057;
        transition: 0.3s;
        &:focus {
            outline: none;
            border: 1px solid #ff922b;;
        }
    }
    button {
        padding: 0.75rem 1.75rem;
    }
`
type AddFriendFormProps = {
	addNewFriend: (friend: Friend) => void
}
const AddFriendForm: React.FC<AddFriendFormProps> = ({ addNewFriend }) => {
    const [name, setName] = React.useState('')
    const changeName = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}, [])
    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(!name.trim())
			return;

        const id = nanoid(10)
        addNewFriend({
			id,
			name: name.trim(),
			imageUrl: getFullImageUrl(id),
            balance: 0
		})
		setName('')
	}, [addNewFriend, name])

    return (
        <AddFriendFormContainer onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="type your friend name here ..."
                name={name}
                value={name}
                onChange={changeName}
            />
            <button disabled={!name}>Add</button>
        </AddFriendFormContainer>
    )
}

export default AddFriendForm
