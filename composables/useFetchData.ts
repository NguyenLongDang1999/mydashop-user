// ** Third Party Imports
import { ofetch } from 'ofetch'

export default function () {
    const config = useRuntimeConfig()
    const headers = useRequestHeaders(['cookie'])

    return ofetch.create({
        baseURL: config.public.apiBase,
        credentials: 'include',
        headers: {
            ...headers,
            Accept: 'application/json'
        },
        retry: 1,
        keepalive: true,
        onRequest: ({ options }) => {
            const accessToken = useCookie('accessToken').value

            if (accessToken) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken}`
                }
            }
        },
        onResponseError: async ({ response }) => {
            if (!response.ok && response.status === 401) {
                navigateTo('/dang-nhap')
            }
        }
    })
}
