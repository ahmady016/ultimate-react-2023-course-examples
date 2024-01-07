import React from 'react'
import { nanoid } from 'nanoid'
import { VscIssueDraft } from 'react-icons/vsc'

type GenerateIdsProps = {
    length?: number
    count?: number
}
const GenerateIds: React.FC<GenerateIdsProps> = ({ length = 6, count = 20 }) => {
	return (
		<ul className="w-7/12 mx-auto mb-4 grid grid-cols-4 gap-2 text-gray-900 bg-gray-200 border border-gray-200 rounded-lg">
			{Array
                .from({ length: count }, () => nanoid(length))
                .map(item =>
                    <li className="w-full px-4 py-2 flex justify-start items-center gap-3 text-lg font-medium border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700">
                        <VscIssueDraft />
                        {item}
                    </li>
            )}
		</ul>
	)
}

export default GenerateIds
