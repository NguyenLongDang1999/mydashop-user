<script setup lang="ts">

// ** Types Imports
import type { ICategoryAttribute } from '~/types/attribute.type';
import type { IBrand } from '~/types/brand.type';
import type { ICategory } from '~/types/category.type';

// ** Props & Emits
interface Props {
    categoryList?: ICategory[]
    categoryBrand?: IBrand[]
    categoryAttribute?: ICategoryAttribute[]
}

const props = defineProps<Props>()

// ** useHooks
const route = useRoute()

// ** Data
const categoryList: ICategory[] = props.categoryList ? JSON.parse(JSON.stringify(props.categoryList)) : []

let items = categoryList.map(_categoryItem => ({
    ..._categoryItem,
    to: navigateCategory(_categoryItem.slug),
    defaultOpen: route.path === navigateCategory(_categoryItem.slug)
})) || []

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
    <section class="w-64 mr-7 lg:flex gap-4 flex-col hidden">
        <div class="overflow-y-auto lg:max-h-[calc(100vh-64px)] lg:sticky lg:top-16 lg:px-4 lg:-mx-4">
            <div class="flex flex-col">
                <h3 class="my-1.5 font-semibold text-lg capitalize flex items-center gap-2">
                    <UIcon
                        name="i-heroicons-squares-2x2"
                        class="w-5 h-5"
                    />
                    Tất cả danh mục
                </h3>

                <nav class="space-y-3">
                    <UAccordion
                        :items="items"
                        :ui="{
                            item: { base: 'mb-3' }
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
                                    base: 'flex items-center gap-1.5 group mb-2 w-full focus-visible:outline-primary border-transparent',
                                }"
                                :class="item.defaultOpen ? '!text-primary' : ''"
                                class="hover:no-underline"
                            >
                                <template #leading>
                                    <NuxtImg
                                        :src="getPathImageFile(item.image_uri)"
                                        :alt="item.name"
                                        class="rounded-full w-6 h-6 object-cover"
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
                                        name="i-heroicons-chevron-right-20-solid"
                                        class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                        :class="[open && 'rotate-90']"
                                    />
                                </template>
                            </UButton>
                        </template>

                        <template #item="{ item }">
                            <CategoryPageFilterNested :categories="item" />
                        </template>
                    </UAccordion>
                </nav>
            </div>

            <div class="flex items-center align-center text-center w-full flex-row my-4">
                <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-dashed" />
            </div>

            <CategoryPageFilterBrand
                :category-brand="categoryBrand"
                :category-attribute="categoryAttribute"
            />
        </div>
    </section>
</template>
