import React from 'react'
import styled from 'styled-components'

import { PackingItem } from './data'
import { nanoid } from 'nanoid'

const PackingFormContainer = styled.form`
	padding: 1.5rem 0;
	background-color: #4f78ff;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.75rem;
	h3 {
		margin-right: 1.5rem;
		font-size: 1.25rem;
	}
	button,
	select,
	input {
		padding: 1rem;
		background-color: #ffebb3;
		color: #5a3e2b;
		border: none;
		border-radius: 10rem;
		cursor: pointer;
		font-family: inherit;
		font-weight: 700;
		font-size: 1rem;
	}
	select {
		width: 4rem;
	}
	input {
		width: 20rem;
	}
	button {
		width: 6rem;
		text-transform: uppercase;
		background-color: #2447b7;
		color: #fff;
	}
	button:disabled, button[disabled] {
		cursor: not-allowed;
		background-color: #ccc;
		color: #333;
	}
`
type PackingFormProps = {
	createPackingItem: (newItem: PackingItem) => void
}
const PackingForm: React.FC<PackingFormProps> = ({ createPackingItem }) => {
	const [description, setDescription] = React.useState('')
	const changeDescription = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value)
	}, [])
	const [quantity, setQuantity] = React.useState(1)
	const changeQuantity = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setQuantity(Number(e.target.value))
	}, [])

	const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(!description.trim())
			return;
		createPackingItem({
			id: nanoid(10),
			title: description.trim(),
			packed: false,
			quantity,
		})
		setDescription('')
		setQuantity(1)
	}, [createPackingItem, description, quantity])

	return (
		<PackingFormContainer onSubmit={handleSubmit}>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				value={quantity}
				onChange={changeQuantity}
			>
				{Array
					.from({ length: 20 }, (_, i) => i + 1)
					.map(num => <option key={num} value={num}>{num}</option> )
				}
			</select>
			<input
				type="text"
				placeholder="Type a Packing Item ..."
				value={description}
				onChange={changeDescription}
			/>
			<button disabled={!description}>Add</button>
		</PackingFormContainer>
	)
}

export default PackingForm
