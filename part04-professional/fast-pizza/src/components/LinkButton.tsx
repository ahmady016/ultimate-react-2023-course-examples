/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

const baseLinkClasses = 'text-sm text-blue-500 hover:text-blue-600 hover:underline'
type LinkButtonProps = React.ComponentProps<'a'> & {
	to: string
}
const LinkButton: React.FC<LinkButtonProps> = ({ to, children, className }) => {
    const navigate = useNavigate()
    const goBack = React.useCallback(() => navigate(-1), [])
    const linkClasses = classNames(baseLinkClasses, className)

    if(to === '-1') return <button type="button" className={linkClasses} onClick={goBack}>{children}</button>
	return <Link to={to} className={linkClasses}>{children}</Link>
}

export default LinkButton
