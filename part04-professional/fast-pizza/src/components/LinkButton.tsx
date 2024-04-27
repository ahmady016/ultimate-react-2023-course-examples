/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const linkClasses = 'text-sm text-blue-500 hover:text-blue-600 hover:underline'
type LinkButtonProps = {
	to: string
    children: React.ReactNode
}
const LinkButton: React.FC<LinkButtonProps> = ({ to, children }) => {
    const navigate = useNavigate()
    const goBack = React.useCallback(() => navigate(to), [to])
    if(to === '-1') return <button type="button" className={linkClasses} onClick={goBack}>{children}</button>
	return <Link to={to} className={linkClasses}>{children}</Link>
}

export default LinkButton
