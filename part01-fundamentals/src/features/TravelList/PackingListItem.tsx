import React from 'react'
import styled from 'styled-components'

import { PackingItem } from './data'

const PackingListItemContainer = styled.li<{ $packed: boolean }>`
	display: flex;
	align-items: center;
	gap: 1rem;
	text-decoration: ${({ $packed }) => $packed ? 'line-through' : 'none' };
	input[type="checkbox"] {
		height: 1rem;
		width: 1rem;
		cursor: pointer;
		accent-color: #ffebb3;
	}
	button {
		padding: 0.5rem;
		border: none;
		background: none;
		font-size: 0.6rem;
		transform: translateY(2px);
	}
`
type PackingItemProps = {
	item: PackingItem
	togglePackedStatus: (e: React.ChangeEvent<HTMLInputElement>) => void
	removePackingItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const PackingListItem: React.FC<PackingItemProps> = ({
	item: { id, title, quantity, packed },
	togglePackedStatus,
	removePackingItem
}) => {
	return (
		<PackingListItemContainer $packed={packed}>
			<input
				type="checkbox"
				id={id}
				checked={packed}
				onChange={togglePackedStatus}
			/>
			<span>{quantity} {title}</span>
			<button id={id} onClick={removePackingItem}>❌</button>
		</PackingListItemContainer>
	)
}

export default PackingListItem
