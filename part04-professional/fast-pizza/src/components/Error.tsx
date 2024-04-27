/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsEmojiFrownFill } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'

const ErrorBox: React.FC = () => {
	const navigate = useNavigate()
	const goBack = React.useCallback(() => navigate(-1), [])

	return (
		<div>
			<h1>Something went wrong <BsEmojiFrownFill /></h1>
			<p>%MESSAGE%</p>
			<button onClick={goBack}>
				<BiArrowBack />
				<span>Go back</span>
			</button>
		</div>
	)
}

export default ErrorBox
