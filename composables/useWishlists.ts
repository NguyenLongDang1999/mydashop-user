// ** Third Party Imports
import { useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IWishlist, IWishlistFormInput } from '~/types/wishlists.type'

// ** State
const path = ref<string>(ROUTE.WISHLISTS)

export default function () {
    return {
        path
    }
}

export const useWishlistList = () => {
    // ** useHooks
    const { data } = useQueryFetch<IWishlist[]>(path.value)

    return {
        dataList: computed(() => data.value || [])
    }
}

export const useWishlistAdd = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<IWishlistFormInput>(path.value, {
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] })
            useNotification(MESSAGE_SUCCESS.WISHLISTS)
        },
        onError: () => useNotification(undefined, true)
    })
}

// export const useCartQuantity = () => {
//     const queryClient = useQueryClient()

//     return useQueryMutation<ICartFormInput>(path.value, {
//         onSuccess: () => queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] }),
//         onError: () => useNotification(undefined, true)
//     }, 'PATCH')
// }


// export const useCartDelete = (purge = false) => {
//     const queryClient = useQueryClient()

//     return useQueryMutationDelete<number>(purge ? `${path.value}/purge-cart` : path.value, {
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
//             useNotification(MESSAGE_SUCCESS.DELETE_CART)
//         },
//         onError: () => useNotification(undefined, true)
//     })
// }
