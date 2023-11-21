<script setup lang="ts">

// ** Types Imports
import type { ICategoryProductFilter } from '~/types/category.type'
import type { ICrudTableOptions } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

// ** Data
const { isFetching, dataTable, dataAggregations } = inject('product') as ICrudTableOptions<IProduct>
const search = inject('search') as ICategoryProductFilter
</script>

<template>
    <div class="grid gap-4 grid-cols-12">
        <template v-if="!isFetching">
            <BaseProductCard
                v-for="product in dataTable"
                :key="product.id"
                :product="product"
                class="xl:col-span-3 lg:col-span-4 md:col-span-4 col-span-6"
            />

            <div class="mt-10 flex justify-center col-span-12">
                <CategoryPagePagination :product-aggregations="dataAggregations" />
            </div>
        </template>

        <template v-else>
            <div
                v-for="product in Number(search.pageSize)"
                :key="product"
                class="xl:col-span-3 lg:col-span-4 md:col-span-4 col-span-6"
            >
                <USkeleton class="h-48 w-full" />

                <div class="space-y-2 mt-2">
                    <USkeleton
                        v-for="item in 4"
                        :key="item"
                        class="h-3 w-full min-w-60"
                    />
                </div>
            </div>
        </template>
    </div>
</template>
