<script setup lang="ts">

// ** Types Imports
import type { LocationQueryValue } from 'vue-router'
import type { IBrand } from '~/types/brand.type'
import type { ICategory, ICategoryProductFilter } from '~/types/category.type'
import type { IProductPagination } from '~/types/product.type'

// ** useHooks
const route = useRoute()

// ** Data
const search = reactive<ICategoryProductFilter>({
    sort: Number(route.query.sort) || sortOption[0].id,
    pageSize: route.query.pageSize as string || paginationOption[0],
    page: Number(route.query.page) || PAGE.CURRENT,
    attribute: parseQueryArray(route.query.attribute),
    brand: parseQueryArray(route.query.brand)
})

// ** useHooks
const { path } = useCategory()
const { path: pathBrand } = useBrand()
const { path: pathProduct } = useProduct()
const { dataList: brandList } = await useCrudList<IBrand>(pathBrand.value, '/data-list-all', 'DataListAll')
const { dataList: categoryList } = await useCrudList<ICategory>(path.value, '/data-list-nested', 'DataListNested')
const { isFetching, dataTable, dataAggregations } = await useCrudPagination<IProductPagination, ICategoryProductFilter>(pathProduct.value, { params: search })

// ** Computed
const categoryBrand = computed(() => brandList.value.map(_v => ({ Brand: _v })))

provide('product', {
    dataTable,
    isFetching,
    dataAggregations
})

provide('search', search)

// ** Methods
function parseQueryArray(value: LocationQueryValue | LocationQueryValue[]) {
    if (Array.isArray(value)) {
        return value.map(_v => Number(_v))
    } else if (value) {
        return [Number(value)]
    } else {
        return []
    }
}
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
