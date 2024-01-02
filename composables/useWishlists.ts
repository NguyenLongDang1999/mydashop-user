// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IWishlist, IWishlistDataTable, IWishlistFormInput } from '~/types/wishlists.type'

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
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            useNotification(MESSAGE_SUCCESS.WISHLISTS)
        },
        onError: () => useNotification(undefined, true)
    })
}

export const useWishlistDelete = () => {
    const queryClient = useQueryClient()

    return useQueryMutationDelete<number>(path.value, {
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
        },
        onError: () => useNotification(undefined, true)
    })
}

export const useWishlistPagination = () => {
    // ** Data
    const search = reactive({
        page: PAGE.CURRENT,
        pageSize: 12
    })

    const { data, isFetching } = useQueryFetch<IWishlistDataTable>(path.value, '', 'DataTable', search, {
        placeholderData: keepPreviousData
    })

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}
