<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '@nuxt/ui/dist/runtime/types'
import type { IProductDetail, IProductVariant } from '~/types/product.type'

// ** useHooks
const route = useRoute()
const config = useRuntimeConfig()
const { path } = useProduct()
const { data } = await useCrudDetail<IProductDetail>(path.value, route.params.slug as string)

// ** Computed
const technical_specifications = computed(() => JSON.parse(data.value.technical_specifications) || [])

// ** Data
const result = ref<IProductVariant>()

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

                    <div class="lg:col-span-7 col-span-12">
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
                            :result="result"
                            class="mt-3"
                        />

                        <p
                            v-if="data.short_description"
                            class="tracking-wide my-2"
                        >
                            {{ data.short_description }}
                        </p>

                        <ProductPageAddToCart
                            :product="data"
                            @result="val => result = val"
                        />

                        <div class="mt-2 flex items-center gap-2">
                            <span class="capitalize font-semibold">Chia sẻ:</span>

                            <div class="flex flex-row gap-2">
                                <SocialShare
                                    v-for="network in ['facebook', 'twitter', 'telegram']"
                                    :key="network"
                                    :network="network"
                                    :label="false"
                                    styled
                                    class="p-1 rounded-full text-white text-xs"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12">
                        <div
                            v-if="data.crossSellProducts.length"
                            class="col-span-12"
                        >
                            <section class="grid grid-cols-12 mt-10">
                                <div class="col-span-12">
                                    <div class="flex items-center justify-between">
                                        <h2 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                                            Sản phẩm thường mua cùng
                                        </h2>
                                    </div>

                                    <div class="mt-5">
                                        <Swiper
                                            :space-between="10"
                                            :slides-per-view="2"
                                            :breakpoints="{
                                                1200: {
                                                    slidesPerView: 5,
                                                },
                                                1024: {
                                                    slidesPerView: 4,
                                                },
                                                768: {
                                                    slidesPerView: 3,
                                                },
                                                475: {
                                                    slidesPerView: 2,
                                                },
                                                360: {
                                                    slidesPerView: 1,
                                                },
                                            }"
                                        >
                                            <SwiperSlide
                                                v-for="product in data.crossSellProducts"
                                                :key="product.id"
                                            >
                                                <BaseProductCard :product="product" />
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </section>
                        </div>
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

                    <div
                        v-if="data.relatedProducts.length"
                        class="col-span-12"
                    >
                        <section class="grid grid-cols-12 mt-10">
                            <div class="col-span-12">
                                <div class="flex items-center justify-between">
                                    <h2 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                                        Sản phẩm có liên quan
                                    </h2>
                                </div>

                                <div class="mt-5">
                                    <Swiper
                                        :space-between="10"
                                        :slides-per-view="2"
                                        :breakpoints="{
                                            1200: {
                                                slidesPerView: 5,
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                            },
                                            768: {
                                                slidesPerView: 3,
                                            },
                                            475: {
                                                slidesPerView: 2,
                                            },
                                            360: {
                                                slidesPerView: 1,
                                            },
                                        }"
                                    >
                                        <SwiperSlide
                                            v-for="product in data.relatedProducts"
                                            :key="product.id"
                                        >
                                            <BaseProductCard :product="product" />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
