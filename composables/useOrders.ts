// ** Third Party Imports
import { useMutation, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IOrdersCheckout } from '~/types/orders.type'

// ** State
const path = ref<string>(ROUTE.ORDERS)

export default function () {
    return {
        path
    }
}

export const useOrderCheckout = () => {
    const queryClient = useQueryClient()

    return useMutation<IOrdersCheckout, Error, IOrdersCheckout>({
        mutationFn: body => useAuthFetcher(path.value, { method: 'POST', body }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartDataList'] })

            useNotification('Đặt hàng thành công!')
            nextTick(() => navigateTo('/thanh-toan/cam-on'))
        },
        onError: () => useNotificationError()
    })
}
