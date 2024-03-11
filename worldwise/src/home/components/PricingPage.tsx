import React from 'react'
import styled from 'styled-components'

const PricingPageContainer = styled.div`
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
const PricingPage: React.FC = () => {
	return (
		<PricingPageContainer>
			<section>
				<div>
					<h2>
						Simple pricing.
						<br />
						Just $9/month.
					</h2>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
						labore mollitia iusto. Recusandae quos provident, laboriosam fugit
						voluptatem iste.
					</p>
				</div>
				<img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
			</section>
		</PricingPageContainer>
	)
}

export default PricingPage
