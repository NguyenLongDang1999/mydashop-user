<script setup lang="ts">

// ** Types Imports
import type { ICategoryProductFilter } from '~/types/category.type'

// ** Props & Emits
interface Props {
    productAggregations: number
}

defineProps<Props>()

// ** Data
const search = inject('search') as ICategoryProductFilter

// ** useHooks
const route = useRoute()

// ** Lifecycle
search.page = Number(route.query.page) || PAGE.CURRENT
</script>

<template>
    <UPagination
        v-if="productAggregations > Number(search.pageSize)"
        v-model="search.page"
        :page-count="Number(search.pageSize) || PAGE.SIZE"
        :total="productAggregations"
        :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center'
        }"
        :prev-button="{
            icon: 'i-heroicons-arrow-small-left-20-solid',
            color: 'primary',
            variant: 'outline'
        }"
        :next-button="{
            icon: 'i-heroicons-arrow-small-right-20-solid',
            color: 'primary',
            variant: 'outline'
        }"
        @update:model-value="navigateTo({
            path: route.path,
            query: {
                ...search,
                page: search.page
            }
        })"
    />
</template>
