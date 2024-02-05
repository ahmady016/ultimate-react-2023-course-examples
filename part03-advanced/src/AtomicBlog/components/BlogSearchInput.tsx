import React from 'react'
import styled from 'styled-components'

import { usePostsContext } from '../PostsContext'

const BlogSearchInputContainer = styled.form`
    width: 50%;
    input {
        width: 100%;
        padding: 0.5rem 1.25rem;
        border-radius: 10px;
        border: none;
        outline: none;
        font-size: 1.25rem;
        font-weight: 600;
        color: #222;
        background-color: #fff;
        font-family: 'IBM Plex Mono', sans-serif;
        &::placeholder {
            color: #555;
            font-weight: 400;
        }
        &:focus {
            box-shadow: 0 0 0 2px #ffe8cc;
        }
    }
`
const BlogSearchInput: React.FC = () => {
	const { searchQuery, changeSearchQuery } = usePostsContext()
	return (
        <BlogSearchInputContainer>
            <input
                type="text"
                placeholder="Search Posts ..."
                value={searchQuery}
                onChange={changeSearchQuery}
            />
        </BlogSearchInputContainer>
    )
}

export default BlogSearchInput
