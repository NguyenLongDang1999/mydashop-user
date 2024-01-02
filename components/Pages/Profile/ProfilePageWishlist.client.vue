<script setup lang="ts">

// ** useHooks
const { isPending, mutateAsync } = useWishlistDelete()
const { isFetching, dataTable, dataAggregations, search } = useWishlistPagination()
</script>

<template>
    <div class="grid gap-4 grid-cols-12">
        <template v-if="!isFetching">
            <BaseProductCard
                v-for="product in dataTable"
                :key="product.id"
                :product="product.product"
                class="xl:col-span-3 lg:col-span-4 md:col-span-4 col-span-6"
            >
                <template #header-action>
                    <div class="absolute top-3 left-3">
                        <UButton
                            icon="i-heroicons-trash"
                            size="sm"
                            color="red"
                            variant="solid"
                            :loading="isPending"
                            @click="mutateAsync(product.id)"
                        />
                    </div>
                </template>
            </BaseProductCard>

            <div class="col-span-12 flex flex-wrap justify-center items-center mt-10">
                <UPagination
                    v-model="search.page"
                    :page-count="search.pageSize"
                    :total="dataAggregations"
                    :ui="{
                        wrapper: 'flex items-center gap-1',
                        rounded:
                            '!rounded-full min-w-[32px] justify-center',
                        default: {
                            activeButton: {
                                variant: 'outline',
                            },
                        },
                    }"
                />
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
