/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useAppDispatch } from '../../store'
import { removeFromCart } from './cartSlice'

import Button from '../../components/Button'

type RemoveCartItemButtonProps = {
	pizzaId: number
}
const RemoveCartItemButton: React.FC<RemoveCartItemButtonProps> = ({ pizzaId }) => {
	const dispatch = useAppDispatch()
	const handleRemoveCartItem = React.useCallback(() => void dispatch(removeFromCart(pizzaId)), [pizzaId])

	return <Button variant="small" onClick={handleRemoveCartItem}>DELETE</Button>
}

export default RemoveCartItemButton
