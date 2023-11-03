import React from 'react'

type PayOutputProps = {
    bill: number
    tip: number
}
const PayOutput: React.FC<PayOutputProps> = ({ bill, tip }) => {
	return <p className="my-4 text-md text-green-800 font-semibold">You Pay ${bill + tip} (${bill} + ${tip} tip)</p>
}

export default PayOutput
