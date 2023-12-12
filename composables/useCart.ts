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
    const cartTotal = computed(() => cartLength.value && dataList.value?.CartItem.reduce((acc, item) => acc + (item.quantity * Number(item.Product.selling_price)), 0))

    return {
        path,
        dataList: computed(() => data.value as ICart),
        cartLength,
        cartTotal
    }
}

export const useCartAdd = () => {
    return useQueryMutation<ICartFormInput>(path.value, {
        onSuccess: () => useNotification(MESSAGE_SUCCESS.CART),
        onError: () => useNotification(undefined, true)
    })
}
