/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

import Button from './Button'

const BackButton: React.FC = () => {
	const navigate = useNavigate()
	const goBack = React.useCallback(() => navigate(-1), [])
	return (
		<Button variant="back" onClick={goBack}>
			<BiArrowBack /> Back
		</Button>
	)
}

export default BackButton
