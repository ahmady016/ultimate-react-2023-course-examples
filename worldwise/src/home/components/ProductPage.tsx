import React from 'react'
import styled from 'styled-components'

const ProductPageContainer = styled.div`
	height: 100%;
	width: 85%;
	margin: 0 auto;
	background-color: var(--color-dark--1);
	section {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 5rem;
		img {
			width: 100%;
		}
		div {
			h2 {
				font-size: 2rem;
				line-height: 1.2;
				margin-bottom: 3rem;
			}
			p {
				font-size: 1rem;
				margin-bottom: 2rem;
			}
		}
	}
`
const ProductPage: React.FC = () => {
	return (
		<ProductPageContainer>
			<section>
				<img
					src="img-1.jpg"
					alt="person with dog overlooking mountain with sunset"
				/>
				<div>
					<h2>About WorldWide.</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
						dicta illum vero culpa cum quaerat architecto sapiente eius non
						soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
						perspiciatis?
					</p>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
						doloribus libero sunt expedita ratione iusto, magni, id sapiente
						sequi officiis et.
					</p>
				</div>
			</section>
		</ProductPageContainer>
	)
}

export default ProductPage
