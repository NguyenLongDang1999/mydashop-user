<script setup lang="ts">

// ** Interface
interface Columns {
    [key: string]: unknown;
    key: string;
    sortable?: boolean | undefined;
    direction?: 'desc' | 'asc' | undefined;
    class?: string | undefined;
}

const orderColumns: Columns[] = [
    {
        key: 'name',
        label: 'Thông tin thương hiệu',
        class: 'min-w-[180px]'
    },
    {
        key: 'category_id',
        label: 'Danh mục',
        class: 'min-w-[250px]'
    }
]

// ** useHooks
const { isPending, mutateAsync } = useWishlistDelete()
const { isFetching, dataTable, dataAggregations, search } = useWishlistPagination()
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách danh mục
                </h2>
            </div>
        </template>

        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
            <UTable
                :rows="dataTable"
                :columns="orderColumns"
                :loading="Boolean(isFetching) || Boolean(isPending)"
                class="w-full"
                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
            >
                <template #name-data="{ row }">
                    <ULink>
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="getPathImageFile(row.image_uri)"
                                :alt="row.name"
                            />
                        </div>
                    </ULink>
                </template>
            </UTable>
        </div>

        <!-- <template #footer>
            <Pagination :data-aggregations="dataAggregations" />
        </template> -->
    </UCard>
</template>
