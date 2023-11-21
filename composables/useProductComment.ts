// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { IProductCommentPagination } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT_COMMENT)

export default function () {
    return {
        path
    }
}

export const useProductCommentList = async (id: number, params: { page: number, pageSize: number }) => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data, isLoading, isFetching, suspense } = useQuery<IProductCommentPagination>({
        queryKey: [`${path.value}DataList`, id, params],
        queryFn: () => _fetcher(`${path.value}/${id}`, { params }),
        keepPreviousData: true
    })

    // ** Computed
    const dataTable = computed(() => data.value?.data || [])
    const dataAggregations = computed(() => data.value?.aggregations || 0)
    const dataComments = computed(() => data.value)

    await suspense()

    return {
        isLoading,
        isFetching,
        dataTable,
        dataAggregations,
        dataComments
    }
}
