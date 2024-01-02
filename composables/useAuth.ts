// ** Types Imports
import type { IAuthLogin, IAuthProfile, IAuthRegister, IAuthUpdateProfileFormInput } from '~/types/auth.type'

// ** State
const path = ref<string>(ROUTE.AUTH)
const userData = ref<IAuthProfile>()

export default function () {
    userData.value = useCookie<IAuthProfile>('userData').value

    return {
        path,
        userData
    }
}

export const useAuthLogin = () => useQueryMutation<IAuthProfile, IAuthLogin>(`${path.value}/sign-in`, {
    onSuccess: () => {
        userData.value = useCookie<IAuthProfile>('userData').value

        nextTick(() => navigateTo('/'))
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotification(undefined, true)
})

export const useAuthRegister = () => useQueryMutation<IAuthProfile, IAuthRegister>(`${path.value}/sign-up`, {
    onSuccess: () => {
        nextTick(() => navigateTo('/'))
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotification(undefined, true)
})

export const useAuthLogout = () => useQueryFetch(path.value, '/sign-out', 'Logout', {}, {
    enabled: false
})

export const useIsLoggedIn = () => !!(userData.value)

export const useAuthUpdateProfile = () => useQueryMutation<IAuthProfile, IAuthUpdateProfileFormInput>(`${path.value}/update/profile`, {
    onSuccess: () => useNotification('Cập nhật thành công!'),
    onError: () => useNotification(undefined, true)
})
