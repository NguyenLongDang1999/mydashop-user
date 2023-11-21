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
        onResponseError: async ({ response }) => {
            if (!response.ok && response.status === 401) {
                navigateTo('/dang-nhap')
            }
        }
    })
}
