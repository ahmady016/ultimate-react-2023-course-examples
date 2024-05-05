import React from 'react'
import { useNavigation, useActionData, Form, redirect, ActionFunctionArgs } from 'react-router-dom'

import { isValidPhone } from '../../services/helpers'
import { initialCart, NewOrder, createOrder } from '../../services/apiRestaurant'

import Button from '../../components/Button'

const CreateOrderForm: React.FC = () => {
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	const formErrors = useActionData() as Record<string, string>
	return (
		<div className="my-10 px-4 text-center sm:my-16">
			<h1 className="mb-8 text-xl font-semibold md:text-3xl">
				The Create Order Form
			</h1>
			<Form method="POST">
				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="font-semibold text-left basis-1/4">Full Name</label>
					<input className="border border-gray-400 rounded-md basis-3/4 py-1 px-4" type="text" name="customer" required />
				</div>
				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="font-semibold text-left basis-1/4">Phone number</label>
					<input className="border border-gray-400 rounded-md basis-3/4 py-1 px-4" type="tel" name="phone" required />
				</div>
				{!isSubmitting && formErrors?.phone && <p className="my-2 p-2 rounded-md bg-red-200 text-red-700 text-md">Phone Error: {formErrors.phone}</p>}
				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="font-semibold text-left basis-1/4">Address</label>
					<input className="border border-gray-400 rounded-md basis-3/4 py-1 px-4" type="text" name="address" required />
				</div>
				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<input className="cursor-pointer scale-125" type="checkbox" name="priority" id="priority" />
					<label className="cursor-pointer font-semibold" htmlFor="priority">Want to yo give your order priority ?</label>
				</div>
				<input type="hidden" name="cart" value={JSON.stringify(initialCart)} />
				<div>
					<Button type="submit" variant="primary" disabled={isSubmitting}>
						{isSubmitting ? 'Submitting...' : 'Order Now'}
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
		errors.phone = 'Please give us your correct phone number. We might need it to contact you.';
	if (Object.keys(errors).length > 0)
		return errors

	const createdOrder = await createOrder(newOrder)
	return redirect(`/order/${createdOrder.id}`)
}

export default CreateOrderForm
