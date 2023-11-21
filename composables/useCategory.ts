// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { ICategoryDetail, ICategoryProductFilter } from '~/types/category.type'

// ** State
const path = ref<string>(ROUTE.CATEGORY)

export default function () {
    return {
        path
    }
}

export const useCategoryDetail = async (slug: string, search: ICategoryProductFilter) => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data: row, isFetching, suspense } = useQuery<ICategoryDetail>({
        queryKey: [`${path.value}Detail`, slug, search],
        queryFn: () => _fetcher(`${path.value}/${slug}`, { params: search }),
        keepPreviousData: true
    })

    // ** Computed
    const data = computed(() => row.value as ICategoryDetail)
    const productList = computed(() => row.value?.Product || [])
    const productAggregations = computed(() => row.value?.aggregations || 0)

    await suspense()

    return {
        data,
        productList,
        productAggregations,
        isFetching
    }
}
