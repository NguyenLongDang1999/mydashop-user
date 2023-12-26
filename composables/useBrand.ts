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
    const { data, suspense } = useQueryFetch<IBrand[]>(path.value, '/data-list-all', 'DataListAll')

    await suspense()

    // ** Computed
    return {
        path,
        dataList: computed(() => data.value || [])
    }
}
