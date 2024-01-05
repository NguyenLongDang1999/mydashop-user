// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { ICart, ICartFormInput, ICouponFormInput } from '~/types/cart.type'

// ** State
const path = ref<string>(ROUTE.CART)

export default function () {
    return {
        path
    }
}

export const useCartList = () => {
    // ** useHooks
    const { userData } = useAuth()

    const { data } = useQuery<ICart>({
        queryKey: [path.value + 'DataList', userData.value?.id],
        queryFn: () => useAuthFetcher(path.value + '/data-list')
    })

    // ** Computed
    const dataList = computed(() => data.value as ICart)
    const cartLength = computed(() => dataList.value?.CartItem && dataList.value?.CartItem.length)
    const cartQuantity = computed(() => cartLength.value ? dataList.value?.CartItem.length : 0)
    const cartTotal = computed(() => cartLength.value && dataList.value?.CartItem.reduce((acc, item) => acc + (formatSellingPrice(item.Product, item.quantity, false) as number), 0))

    return {
        path,
        dataList: computed(() => data.value as ICart),
        cartLength,
        cartQuantity,
        cartTotal
    }
}

export const useCartAdd = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: ICartFormInput) => useAuthFetcher(path.value, { method: 'POST', body }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] })
            useNotification(MESSAGE_SUCCESS.CART)
        },
        onError: () => useNotificationError()
    })
}

export const useCartApplyCoupon = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: ICouponFormInput) => useAuthFetcher(path.value + '/apply-coupon', { method: 'POST', body }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] })
            useNotification('Áp dụng Coupon thành công.')
        },
        onError: () => useNotificationError()
    })
}

export const useCartQuantity = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: ICartFormInput) => useAuthFetcher(path.value, { method: 'PATCH', body }),
        onSuccess: () => queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] }),
        onError: () => useNotificationError()
    })
}

export const useCartDelete = (purge = false) => {
    const queryClient = useQueryClient()

    const newPath = purge ? `${path.value}/purge-cart` : path.value + '/'

    return useMutation({
        mutationFn: (body: number) => useAuthFetcher(newPath + body, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            useNotification(MESSAGE_SUCCESS.DELETE_CART)
        },
        onError: () => useNotificationError()
    })
}

export const useCartRemoveCoupon = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => useAuthFetcher(path.value + '/remove-coupon', { method: 'PATCH' }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] }),
        onError: () => useNotificationError()
    })
}
