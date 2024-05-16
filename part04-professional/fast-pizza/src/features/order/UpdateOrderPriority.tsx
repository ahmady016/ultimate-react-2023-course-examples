import { Params, useFetcher } from 'react-router-dom'

import Button from '../../components/Button'
import { updateOrder } from '../../services/apiRestaurant'

const UpdateOrderPriority: React.FC = () => {
	const routerFetcher = useFetcher()
	return (
		<routerFetcher.Form method="PATCH" className="text-right">
			<Button type="submit" variant="primary">
				Prioritized This Order
			</Button>
		</routerFetcher.Form>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export async function updateOrderPriorityAction({ params }: { params: Params<'orderId'> }) {
    await updateOrder(params.orderId!, { priority: true })
    return null
}

export default UpdateOrderPriority
