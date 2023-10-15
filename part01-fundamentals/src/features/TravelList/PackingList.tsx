import React from 'react'
import styled from 'styled-components'

import { PackingItem } from './data'

import PackingListItem from './PackingListItem'

const PacKingListContainer = styled.div`
	min-height: 8rem;
	padding: 3rem 0;
	background-color: #3842ab;
	color: #ffebb3;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 3rem;
	font-size: 1.25rem;
	ul {
		list-style: none;
		width: 90%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		justify-content: center;
		align-content: start;
		gap: 1.25rem;
	}
`
type PacKingListProps = {
	list: PackingItem[]
	togglePackedStatus: (e: React.ChangeEvent<HTMLInputElement>) => void
	removePackingItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const PacKingList: React.FC<PacKingListProps> = ({
	list, togglePackedStatus, removePackingItem
}) => (
	<PacKingListContainer>
		{list.length > 0
			?	<ul>
					{list.map(item =>
						<PackingListItem
							item={item}
							togglePackedStatus={togglePackedStatus}
							removePackingItem={removePackingItem}
						/>
					)}
				</ul>
			: <p>Oops, There is no packing items right now!</p>
		}
	</PacKingListContainer>
)

export default PacKingList
