<script setup lang="ts">

// ** Types Imports
import type { AccordionItem } from '@nuxt/ui/dist/runtime/types'

// ** Data
const items: AccordionItem[] = [{
    label: 'Tổng Quan',
    icon: 'i-heroicons-information-circle',
    defaultOpen: true,
    slot: 'information'
}]

const information = [
    {
        label: 'Thông tin chung',
        icon: 'i-heroicons-home'
    }, {
        label: 'Sản Phẩm Yêu Thích',
        icon: 'i-heroicons-heart'
    }, {
        label: 'Lịch Sử Đơn Hàng',
        icon: 'i-heroicons-bookmark-square'
    }, {
        label: 'Quản Lý Tài Khoản',
        icon: 'i-heroicons-user'
    }
]
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
                        <section class="w-56 mr-7 lg:flex gap-4 flex-col hidden">
                            <div class="overflow-y-auto lg:max-h-[calc(100vh-64px)] lg:sticky lg:top-16 lg:px-4 lg:-mx-4">
                                <nav class="space-y-3">
                                    <UAccordion
                                        :items="items"
                                        :ui="{
                                            item: { base: 'mb-3' }
                                        }"
                                    >
                                        <template #default="{ item, open }">
                                            <UButton
                                                color="gray"
                                                variant="link"
                                                :padded="false"
                                                :ui="{
                                                    strategy: 'override',
                                                    base: 'flex items-center gap-1.5 group mb-2 w-full focus-visible:outline-primary border-transparent',
                                                }"
                                                :class="item.defaultOpen ? '!text-primary' : ''"
                                                class="hover:no-underline"
                                            >
                                                <div class="flex items-center gap-1.5">
                                                    <UIcon
                                                        :name="item.icon"
                                                        class="w-5 h-5 flex-shrink-0"
                                                    />

                                                    <span class="text-sm/6 font-semibold capitalize">{{ item.label }}</span>
                                                </div>

                                                <template #trailing>
                                                    <UIcon
                                                        name="i-heroicons-chevron-right-20-solid"
                                                        class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                                        :class="[open && 'rotate-90']"
                                                    />
                                                </template>
                                            </UButton>
                                        </template>

                                        <template #information>
                                            <UButton
                                                v-for="inf in information"
                                                :key="inf.label"
                                                color="gray"
                                                variant="link"
                                                :padded="false"
                                                :ui="{
                                                    strategy: 'override',
                                                    base: 'flex items-center group w-full focus-visible:outline-primary border-l border-gray-200 dark:border-gray-800 ml-2 py-1',
                                                    font: 'font-semibold'
                                                }"
                                                class="hover:no-underline rounded-none"
                                            >
                                                <NuxtLink class="flex items-center gap-1.5 ml-4">
                                                    <UIcon
                                                        :name="inf.icon"
                                                        class="w-4 h-4 flex-shrink-0"
                                                    />
                                                    <span class="text-sm/6 font-semibold capitalize">{{ inf.label }}</span>
                                                </NuxtLink>
                                            </UButton>
                                        </template>
                                    </UAccordion>
                                </nav>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
