<script setup lang="ts">

// ** Types Imports
import type { ICategory } from '~/types/category.type'

// ** useHooks
const { path } = useCategory()
const { dataList } = await useCrudList<ICategory>(path.value)

// ** Computed
const categoryList = computed(() =>
    dataList.value.map(category => ({
        id: category.id,
        name: category.name,
        link: navigateCategory(category.slug),
        imageSrc: getImageFile(path.value, category.image_uri),
        children: category.children.map(subCategory => ({
            id: subCategory.id,
            name: subCategory.name,
            link: navigateCategory(subCategory.slug)
        }))
    }))
)
</script>

<template>
    <section
        v-if="categoryList.length"
        v-once
        class="grid grid-cols-12 mt-10"
    >
        <div class="col-span-12">
            <div class="flex items-center justify-between">
                <h2 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                    Danh mục hàng đầu
                </h2>

                <UButton
                    label="Button"
                    color="gray"
                    trailing-icon="i-heroicons-arrow-right-20-solid"
                    to="/tat-ca-danh-muc"
                >
                    Xem Tất Cả
                </UButton>
            </div>

            <div class="grid grid-cols-12 gap-4 mt-5">
                <UCard
                    v-for="category in categoryList"
                    :key="category.id"
                    class="lg:col-span-4 sm:col-span-6 col-span-12 relative"
                >
                    <div class="flex gap-4">
                        <NuxtLink :to="category.link">
                            <NuxtImg
                                :src="category.imageSrc"
                                :alt="category.name"
                                :title="category.name"
                                width="100"
                                height="100"
                                class="min-w-[100px] h-[100px] rounded-md object-cover"
                            />
                        </NuxtLink>

                        <div class="flex flex-col gap-4">
                            <NuxtLink
                                :to="category.link"
                                :title="category.name"
                                class="transition-colors hover:text-primary line-clamp-1"
                            >
                                <h6 class="capitalize font-medium">
                                    {{ category.name }}
                                </h6>
                            </NuxtLink>

                            <ul class="flex flex-col gap-2 mb-4">
                                <li
                                    v-for="subCategory in category.children"
                                    :key="subCategory.id"
                                >
                                    <NuxtLink
                                        :to="subCategory.link"
                                        class="transition-transform line-clamp-1 capitalize hover:translate-x-2 hover:text-primary"
                                        :title="subCategory.name"
                                    >
                                        <UIcon name="i-heroicons-chevron-right" />
                                        {{ subCategory.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <NuxtLink
                        :to="category.link"
                        class="absolute bg-primary text-white px-2 py-1 text-xs rounded-tl-md right-0 bottom-0"
                    >
                        Xem Tất Cả
                    </NuxtLink>
                </UCard>
            </div>
        </div>
    </section>
</template>
