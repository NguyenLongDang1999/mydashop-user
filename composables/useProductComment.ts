// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IProductCommentFormInput, IProductCommentPagination } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT_COMMENT)

export default function () {
    return {
        path
    }
}

export const useProductCommentList = async (id: number) => {
    // ** Data
    const search = reactive({
        page: PAGE.CURRENT,
        pageSize: 8
    })

    // ** useHooks
    const { data, isFetching, suspense } = useQuery<IProductCommentPagination>({
        queryKey: [path.value + 'DataList', id, search],
        queryFn: () => useFetcher(path.value + `/${id}`, { params: search }),
        placeholderData: keepPreviousData
    })

    await suspense()

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0),
        dataComments: computed(() => data.value)
    }
}

export const useProductCommentAdd = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: IProductCommentFormInput) => useAuthFetcher(path.value, { method: 'POST', body }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] })
            useNotification('Gửi đánh giá sản phẩm thành công!')
        },
        onError: () => useNotificationError()
    })
}
