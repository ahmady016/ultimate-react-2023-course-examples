import React from 'react'

import BlogAddPostForm from './BlogAddPostForm'
import BlogPostsList from './BlogPostsList'

const BlogMain: React.FC = React.memo(() => (
	<main>
		<BlogAddPostForm />
		<BlogPostsList />
	</main>
))

export default BlogMain
