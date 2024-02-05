import React from 'react'
import { LiaBlogSolid } from 'react-icons/lia'
import styled from 'styled-components'

import { usePostsContext } from '../PostsContext'

import BlogSearchResult from './BlogSearchResult'
import BlogSearchInput from './BlogSearchInput'

const BlogHeaderContainer = styled.header`
    margin-bottom: 2rem;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        svg {
            font-size: 2rem;
        }
        span {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1.75rem;
            font-weight: 600;
        }
    }
    div {
        width: 100%;
        margin-top: 1rem;
        padding: 1rem 0.5rem;
        background-color: #ffe8cc;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`
const BlogHeader: React.FC = () => {
    const { clearPosts } = usePostsContext()
	return (
        <BlogHeaderContainer>
            <h2>
                <LiaBlogSolid />
                <span>The Atomic Blog</span>
            </h2>
            <div>
                <BlogSearchInput />
                <BlogSearchResult />
                <button onClick={clearPosts}>Clear All Posts</button>
            </div>
        </BlogHeaderContainer>
    )
}

export default BlogHeader
