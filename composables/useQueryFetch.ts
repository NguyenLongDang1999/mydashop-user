// ** Third Party Imports
import { useMutation, useQuery, type MutationObserverOptions } from '@tanstack/vue-query'
import type { MaybeRefDeep } from '@tanstack/vue-query/build/legacy/types'
import type { UseFetchOptions } from 'nuxt/dist/app/composables'
import type { KeysOf } from 'nuxt/dist/app/composables/asyncData'

export default function <T>(
    path: string,
    endpoint = '/data-list',
    queryKey = 'DataList',
    params = {},
    options = {}
) {
    return useQuery<T>({
        queryKey: [path + queryKey, params],
        queryFn: () => useFetcher(path + endpoint, { params }),
        ...options
    })
};

export const useQueryMutation = <T>(
    path: string,
    options?: MaybeRefDeep<MutationObserverOptions<unknown, Error, void, unknown>>,
    method = 'POST'
) => {
    return useMutation({
        mutationFn: body => useFetcher<T>(path, { method, body }),
        ...options
    })
}

export const useFetcher = async <T>(
    path: string,
    options?: UseFetchOptions<unknown, unknown, KeysOf<unknown>, null, string, 'get'> | undefined
): Promise<T> => {
    const config = useRuntimeConfig()

    try {
        const { data, error } = await useFetch(path, {
            baseURL: config.public.apiBase,
            credentials: 'include',
            headers: useRequestHeaders(),
            retry: 1,
            keepalive: true,
            ...options
        })

        if (error.value) {
            throw new Error(error.value?.data?.error || 'An unknown error occurred during data fetching.')
        }

        if (!data.value) {
            throw new Error('No data returned from the fetch operation.')
        }

        return data.value as T
    } catch (err: unknown) {
        throw new Error(err instanceof Error ? err.message : 'An error occurred during data fetching.')
    }
}
