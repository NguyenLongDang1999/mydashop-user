// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

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
        pageSize: 8,
        id
    })

    // ** useHooks
    const { data, isFetching, suspense } = useQueryFetch<IProductCommentPagination>(path.value, `/${id}`, 'DataList', search, {
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

    return useQueryMutation<IProductCommentFormInput>(path.value, {
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] })
            useNotification('Gửi đánh giá sản phẩm thành công!')
        },
        onError: () => useNotification(undefined, true)
    })
}
