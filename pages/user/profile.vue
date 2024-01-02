<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '@nuxt/ui/dist/runtime/types'

// ** Data
const items: TabItem[] = [{
    label: 'Tổng Quan',
    icon: 'i-heroicons-home',
    slot: 'dashboard'
}, {
    label: 'Sản Phẩm Yêu Thích',
    icon: 'i-heroicons-heart',
    slot: 'wishlist'
}, {
    label: 'Lịch Sử Đơn Hàng',
    icon: 'i-heroicons-bookmark-square',
    slot: 'purchase_history'
}, {
    label: 'Quản Lý Tài Khoản',
    icon: 'i-heroicons-user',
    slot: 'manage_profile'
}]

// ** useHooks
const route = useRoute()

// ** Computed
const defaultIndex = computed(() => items.findIndex(item => item.slot === route.query.tab))

// ** Methods
const onChange = (index: number) => {
    const item = items[index]

    return navigateTo({
        path: route.path,
        query: {
            tab: item.slot
        }
    })
}
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Thông tin tài khoản"
        />

        <UContainer>
            <section class="mt-10">
                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <ProfilePageHeader />
                    </div>

                    <div class="col-span-12">
                        <UTabs
                            :items="items"
                            :default-index="defaultIndex === -1 ? 0 : defaultIndex"
                            @change="onChange"
                        >
                            <template #default="{ item, selected }">
                                <div class="flex items-center gap-2 relative truncate">
                                    <UIcon
                                        :name="item.icon"
                                        class="w-4 h-4 flex-shrink-0"
                                    />

                                    <span class="truncate">{{ item.label }}</span>

                                    <span
                                        v-if="selected"
                                        class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400"
                                    />
                                </div>
                            </template>

                            <template #dashboard>
                                <ProfilePageDashboard />
                            </template>

                            <template #wishlist>
                                <ProfilePageWishlist />
                            </template>

                            <template #manage_profile>
                                <ProfilePageManageProfile />
                            </template>
                        </UTabs>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
