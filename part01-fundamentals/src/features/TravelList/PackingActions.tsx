/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import styled from 'styled-components'

import { SortPackingItemsBy } from './data'

const PackingActionsContainer = styled.div`
	min-height: 4rem;
	padding: 1rem 0;
	background-color: #ffe396;
	color: #5a3e2b;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	font-size: 1rem;
	label, select, button {
		padding: 0.75rem 1rem;
		border-radius: 5px;
		cursor: pointer;
		text-transform: uppercase;
		font-weight: 700;
	}
	button {
		background-color: #b53e31;
		color: #fff;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}
`
type PackingActionsProps = {
	listLength: number
	clearPackingList: () => void
	sortPackingList: (sortBy: SortPackingItemsBy) => void
}
const PackingActions: React.FC<PackingActionsProps> = ({ listLength, sortPackingList, clearPackingList }) => {
	const [sortBy, setSortBy] = React.useState<SortPackingItemsBy>('input')
	const changeSortBy = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortBy(e.target.value as SortPackingItemsBy)
	}, [])
	React.useEffect(() => void sortPackingList(sortBy), [sortBy])

	return (
		<PackingActionsContainer>
			{listLength > 0
				?	<>
						<div>
							<label htmlFor="sortBy">Sort By</label>
							<select id="sortBy" name="sortBy" value={sortBy} onChange={changeSortBy}>
								<option value="input">Input Order</option>
								<option value="packed">Packed Status</option>
								<option value="title">Title</option>
								<option value="quantity">Quantity</option>
							</select>
						</div>
						<button onClick={clearPackingList}>
							<FiTrash2 />
							<span>Clear list</span>
						</button>
					</>
				: <p>Oops, There is no action can be taken on an empty List!</p>
			}
		</PackingActionsContainer>
	)
}

export default PackingActions
