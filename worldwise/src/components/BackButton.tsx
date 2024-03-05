/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

import Button from './Button'

type BackButtonProps = {
	to?: string
}
const BackButton: React.FC<BackButtonProps> = ({ to }) => {
	const navigate = useNavigate()
	const goBack = React.useCallback(() => to ? navigate(to) : navigate(-1), [to])
	return (
		<Button variant="back" onClick={goBack}>
			<BiArrowBack /> Back
		</Button>
	)
}

export default BackButton
