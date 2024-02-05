import React from 'react'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
import styled from 'styled-components'

import PostsContextProvider from './PostsContext'
import BlogHeader from './components/BlogHeader'
import BlogMain from './components/BlogMain'
import BlogArchive from './components/BlogArchive'
import BlogFooter from './components/BlogFooter'

const AtomicBlogPageContainer = styled.div`
    --color-semi-dark: #555;
    --color-dark: #3c3c3c;
    --color-darkest: #303030;
    --color-medium: #a7a7a7;
    --color-light: #ccc;
    --color-lightest: #eee;

    width: 100%;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-lightest);
    color: var(--color-darkest);
    font-family: 'IBM Plex Mono', sans-serif;
    h2 {
        font-size: 2rem;
        font-weight: 600;
        text-align: center;
        color: var(--color-darkest);
    }
    & > button {
        position: fixed;
        top: 5rem;
        right: 1rem;
        padding: 0.5rem;
        background-color: #ffe8cc;
        border-radius: 50%;
        border: none;
        line-height: 1;
        font-size: 26px;
    }
    section {
        width: 80%;
        margin: 0 auto;
    }
    button {
        font-size: 1rem;
        font-weight: 600;
        padding: 0.5rem 1rem;
        background-color: #f3cc9d;
        border-radius: 10px;
        border: none;
        &:hover {
            background-color: #ffd072;
            box-shadow: 0 0 0 2px #ffe8cc;
        }
    }
`
const AtomicBlogPage: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false)
    const toggleDarkMode = React.useCallback(() => setIsDarkMode((isDarkMode) => !isDarkMode), [])
    React.useEffect(() => void document.documentElement.classList.toggle("dark-mode"), [isDarkMode])

	return (
        <AtomicBlogPageContainer>
            <button onClick={toggleDarkMode}>
                {isDarkMode ? <MdDarkMode /> : <MdOutlineLightMode />}
            </button>
            <section>
                <PostsContextProvider>
                    <BlogHeader />
                    <BlogMain />
                    <BlogArchive />
                    <BlogFooter />
                </PostsContextProvider>
            </section>
        </AtomicBlogPageContainer>
    )
}

export default AtomicBlogPage
