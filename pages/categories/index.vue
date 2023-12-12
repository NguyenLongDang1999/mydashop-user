<script setup lang="ts">

// ** useHooks
const { path, dataList } = await useCategoryDataListNested()
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Danh mục"
        />

        <UContainer>
            <section
                v-once
                class="mt-10"
            >
                <div
                    v-for="category in dataList"
                    :key="category.id"
                    class="mb-7"
                >
                    <NuxtLink
                        :to="navigateCategory(category.slug)"
                        class="hover:text-primary mb-6 pb-3 flex gap-2 items-center border-b-2 border-gray-200 relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-20 after:border-b-2 after:border-primary"
                    >
                        <NuxtImg
                            :src="getImageFile(path, category.image_uri)"
                            :alt="category.name"
                            :title="category.name"
                            width="50"
                            height="50"
                            class="min-w-12 h-12 rounded-full object-cover"
                        />

                        <h3 class="text-lg font-semibold capitalize">
                            {{ category.name }}
                        </h3>
                    </NuxtLink>

                    <ul class="grid gap-8 grid-cols-12">
                        <li
                            v-for="subCategory in category.children"
                            :key="subCategory.id"
                            class="col-span-6 md:col-span-4"
                        >
                            <NuxtLink
                                :to="navigateCategory(subCategory.slug)"
                                class="text-base line-clamp-1 text-gray-500 font-medium capitalize hover:text-primary"
                            >
                                {{ subCategory.name }}
                            </NuxtLink>

                            <CategoryPageNested
                                :categories="subCategory.children"
                                class="ml-3"
                            />
                        </li>
                    </ul>
                </div>
            </section>
        </UContainer>
    </main>
</template>
