/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'

import { Post, createRandomPost, usePostsContext } from '../PostsContext'

const BlogArchiveContainer = styled.aside`
    width: 100%;
    margin: 1rem 0;
    ul {
        list-style: none;
        margin: 1rem 0;
        li {
            margin-bottom: 1rem;
            font-size: 0.9rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                flex-basis: 88%;
            }
            button {
                flex-basis: 10%;
                font-size: 0.75rem;
            }
        }
    }
`
const BlogArchive: React.FC = () => {
    const [posts] = React.useState<Post[]>(() => Array.from({ length: 2000 }, createRandomPost))

    const [showArchive, setShowArchive] = React.useState(false)
	const toggleArchive = React.useCallback(() => setShowArchive((showArchive) => !showArchive), [])

    const { addPost } = usePostsContext()
    const handleAddPost = React.useCallback((post: Post) => () => addPost(post), [])

	return (
		<BlogArchiveContainer>
			<h2>Posts Archive</h2>
			<button onClick={toggleArchive}>
				{showArchive ? 'Hide Archived Posts' : 'Show Archived Posts'}
			</button>
			{showArchive && posts.length > 0 &&
				<ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <p> <strong>{post.title}</strong> {post.body}</p>
                            <button onClick={handleAddPost(post)}>Add Post</button>
                        </li>
                    ))}
                </ul>
            }
		</BlogArchiveContainer>
	)
}

export default BlogArchive
