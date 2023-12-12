<script setup lang="ts">

// ** useHooks
const { dataList: categoryBrand } = await useBrandDataListAll()
const { isFetching, dataTable, dataAggregations, categoryList, search } = await useCategoryPagination()

provide('product', {
    dataTable,
    isFetching,
    dataAggregations
})

provide('search', search)
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Cửa hàng"
        />

        <UContainer>
            <section
                v-once
                class="mt-20"
            >
                <BaseCategoryTitle
                    icon="i-heroicons-building-storefront"
                    title="Cửa Hàng"
                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus nisi sed rerum pariatur quasi quisquam omnis unde nemo deleniti tenetur neque quod architecto amet sunt, modi a dolores voluptate repellat."
                />
            </section>

            <section class="mt-20">
                <div class="flex">
                    <CategoryPageFilter
                        :category-list="categoryList"
                        :category-brand="categoryBrand"
                    />

                    <CategoryPageProduct
                        :category-list="categoryList"
                        :category-brand="categoryBrand"
                    />
                </div>
            </section>
        </UContainer>
    </main>
</template>
