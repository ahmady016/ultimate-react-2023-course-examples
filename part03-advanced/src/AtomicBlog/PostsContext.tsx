/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { faker } from '@faker-js/faker'

export type Post = {
    id: string
    title: string
    body: string
}
export const createRandomPost = (): Post => ({
    id: faker.datatype.uuid(),
	title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
	body: faker.hacker.phrase(),
})

export type PostsContextValue = {
    posts: Post[]
    addPost: (post: Post) => void
    clearPosts: () => void
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    changeSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const postsContextDefaultValue: PostsContextValue = {
    posts: [],
    addPost: () => {},
    clearPosts: () => {},
    searchQuery: '',
    setSearchQuery: () => {},
    changeSearchQuery: () => {},
}
const PostsContext = React.createContext<PostsContextValue>(postsContextDefaultValue)
const PostsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // Mutable state. The search query to filter posts
    const [searchQuery, setSearchQuery] = React.useState('')
    // memoized input change handler.
    const changeSearchQuery = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value), [])
    // Mutable state. generate a random array of posts
    const [allPosts, setAllPosts] = React.useState<Post[]>(() => Array.from({ length: 20 }, createRandomPost))
    // Derived state. These are the posts that will actually be displayed
    const posts = React.useMemo(() =>
        searchQuery.length > 0
            ? allPosts.filter(({ title, body }) => `${title} ${body}`.toLowerCase().includes(searchQuery.toLowerCase()))
            : allPosts
    , [searchQuery, allPosts])

    const addPost = React.useCallback((post: Post) => setAllPosts((posts) => [post, ...posts]), [])
    const clearPosts = React.useCallback(() => setAllPosts([]), [])

    const contextValue = React.useMemo(() => ({
        posts,
        addPost,
        clearPosts,
        searchQuery,
        setSearchQuery,
        changeSearchQuery,
    }), [posts, searchQuery])

    return (
        <PostsContext.Provider value={contextValue}>
            {children}
        </PostsContext.Provider>
    )
}
function usePostsContext() {
    const context = React.useContext(PostsContext)
    if (context === undefined)
        throw new Error("PostsContext was used outside of the PostsContextProvider")
    return context
}

export default PostsContextProvider
export { usePostsContext }
