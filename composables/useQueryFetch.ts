// ** Third Party Imports
import type { UseFetchOptions } from 'nuxt/dist/app/composables'
import type { FetchContext, FetchResponse } from 'ofetch'
import type { IAuthProfile } from '~/types/auth.type'

export const useFetcher = async <T>(
    path: string,
    opts?: UseFetchOptions<unknown>
): Promise<T> => {
    const config = useRuntimeConfig()

    try {
        const { data, error } = await useFetch(path, {
            baseURL: config.public.apiBase,
            credentials: 'include',
            headers: useRequestHeaders(),
            keepalive: true,
            ...opts
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

export const useAuthFetcher = async <T>(
    path: string,
    opts?: UseFetchOptions<unknown>
): Promise<T> => {
    const config = useRuntimeConfig()

    try {
        const { data, error } = await useFetch(path, {
            baseURL: config.public.apiBase,
            credentials: 'include',
            headers: useRequestHeaders(),
            keepalive: true,
            onRequest,
            onResponseError,
            ...opts
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

const onRequest = ({ options, request }: FetchContext) => {
    if (request !== 'auth/sign-in') {
        const access_token = JSON.parse(getToken() || 'null')

        if (access_token) {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${access_token}`
            }
        }
    }
}

const onResponseError = async ({ response }: FetchContext & { response: FetchResponse<ResponseType> }) => {
    if (response.status === 401) {
        try {
            const data = await useFetcher<IAuthProfile>('/auth/refresh')

            setToken(data.accessToken)
        } catch {
            const { userData } = useAuth()

            removeToken()
            removeUserData()
            userData.value = undefined

            nextTick(() => navigateTo('/dang-nhap'))
        }
    }
}
