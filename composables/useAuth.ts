// ** Third Party Imports
import { useMutation, useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { IAuthLogin, IAuthRegister } from '~/types/auth.type'

// ** State
const path = ref<string>(ROUTE.AUTH)

export default function () {
    return {
        path
    }
}

export const useAuthLogin = () => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { isLoading, mutateAsync: authLogin } = useMutation(
        (body: IAuthLogin) => _fetcher(`${path.value}/sign-in`, { method: 'POST', body }),
        {
            onSuccess: data => {
                useCookie('userData').value = data

                nextTick(() => navigateTo('/'))
                useNotification('Đăng nhập thành công')
            },
            onError: () => useNotification('Đăng nhập thất bại', true)
        })

    return {
        isLoading,
        authLogin
    }
}

export const useAuthRegister = () => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { isLoading, mutateAsync: authRegister } = useMutation(
        (body: IAuthRegister) => _fetcher(`${path.value}/sign-up`, { method: 'POST', body }),
        {
            onSuccess: data => {
                useCookie('userData').value = data

                nextTick(() => navigateTo('/'))
                useNotification('Đăng nhập thành công')
            },
            onError: () => useNotification('Đăng nhập thất bại', true)
        })

    return {
        isLoading,
        authRegister
    }
}


export const useAuthLogout = () => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { refetch } = useQuery({
        queryKey: ['authLogout'],
        queryFn: () => _fetcher(`${path.value}/sign-out`),
        enabled: false,
        onSuccess: () => {
            useCookie('userData').value = null

            nextTick(() => navigateTo('/dang-nhap'))
            useNotification('Đăng xuất thành công')
        }
    })

    return { refetch }
}

export const useIsLoggedIn = () => !!(useCookie('userData').value)
