export function formatCurrency(value: number) {
	return new Intl
		.NumberFormat('en', { style: 'currency', currency: 'EUR' })
		.format(value)
}

export function formatDate(date: string) {
	return new Intl
		.DateTimeFormat('en', {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit',
		})
		.format(new Date(date))
}

export function calcMinutesLeft(date: string) {
	const currentTime = new Date().getTime()
	const givenTime = new Date(date).getTime()
	return Math.round((givenTime - currentTime) / 60000)
}

export const isValidPhone = (value: string) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(value)
