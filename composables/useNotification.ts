export default function (description = 'Thao tác không thành công!', isFailed = false) {
    const toast = useToast()

    toast.add({
        title: isFailed ? 'Thất Bại!' : 'Thành Công!',
        description,
        color: isFailed ? 'red' : 'primary',
        icon: isFailed ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle'
    })
}
