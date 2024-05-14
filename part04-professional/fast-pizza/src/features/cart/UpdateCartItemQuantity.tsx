/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useAppDispatch } from '../../store'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

import Button from '../../components/Button'

type UpdateCartItemQuantityProps = {
    pizzaId: number
    quantity: number
}
const UpdateCartItemQuantity: React.FC<UpdateCartItemQuantityProps> = ({ pizzaId, quantity }) => {
    const dispatch = useAppDispatch()
    const handleIncreaseQuantity = React.useCallback(() => void dispatch(increaseItemQuantity(pizzaId)), [pizzaId])
    const handleDecreaseQuantity = React.useCallback(() => void dispatch(decreaseItemQuantity(pizzaId)), [pizzaId])

    return (
        <div className="flex items-center justify-between gap-2 md:gap-3">
            <Button type="button" variant="round" onClick={handleDecreaseQuantity}>-</Button>
            <span className="text-sm font-medium">{quantity}</span>
            <Button type="button" variant="round" onClick={handleIncreaseQuantity}>+</Button>
        </div>
    )
}

export default UpdateCartItemQuantity
