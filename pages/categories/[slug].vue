<script setup lang="ts">

// ** useHooks
const route = useRoute()
const { dataList: categoryList } = await useCategoryDataListNested()
const { data, isFetching, dataTable, dataAggregations, search } = await useCategoryDetail(route.params.slug as string)
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
    ogImage: getPathImageFile(data.value.image_uri),
    ogImageAlt: data.value.name,
    twitterTitle: data.value.meta_title,
    twitterDescription: data.value.meta_description,
    twitterImage: getPathImageFile(data.value.image_uri),
    twitterImageAlt: data.value.name
})

provide('product', {
    isFetching,
    dataTable,
    dataAggregations
})

provide('search', search)
</script>

<template>
    <main>
        <BaseBreadcrumbsCategoryNested
            v-once
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
                    :image="getPathImageFile(data.image_uri)"
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
