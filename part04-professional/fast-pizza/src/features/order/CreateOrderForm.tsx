/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigation, useActionData, Form, redirect, ActionFunctionArgs } from 'react-router-dom'
import { useSelector } from 'react-redux'

import store, { useAppDispatch } from '../../store'
import { fetchAddressThunk, selectUserAddress, selectUserName } from '../user/userSlice'
import { clearCart, selectCartList, selectCartTotalPrice, selectIsEmptyCart } from '../cart/cartSlice'

import { NewOrder, createOrder } from '../../services/apiRestaurant'
import { formatCurrency, isValidPhone } from '../../services/helpers'

import EmptyCart from '../cart/EmptyCart'
import Button from '../../components/Button'

const CreateOrderForm: React.FC = () => {
	const isEmptyCart = useSelector(selectIsEmptyCart)
	const userCart = useSelector(selectCartList)
	const username = useSelector(selectUserName)
	const userAddress = useSelector(selectUserAddress)
	const isFetchingAddress = userAddress.status === 'loading'

	const dispatch = useAppDispatch()
	const handleFetchAddress = React.useCallback(() => void dispatch(fetchAddressThunk()), [])

	const [withPriority, setWithPriority] = React.useState(false)
	const changeWithPriority = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setWithPriority(e.target.checked), [])
	const totalCartPrice = useSelector(selectCartTotalPrice)
	const totalPriceWithPriority = withPriority ? totalCartPrice + (totalCartPrice * 0.2) : totalCartPrice

	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'
	const formErrors = useActionData() as Record<string, string>

	if(isEmptyCart) return <EmptyCart />

	return (
		<div className="my-10 px-4 text-center sm:my-16">
			<h1 className="mb-8 text-xl font-semibold md:text-3xl">Create Order Form</h1>
			<Form method="POST" className="w-[80%] mx-auto">
				<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="basis-1/4 text-left font-semibold">Full Name</label>
					<input
						className="basis-3/4 rounded-full border border-stone-400 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:border-stone-100 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
						type="text"
						name="customer"
						placeholder="Type Your Full Name"
						defaultValue={username}
						required
					/>
				</div>
				<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="basis-1/4 text-left font-semibold">Phone number</label>
					<input
						className="basis-3/4 rounded-full border border-stone-400 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:border-stone-100 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
						type="tel"
						name="phone"
						placeholder="Type Your Phone Number"
						required
					/>
				</div>
				{!isSubmitting && formErrors?.phone && (
					<p className="text-sm mb-4 rounded-md bg-red-200 p-2 text-red-700">
						{formErrors.phone}
					</p>
				)}
				<div className="relative mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="basis-1/4 text-left font-semibold">Address</label>
					<input
						className="basis-3/4 rounded-full border border-stone-400 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:border-stone-100 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
						type="text"
						name="address"
						placeholder="Type Your Address"
						defaultValue={userAddress.data?.address}
						disabled={isFetchingAddress}
						required
					/>
					{!isFetchingAddress && !userAddress.data && (
						<span className="absolute right-[3px] top-[3px] z-99 md:right-[5px] md:top-[5px]">
							<Button
								type="button"
								variant="small"
								onClick={handleFetchAddress}
								disabled={isFetchingAddress}
							>
								{isFetchingAddress ? 'Loading...' : 'Fetch Address'}
							</Button>
						</span>
					)}
				</div>
				{userAddress.status === 'error' && (
					<p className="text-sm mb-4 rounded-md bg-red-200 p-2 text-red-700">
						{userAddress.error}
					</p>
				)}
				<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
					<input
						className="h-5 w-5 cursor-pointer accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
						type="checkbox"
						id="priority"
						name="priority"
						checked={withPriority}
						onChange={changeWithPriority}
					/>
					<label className="cursor-pointer font-semibold" htmlFor="priority">
						Want to yo give your order priority ?
					</label>
				</div>
				<input type="hidden" name="cart" value={JSON.stringify(userCart)} />
				<input
					type="hidden"
					name="position"
					value={userAddress.data ? `${userAddress.data.position.latitude}, ${userAddress.data.position.longitude}` : ''}
				/>
				<div className="mt-6">
					<Button
						type="submit"
						variant="primary"
						disabled={isSubmitting || isFetchingAddress}
					>
						{isSubmitting ? 'Submitting...' : `Order Now For ${formatCurrency(totalPriceWithPriority)}`}
					</Button>
				</div>
			</Form>
		</div>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export async function createOrderFormAction({ request }: ActionFunctionArgs) {
	const formValues = Object.fromEntries(await request.formData())
	const newOrder = {
		...formValues,
		priority: formValues.priority === 'on',
		cart: JSON.parse(formValues.cart as string),
	} as NewOrder

	const errors: Record<string, string> = {}
	if (!isValidPhone(newOrder.phone))
		errors.phone = 'Please give us your correct phone number. We might need it to contact you.'
	if (Object.keys(errors).length > 0) return errors

	const createdOrder = await createOrder(newOrder)
	store.dispatch(clearCart())
	return redirect(`/order/${createdOrder.id}`)
}

export default CreateOrderForm
