<script setup lang="ts">

// ** Props & Emits
import type { ICategory } from '~/types/category.type'

// ** Props & Emits
interface Props {
    categories: ICategory
}

const props = defineProps<Props>()

// ** useHooks
const route = useRoute()
const { path } = useCategory()

// ** Computed
const categoryList: ICategory = JSON.parse(JSON.stringify(props.categories))

// ** Data
let items = categoryList.children.map(_categoryItem => ({
    ..._categoryItem,
    to: navigateCategory(_categoryItem.slug),
    defaultOpen: route.path === navigateCategory(_categoryItem.slug)
}))

// ** Methods
const updateDefaultOpen = (_categoryList: ICategory[]) => {
    for (const category of _categoryList) {
        if (route.path === navigateCategory(category.slug)) {
            category.defaultOpen = true

            return true
        }

        if (category.children && category.children.length > 0) {
            if (updateDefaultOpen(category.children)) {
                category.defaultOpen = true

                return true
            }
        } else {
            continue
        }
    }

    return false
}

updateDefaultOpen(items)
</script>

<template>
    <UAccordion
        :items="items"
        :ui="{
            item: { base: 'mb-0 pl-4 border-l border-gray-200 dark:border-gray-800 ml-2' }
        }"
        multiple
    >
        <template #default="{ item, open }">
            <UButton
                color="gray"
                variant="link"
                :padded="false"
                :ui="{
                    strategy: 'override',
                    base: 'flex items-center group w-full focus-visible:outline-primary border-l border-gray-200 dark:border-gray-800 ml-2 py-1',
                    font: 'font-semibold'
                }"
                :class="item.defaultOpen ? '!text-primary' : ''"
                class="hover:no-underline rounded-none"
            >
                <template #leading>
                    <NuxtImg
                        :src="getImageFile(path, item.image_uri)"
                        :alt="item.name"
                        class="rounded-full w-6 h-6 object-cover ml-4 "
                    />
                </template>

                <NuxtLink
                    :to="item.to"
                    class="truncate"
                >
                    <span class="text-sm/6 font-semibold capitalize">{{ item.name }}</span>
                </NuxtLink>

                <template #trailing>
                    <UIcon
                        v-if="item.children.length"
                        name="i-heroicons-chevron-right-20-solid"
                        class="w-5 h-5 ms-auto transform transition-transform duration-200 mr-2"
                        :class="[open && 'rotate-90']"
                    />
                </template>
            </UButton>
        </template>

        <template #item="{ item }">
            <CategoryPageFilterNested :categories="item" />
        </template>
    </UAccordion>
</template>
