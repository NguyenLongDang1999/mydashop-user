<script setup lang="ts">

// ** Types Imports
import type { DropdownItem } from '@nuxt/ui/dist/runtime/types'

// ** useHooks
const { userData } = useAuth()
const { refetch } = useAuthLogout()

// ** Data
const authLogined: DropdownItem[][]  = [
    [{
        label: 'Account',
        slot: 'account',
        disabled: true
    }], [{
        label: 'Thông tin tài khoản',
        icon: 'i-heroicons-home',
        to: '/thong-tin-tai-khoan'
    }, {
        label: 'Đổi mật khẩu',
        icon: 'i-heroicons-lock-closed'
    }], [{
        label: 'Sản phẩm yêu thích',
        icon: 'i-heroicons-heart',
        to: '/thong-tin-tai-khoan/san-pham-yeu-thich'
    }, {
        label: 'Quản lý tài khoản',
        icon: 'i-heroicons-user',
        to: '/thong-tin-tai-khoan/quan-ly-tai-khoan'
    }], [{
        label: 'Đăng Xuất',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: async () => {
            await refetch()

            removeToken()
            removeUserData()
            userData.value = undefined

            nextTick(() => navigateTo('/dang-nhap'))
            useNotification('Đăng xuất thành công')
        }
    }]
]

const authNoLogin: DropdownItem[][] = [
    [{
        label: 'Đăng nhập',
        icon: 'i-heroicons-arrow-right-on-rectangle',
        to: '/dang-nhap'
    },
    {
        label: 'Đăng ký',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        to: '/dang-ky'
    }]
]
</script>

<template>
    <UDropdown
        v-if="useIsLoggedIn()"
        :items="authLogined"
        :ui="{ item: { disabled: 'cursor-text select-text', base: 'capitalize' } }"
        :popper="{ placement: 'bottom-start' }"
    >
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

        <template #account>
            <div class="text-left w-full">
                <p class="font-medium text-gray-900 dark:text-white">
                    {{ userData?.name }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
                :name="item.icon"
                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
        </template>
    </UDropdown>

    <UDropdown
        v-else
        :items="authNoLogin"
        :ui="{ item: { disabled: 'cursor-text select-text', base: 'capitalize' } }"
        :popper="{ placement: 'bottom-start' }"
    >
        <UTooltip text="Đăng Nhập">
            <UButton
                icon="i-heroicons-user"
                size="sm"
                square
                variant="link"
                color="gray"
            />
        </UTooltip>

        <template #account="{ item }">
            <div class="text-left w-full">
                <p class="font-medium text-gray-900 dark:text-white">
                    {{ item.label }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
                :name="item.icon"
                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
        </template>
    </UDropdown>
</template>
