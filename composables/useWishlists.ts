// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

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
    const { data } = useQuery<IWishlist[]>({
        queryKey: [path.value + 'DataList'],
        queryFn: () => useAuthFetcher(path.value + '/data-list')
    })

    return {
        dataList: computed(() => data.value || [])
    }
}

export const useWishlistAdd = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: IWishlistFormInput) => useAuthFetcher(path.value, { method: 'POST', body }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            useNotification(MESSAGE_SUCCESS.WISHLISTS)
        },
        onError: () => useNotificationError()
    })
}

export const useWishlistDelete = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: number) => useAuthFetcher(path.value + `/${body}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
        },
        onError: () => useNotificationError()
    })
}

export const useWishlistPagination = () => {
    // ** Data
    const search = reactive({
        page: PAGE.CURRENT,
        pageSize: 12
    })

    const { data, isFetching } = useQuery<IWishlistDataTable>({
        queryKey: [path.value + 'DataTable', search],
        queryFn: () => useAuthFetcher(path.value, { params: search }),
        placeholderData: keepPreviousData
    })

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}
