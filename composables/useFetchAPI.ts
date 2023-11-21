import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

export default function <T>(url: string, options: UseFetchOptions<T> = {}) {
    const config = useRuntimeConfig()
    const headers = useRequestHeaders(['cookie'])

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.apiBase,
        credentials: 'include',
        key: url,
        retry: 1,
        keepalive: true,
        headers: {
            ...headers,
            Accept: 'application/json'
        }
    }

    const params = defu(options, defaults)

    return useFetch(url, params)
}
