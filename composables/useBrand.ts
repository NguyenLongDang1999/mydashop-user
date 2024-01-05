// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { IBrand } from '~/types/brand.type'

// ** State
const path = ref<string>(ROUTE.BRAND)

export default function () {
    return {
        path
    }
}

export const useBrandDataListAll = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<IBrand[]>({
        queryKey: [path.value + 'DataListAll'],
        queryFn: () => useFetcher(path.value + '/data-list-all')
    })

    await suspense()

    // ** Computed
    return {
        path,
        dataList: computed(() => data.value || [])
    }
}
