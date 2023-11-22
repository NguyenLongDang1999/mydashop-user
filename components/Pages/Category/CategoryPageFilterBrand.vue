<script setup lang="ts">

// ** Types Imports
import type { ICategoryAttribute } from '~/types/attribute.type'
import type { IBrand } from '~/types/brand.type'
import type { ICategoryProductFilter } from '~/types/category.type'

// ** Props & Emits
interface Props {
    categoryBrand?: IBrand[]
    categoryAttribute?: ICategoryAttribute[]
}

const props = defineProps<Props>()

// ** Data
const showAll = ref<boolean>(false)
const search = inject('search') as ICategoryProductFilter

const items = [{
    label: 'Thương hiệu',
    children: Object.values({ ...props.categoryBrand })
}]

// ** useHooks
const route = useRoute()
</script>

<template>
    <div class="flex flex-col">
        <h3 class="mb-1.5 font-semibold text-lg capitalize flex items-center gap-2">
            <UIcon
                name="i-heroicons-arrow-right-circle"
                class="w-5 h-5"
            />
            Bộ lọc tìm kiếm
        </h3>

        <nav
            v-if="categoryBrand?.length"
            class="space-y-3"
        >
            <UAccordion
                :items="items"
                :ui="{
                    item: { base: 'mb-0 pl-4 border-l border-gray-200 dark:border-gray-800 ml-2' }
                }"
                multiple
                default-open
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
                        <NuxtLink :to="item.to">
                            <span class="text-sm/6 font-semibold truncate capitalize">{{ item.label }}</span>
                        </NuxtLink>

                        <template #trailing>
                            <UIcon
                                name="i-heroicons-chevron-right-20-solid"
                                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                :class="[open && 'rotate-90']"
                            />
                        </template>
                    </UButton>
                </template>

                <template #item="{ item }">
                    <ul class="flex flex-col gap-2 mb-4">
                        <li
                            v-for="attribute in item.children.slice(0, showAll ? undefined : 5)"
                            :key="attribute.id"
                            class="capitalize"
                        >
                            <UCheckbox
                                :name="attribute.name"
                                :value="attribute.id"
                                :label="attribute.name"
                                :model-value="search.brand"
                                @update:model-value="(val) => {
                                    search.brand = val

                                    navigateTo({
                                        path: route.path,
                                        query: {
                                            ...search,
                                            brand: search.brand
                                        }
                                    })
                                }"
                            />
                        </li>

                        <li
                            v-if="item.children.length > 5"
                            class="flex gap-3 items-center justify-center cursor-pointer hover:text-primary"
                            @click="showAll = !showAll"
                        >
                            {{ showAll ? 'Rút Gọn' : 'Xem Tất Cả' }}
                            <UIcon :name="showAll ? 'i-heroicons-chevron-double-up' : 'i-heroicons-chevron-double-down'" />
                        </li>
                    </ul>
                </template>
            </UAccordion>
        </nav>

        <CategoryPageFilterAttribute :category-attribute="categoryAttribute" />
    </div>
</template>
