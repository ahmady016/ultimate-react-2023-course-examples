/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import styled from 'styled-components'

import { PackingItem } from './data'

const PackingStatsContainer = styled.footer`
	margin: 0;
	padding: 1.75rem 0;
	background-color: #4f78ff;
	color: #fff;
	font-size: 1.25rem;
	font-weight: 700;
	text-align: center;
`
type PackingStatsProps = {
	items: PackingItem[]
}
const PackingStats: React.FC<PackingStatsProps> = ({ items }) => {
	if (items.length === 0)
		return (
			<PackingStatsContainer>
				<em>Start adding some items to your packing list 🚀</em>
			</PackingStatsContainer>
		)

	const totalItems = items.length
	const packedItems = items.filter(item  => item.packed).length
	const packingPercent = Math.round((packedItems / totalItems) * 100)
	return (
		<PackingStatsContainer>
			<em>
				{packingPercent === 100
					? "You got everything! Ready to go ✈️"
					: `💼 You have ${totalItems} items on your list, and you already packed ${packedItems} (${packingPercent}%)`}
			</em>
		</PackingStatsContainer>
	)
}

export default PackingStats
