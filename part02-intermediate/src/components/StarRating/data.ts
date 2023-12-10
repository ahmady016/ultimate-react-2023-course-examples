export const fillRatingValues = (limit: number) => () =>
	Array.from({ length: limit }, (_, i) => i + 1)

export type StarRatingProps = {
	limit: number
	size: number
	color: string
	defaultRating?: number
	messages?: string[]
}
export const starRatingPropsList: StarRatingProps[] = [
	{
		limit: 5,
		size: 1,
		color: '#ff3d64',
		defaultRating: 2,
		messages: ['Very Bad', 'Bad', 'Okay', 'Good', 'Very Good'],
	},
	{
		limit: 7,
		size: 1.5,
		color: '#635bff',
		defaultRating: 1,
		messages: [
			'Very Terrible',
			'Terrible',
			'Bad',
			'Okay',
			'Good',
			'Very Good',
			'Amazing',
		],
	},
	{
		limit: 9,
		size: 2,
		color: '#637d19',
		defaultRating: 4,
		messages: [
            'Very Terrible',
			'Terrible',
			'Bad',
			'UnAcceptable',
			'Okay',
			'Good',
			'Very Good',
			'Amazing',
            'Fascinating'
		],
	},
	{
		limit: 11,
		size: 1.5,
		color: '#a3203b',
		defaultRating: 4,
		messages: [
            'Very Terrible',
            'Very Terrible',
			'Terrible',
			'Bad',
			'UnAcceptable',
			'Okay',
			'Good',
			'Very Good',
			'Amazing',
            'Fascinating',
            'Fascinating'
		],
	},
	{
		limit: 5,
		size: 2.5,
		color: '#2e3a0e',
		defaultRating: 1,
		messages: ['Disgraceful', 'Bad', 'Nice', 'Good', 'Fascinating'],
	},
]
