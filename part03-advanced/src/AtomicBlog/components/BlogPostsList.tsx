import React from 'react'
import styled from 'styled-components'

import { usePostsContext } from '../PostsContext'

const BlogPostsListContainer = styled.ul`
	list-style: none;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 2rem;
	li {
		padding: 1rem 1.25rem;
		border: 1px solid #ffe8cc;
		background-color: #ffe8cc;
		border-radius: 20px;
		&:hover {
			background-color: #f7d6aa;
		}
		h3 {
			margin-bottom: 1.25rem;
			text-transform: capitalize;
			color: #333;
		}
        p {
            color: #555;
            font-size: 0.9rem;
        }
	}
`
const BlogPostsList: React.FC = () => {
	const { posts } = usePostsContext()

	if (posts.length === 0) return <p>No Posts Found</p>

	return (
		<BlogPostsListContainer>
			{posts.map(({ id, title, body }) =>
				<li key={id}>
					<h3>{title}</h3>
					<p>{body}</p>
				</li>
			)}
		</BlogPostsListContainer>
	)
}

export default BlogPostsList
