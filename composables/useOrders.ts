// ** Third Party Imports
import { useMutation } from '@tanstack/vue-query'

// ** State
const path = ref<string>(ROUTE.ORDERS)

export default function () {
    return {
        path
    }
}

export const useOrderCheckout = () => {
    return useMutation({
        mutationFn: (body: IProductCommentFormInput) => useAuthFetcher(path.value, { method: 'POST', body }),
        onSuccess: () => {
            useNotification('Đặt hàng thành công!')
        },
        onError: () => useNotificationError()
    })
}
