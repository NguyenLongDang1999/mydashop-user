// ** Types Imports
import type { IProductDataList, IProductFlashSale } from '~/types/product.type'

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
