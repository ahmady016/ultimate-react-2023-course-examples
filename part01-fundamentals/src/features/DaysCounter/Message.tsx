import React from 'react'

type MessageProps = {
	count: number
	date: string
}
const Message: React.FC<MessageProps> = ({ count, date }) => {
	return (
		<div className="text-center text-2xl">
			<span className="text-gray-600">
				{count === 0
					? 'Today is '
					: count > 0
                        ? `${count} days from today is `
                        : `${Math.abs(count)} days ago was `}
			</span>
			<span className="text-gray-700">{date}</span>
		</div>
	)
}

export default Message
