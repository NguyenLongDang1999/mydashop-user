// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

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
    const { data, suspense } = useQuery<IProductFlashSale>({
        queryKey: [path.value + 'DataListFlashSale'],
        queryFn: () => useFetcher(path.value + '/data-list-flash-sale')
    })

    await suspense()

    // ** Computed
    return computed(() => data.value as IProductFlashSale)
}

export const useProductDataList = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<IProductDataList[]>({
        queryKey: [path.value + 'DataList'],
        queryFn: () => useFetcher(path.value + '/data-list')
    })

    await suspense()

    // ** Computed
    return computed(() => data.value || [])
}

export const useProductDataListPopular = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<IProductDataList[]>({
        queryKey: [path.value + 'DataListPopular'],
        queryFn: () => useFetcher(path.value + '/data-list-popular')
    })

    await suspense()

    // ** Computed
    return computed(() => data.value || [])
}

export const useProductDetail = async () => {
    // ** useHooks
    const route = useRoute()

    const { data, suspense } = useQuery<IProductDetail>({
        queryKey: [path.value + 'Detail', route.params.slug],
        queryFn: () => useFetcher(path.value + `/${route.params.slug}`)
    })

    await suspense()

    return {
        path,
        route,
        data: computed(() => data.value as IProductDetail)
    }
}
