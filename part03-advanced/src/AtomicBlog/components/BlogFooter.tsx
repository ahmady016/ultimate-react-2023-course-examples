import React from 'react'
import styled from 'styled-components'

const BlogFooterContainer = styled.footer`
    width: 100%;
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    background-color: #ffe8cc;
    color: #555;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 600;
`
const BlogFooter: React.FC = () => (
    <BlogFooterContainer>&copy; by The Atomic Blog</BlogFooterContainer>
)

export default BlogFooter
