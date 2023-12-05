// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export const useCrudList = async <T>(path: string, subPath = '/data-list', subKey = 'DataList') => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data, suspense } = useQuery<T[]>({
        queryKey: [path + subKey],
        queryFn: () => _fetcher(path + subPath)
    })

    // ** Computed
    const dataList = computed(() => data.value || [])

    await suspense()

    return { dataList }
}

export const useCrudFormInput = <T>(path: string, description?: string, show_description = true) => {
    // ** Hooks
    const _fetcher = useFetchData()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: dataFormInput } = useMutation(
        async (body: Partial<T> & { id?: number }) => {
            return body.id ?
                _fetcher(`${path}/${body.id}`, { method: 'PATCH', body }) :
                _fetcher(`${path}`, { method: 'POST', body })
        },
        {
            onSuccess: () => {
                queryClient.refetchQueries({ queryKey: [`${path}DataList`] })

                if (show_description) {
                    useNotification(description)
                }
            },
            onError: () => useNotification(description, true)
        })

    return {
        isLoading: isLoading.value,
        dataFormInput
    }
}

export const useCrudDelete = (path: string, description?: string) => {
    // ** Hooks
    const _fetcher = useFetchData()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: dataFormInput } = useMutation(
        async (id: number) => _fetcher(`${path}/${id}`, { method: 'DELETE' }),
        {
            onSuccess: () => {
                queryClient.refetchQueries({ queryKey: [`${path}DataList`] })

                useNotification(description)
            },
            onError: () => useNotification(description, true)
        })

    return {
        isLoading: isLoading.value,
        dataFormInput
    }
}

export const useCrudDetail = async <T>(path: string, slug: string | number) => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data: row, isLoading, suspense } = useQuery<T>({
        queryKey: [`${path}Detail`, slug],
        queryFn: () => _fetcher(`${path}/${slug}`)
    })

    // ** Computed
    const data = computed(() => row.value as T)

    await suspense()

    return {
        data,
        isLoading: isLoading.value
    }
}

export const useCrudPagination = async <T, U>(path: string, params: { params?: Partial<U> }, subPath = '/data-list-shop', subKey = 'DataListShop') => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data, isLoading, isFetching, suspense } = useQuery<T>({
        queryKey: [`${path}${subKey}`, params.params],
        queryFn: () => _fetcher(`${path}${subPath}`, { params: params.params }),
        keepPreviousData: true
    })

    // ** Computed
    const dataTable = computed(() => data.value?.data || [])
    const dataAggregations = computed(() => data.value?.aggregations || 0)

    await suspense()

    return {
        isLoading,
        isFetching,
        dataTable,
        dataAggregations
    }
}
