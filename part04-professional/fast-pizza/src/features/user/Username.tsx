import { useSelector } from 'react-redux'

import { selectUserName } from './userSlice'

const Username: React.FC = () => {
	const username = useSelector(selectUserName)

	if (!username) return null
	return <div className="hidden text-sm font-semibold md:block">{username}</div>
}

export default Username
