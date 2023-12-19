// ** Types Imports
import type { IAuthLogin, IAuthProfile, IAuthRegister } from '~/types/auth.type'

// ** State
const path = ref<string>(ROUTE.AUTH)

export default function () {
    return {
        path
    }
}

export const useAuthLogin = () => useQueryMutation<IAuthProfile, IAuthLogin>(`${path.value}/sign-in`, {
    onSuccess: data => {
        useCookie<IAuthProfile>('userData').value = data

        nextTick(() => navigateTo('/'))
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotification(undefined, true)
})

export const useAuthRegister = () => useQueryMutation<IAuthProfile, IAuthRegister>(`${path.value}/sign-up`, {
    onSuccess: data => {
        useCookie<IAuthProfile>('userData').value = data

        nextTick(() => navigateTo('/'))
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotification(undefined, true)
})

export const useAuthLogout = () => useQueryFetch(path.value, '/sign-out', 'Logout', {}, {
    enabled: false
})

export const useIsLoggedIn = () => !!(useCookie('userData').value)
