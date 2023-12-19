// ** Third Party Imports
import { useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { ICart, ICartFormInput } from '~/types/cart.type'

// ** State
const path = ref<string>(ROUTE.CART)

export default function () {
    return {
        path
    }
}

export const useCartList = () => {
    // ** useHooks
    const { data } = useQueryFetch<ICart>(path.value)

    // ** Computed
    const dataList = computed(() => data.value as ICart)
    const cartLength = computed(() => dataList.value?.CartItem && dataList.value?.CartItem.length)
    const cartTotal = computed(() => cartLength.value && dataList.value?.CartItem.reduce((acc, item) => acc + (formatSellingPrice(item.Product, item.quantity, false) as number), 0))

    return {
        path,
        dataList: computed(() => data.value as ICart),
        cartLength,
        cartTotal
    }
}

export const useCartAdd = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<ICartFormInput>(path.value, {
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] })
            useNotification(MESSAGE_SUCCESS.CART)
        },
        onError: () => useNotification(undefined, true)
    })
}

export const useCartQuantity = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<ICartFormInput>(path.value, {
        onSuccess: () => queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] }),
        onError: () => useNotification(undefined, true)
    }, 'PATCH')
}


export const useCartDelete = (purge = false) => {
    const queryClient = useQueryClient()

    return useQueryMutationDelete<number>(purge ? `${path.value}/purge-cart` : path.value, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            useNotification(MESSAGE_SUCCESS.DELETE_CART)
        },
        onError: () => useNotification(undefined, true)
    })
}
