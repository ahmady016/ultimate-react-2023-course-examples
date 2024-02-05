/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { faker } from '@faker-js/faker'
import styled from 'styled-components'

import { usePostsContext } from '../PostsContext'

const BlogAddPostFormContainer = styled.form`
    width: 100%;
    margin: 1rem 0;
    padding: 1rem 0.5rem;
    background-color: #ffe8cc;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    input, textarea {
        width: 40%;
        height: 3.75rem;
        border-radius: 10px;
        padding: 0.5rem 0.75rem;
        border: 1px solid #ffe8cc;
        font-size: 1rem;
    }
    button {

    }
`
const BlogAddPostForm: React.FC = () => {
	const [title, setTitle] = React.useState('')
	const changeTitle = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => void setTitle(e.target.value), [])
	const [body, setBody] = React.useState('')
	const changeBody = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => void setBody(e.target.value), [])

    const { addPost } = usePostsContext()
    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(title.trim() && body.trim()) {
            addPost({ id: faker.datatype.uuid(), title, body })
            setTitle('')
            setBody('')
        }
    }, [title, body])

	return (
		<BlogAddPostFormContainer onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Post Title"
				value={title}
				onChange={changeTitle}
			/>
			<textarea
                placeholder="Post Body"
                value={body}
                onChange={changeBody}
            />
			<button type="submit">Add Post</button>
		</BlogAddPostFormContainer>
	)
}

export default BlogAddPostForm
