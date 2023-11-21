<script setup lang="ts">

// ** Props & Emits
import type { ICategory } from '~/types/category.type'

// ** Props & Emits
interface Props {
    categories: ICategory[]
}

defineProps<Props>()
</script>

<template>
    <ul
        v-if="categories.length"
        class="mt-4 flex flex-col gap-4"
    >
        <li
            v-for="category in categories"
            :key="category.id"
        >
            <NuxtLink
                :to="navigateCategory(category.slug)"
                class="flex gap-1 items-center text-base line-clamp-1 text-gray-500 font-medium capitalize hover:text-primary"
            >
                <UIcon name="i-heroicons-arrow-small-right" />
                <span class="flex-1">{{ category.name }}</span>
            </NuxtLink>

            <LazyCategoryPageNested
                v-if="category.children.length"
                :categories="category.children"
            />
        </li>
    </ul>
</template>
