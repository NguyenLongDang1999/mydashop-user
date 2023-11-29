// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { IProductFlashSale } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT)

export default function () {
    return {
        path
    }
}

export const useProductFlashSale = async () => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data: row, suspense } = useQuery<IProductFlashSale>({
        queryKey: [`${path.value}DataListFlashSale`],
        queryFn: () => _fetcher(`${path.value}/data-list-flash-sale`)
    })

    // ** Computed
    const data = computed(() => row.value as IProductFlashSale)

    await suspense()

    return { data }
}
