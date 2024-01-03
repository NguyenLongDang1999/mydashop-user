// ** Types Imports
import type { IProductDataList, IProductDetail, IProductFlashSale } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT)

export default function () {
    return {
        path
    }
}

export const useProductFlashSale = async () => {
    // ** useHooks
    const { data, suspense } = useQueryFetch<IProductFlashSale>(path.value, '/data-list-flash-sale', 'DataListFlashSale')

    await suspense()

    // ** Computed
    return computed(() => data.value as IProductFlashSale)
}

export const useProductDataList = async () => {
    // ** useHooks
    const { data, suspense } = useQueryFetch<IProductDataList[]>(path.value)

    await suspense()

    // ** Computed
    return computed(() => data.value || [])
}

export const useProductDataListPopular = async () => {
    // ** useHooks
    const { data, suspense } = useQueryFetch<IProductDataList[]>(path.value, '/data-list-popular', 'DataListPopular')

    await suspense()

    // ** Computed
    return computed(() => data.value || [])
}

export const useProductDetail = async () => {
    // ** useHooks
    const route = useRoute()

    const { data: row, suspense } = useQueryFetch<IProductDetail>(path.value, `/${route.params.slug}`, 'Detail', {}, {
        queryKey: [path.value + 'Detail', route.params.slug]
    })

    await suspense()

    return {
        path,
        route,
        data: computed(() => row.value as IProductDetail)
    }
}
