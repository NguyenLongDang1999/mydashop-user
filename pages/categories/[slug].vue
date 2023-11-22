<script setup lang="ts">

// ** Types Imports
import type { LocationQueryValue } from 'vue-router'
import type { ICategory, ICategoryProductFilter } from '~/types/category.type'

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
const { data, isFetching, productList, productAggregations } = await useCategoryDetail(route.params.slug as string, search)
const { dataList: categoryList } = await useCrudList<ICategory>(path.value, '/data-list-nested', 'DataListNested')
const config = useRuntimeConfig()

// ** Meta SEO
useHead({
    title: data.value.name,
    link: [
        {
            rel: 'canonical',
            href: config.public.domainUrl + route.path
        }
    ]
})

useServerSeoMeta({
    title: data.value.name,
    robots: {
        index: true,
        follow: true
    },
    description: data.value.meta_description,
    ogType: 'website',
    ogUrl: config.public.domainUrl + route.path,
    ogTitle: data.value.meta_title,
    ogDescription: data.value.meta_description,
    ogImage: getImageFile(path.value, data.value.image_uri),
    ogImageAlt: data.value.name,
    twitterTitle: data.value.meta_title,
    twitterDescription: data.value.meta_description,
    twitterImage: getImageFile(path.value, data.value.image_uri),
    twitterImageAlt: data.value.name
})

provide('product', {
    isFetching,
    dataTable: productList,
    dataAggregations: productAggregations
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
        <BaseBreadcrumbsCategoryNested
            :title="data.name"
            :category-id="data.id"
            page-category
        />

        <UContainer>
            <section
                v-once
                class="mt-20"
            >
                <BaseCategoryTitle
                    :image="getImageFile(path, data.image_uri)"
                    :title="data.name"
                    :description="data.description"
                />
            </section>

            <section class="mt-20">
                <div class="flex">
                    <CategoryPageFilter
                        :category-id="data.id"
                        :category-list="categoryList"
                        :category-brand="data.brands"
                        :category-attribute="data.attributes"
                    />

                    <CategoryPageProduct
                        :category-list="categoryList"
                        :category-brand="data.brands"
                        :category-attribute="data.attributes"
                    />
                </div>
            </section>
        </UContainer>
    </main>
</template>
