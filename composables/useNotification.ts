export default function (description = 'Thao tác thành công!') {
    // ** Hooks
    const toast = useToast()

    toast.add({
        title: 'Thành Công',
        description,
        icon: 'i-heroicons-check-circle'
    })
}

export const useNotificationError = (description = 'Thao tác không thành công!') => {
    // ** Hooks
    const toast = useToast()

    toast.add({
        title: 'Thất Bại',
        description: description,
        icon: 'i-heroicons-x-circle',
        color: 'red'
    })
}
