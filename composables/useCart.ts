// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { ICart, ICartFormInput } from '~/types/cart.type'

// ** State
const path = ref<string>(ROUTE.CART)

export default function () {
    return {
        path
    }
}

export const useCartList = async () => {
    const _fetcher = useFetchData()

    const { data, suspense } = useQuery<ICart>({
        queryKey: [path.value + 'DataList'],
        queryFn: () => _fetcher(path.value)
    })

    // ** Computed
    const dataList = computed(() => data.value as ICart)

    await suspense()

    return { dataList }
}

export const useCartAdd = () => {
    return useQueryMutation<ICartFormInput>(path.value)
}
