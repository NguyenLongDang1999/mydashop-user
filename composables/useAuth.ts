// ** Third Party Imports
import { useMutation, useQuery } from '@tanstack/vue-query'

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

export const useAuthLogin = () => useMutation({
    mutationFn: (body: IAuthLogin) => useFetcher(`${path.value}/sign-in`, { method: 'POST', body }),
    onSuccess: () => {
        userData.value = useCookie<IAuthProfile>('userData').value

        nextTick(() => navigateTo('/'))
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotificationError()
})

export const useAuthRegister = () => useMutation({
    mutationFn: (body: IAuthRegister) => useFetcher(`${path.value}/sign-up`, { method: 'POST', body }),
    onSuccess: () => {
        userData.value = useCookie<IAuthProfile>('userData').value

        nextTick(() => navigateTo('/'))
        useNotification('Đăng nhập thành công!')
    },
    onError: () => useNotificationError()
})

export const useAuthLogout = () => useQuery({
    queryKey: [path.value + 'Logout'],
    queryFn: () => useAuthFetcher(path.value + '/sign-out'),
    enabled: false
})

export const useIsLoggedIn = () => !!(userData.value)

export const useAuthUpdateProfile = () => useMutation<IAuthProfile>({
    mutationFn: (body: IAuthUpdateProfileFormInput) => useAuthFetcher(`${path.value}/update/profile`, { method: 'POST', body }),
    onSuccess: data => {
        useNotification('Cập nhật thành công!')
        userData.value = data
    },
    onError: () => useNotificationError()
})
