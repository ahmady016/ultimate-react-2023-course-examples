import React from 'react'
import { IoRocketSharp } from 'react-icons/io5'
import styled from 'styled-components'

import { usePostsContext } from '../PostsContext'

const BlogSearchResultContainer = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #444;
    svg {
        font-size: 1.75rem;
    }
`
const BlogSearchResult: React.FC = () => {
	const { posts } = usePostsContext()
	return (
        <BlogSearchResultContainer>
            <IoRocketSharp />
            <span>{posts.length} Atomic Posts Found</span>
        </BlogSearchResultContainer>
    )
}

export default BlogSearchResult
