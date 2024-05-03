/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { ErrorResponse, useRouteError } from 'react-router-dom'
import { BsEmojiFrownFill } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'

import LinkButton from './LinkButton'

const ErrorBox: React.FC = () => {
	const error = useRouteError()
	return (
		<div className="py-4">
			<h1 className="text-xl flex items-center gap-3">
				<span>Something went wrong</span>
				<BsEmojiFrownFill />
			</h1>
			<p>{(error as ErrorResponse)?.data || (error as Error)?.message}</p>
			<LinkButton to="-1" className="w-20 flex justify-evenly items-center">
				<BiArrowBack />
				<span>Go back</span>
			</LinkButton>
		</div>
	)
}

export default ErrorBox
