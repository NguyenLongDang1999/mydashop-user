<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '@nuxt/ui/dist/runtime/types'
import type { IProductDetail } from '~/types/product.type'

// ** useHooks
const route = useRoute()
const config = useRuntimeConfig()
const { path } = useProduct()
const { data } = await useCrudDetail<IProductDetail>(path.value, route.params.slug as string)

// ** Computed
const technical_specifications = computed(() => JSON.parse(data.value.technical_specifications) || [])

// ** Data
const productDescription: TabItem[] = [{
    slot: 'product-description',
    label: 'Chi Tiết Sản Phẩm'
}, {
    slot: 'product-comment',
    label: 'Đánh Giá'
}]

if (technical_specifications.value.length) {
    const index = productDescription.findIndex(item => item.slot === 'product-description')
    const productSpecification: TabItem = { slot: 'product-specification', label: 'Thông Số Kỹ Thuật' }

    if (index !== -1) {
        productDescription.splice(index + 1, 0, productSpecification)
    }
}

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
</script>

<template>
    <main>
        <BaseBreadcrumbsCategoryNested
            :title="data.name"
            :category-id="data.category.id"
        />

        <UContainer>
            <section class="mt-10">
                <div class="grid gap-4 grid-cols-12">
                    <div class="lg:col-span-5 sm:col-span-8 col-span-12">
                        <BaseProductGallery :product="data" />
                    </div>

                    <div class="lg:col-span-7 col-span-12 ">
                        <h1 class="capitalize font-semibold text-xl">
                            {{ data.name }}
                        </h1>

                        <StarRatings
                            class="mt-2"
                            :model-value="Number(data.total_rating)"
                            disable-click
                            :star-size="14"
                        />

                        <BaseProductInformation
                            :product="data"
                            class="mt-3"
                        />

                        <p
                            v-if="data.short_description"
                            class="tracking-wide my-2"
                        >
                            {{ data.short_description }}
                        </p>

                        <ProductPageAddToCart :product="data" />
                    </div>

                    <div class="col-span-12">
                        <UTabs
                            :items="productDescription"
                            class="mt-10"
                        >
                            <template #product-description>
                                <div
                                    class="font-['Bai_Jamjuree'] text-left"
                                    v-html="data.description"
                                />
                            </template>

                            <template #product-specification>
                                <ul class="border-gray-200 dark:border-gray-700 border rounded-md">
                                    <li
                                        v-for="specification in technical_specifications"
                                        :key="specification.title"
                                        class="flex border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                                    >
                                        <span class="flex-1 capitalize font-semibold border-r border-gray-200 dark:border-gray-700 px-3 py-2">{{ specification.title }}</span>
                                        <span class="flex-1 px-3 py-2">{{ specification.content }}</span>
                                    </li>
                                </ul>
                            </template>

                            <template #product-comment>
                                <ProductPageComment
                                    :product-id="data.id"
                                    :total-rating="data.total_rating"
                                />
                            </template>
                        </UTabs>
                    </div>

                    <div class="col-span-12">
                        <!-- <LazyBaseProductRelated /> -->
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
