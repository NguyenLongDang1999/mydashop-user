<script setup lang="ts">

// ** useHooks
const { data } = await useProductFlashSale()
</script>

<template>
    <section
        v-once
        class="mt-20 relative"
    >
        <div class="flex items-center justify-between">
            <div class="flex gap-3 items-center">
                <UIcon
                    name="i-heroicons-bolt"
                    class="md:text-3xl sm:text-2xl text-xl text-red-500"
                />

                <h2 class="md:text-3xl sm:text-2xl text-xl font-bold uppercase">
                    {{ data.campaign_name }}
                </h2>

                <UIcon
                    name="i-heroicons-bolt"
                    class="md:text-3xl sm:text-2xl text-xl text-red-500"
                />
            </div>

            <div class="absolute top-1 right-0 flex gap-1">
                <UButton
                    icon="i-heroicons-arrow-left"
                    size="sm"
                    square
                    variant="solid"
                    class="swiper-btn-prev [&.swiper-button-disabled]:op-30"
                />

                <UButton
                    icon="i-heroicons-arrow-right"
                    size="sm"
                    square
                    variant="solid"
                    class="swiper-btn-next [&.swiper-button-disabled]:op-30"
                />
            </div>
        </div>

        <div class="mt-5">
            <Swiper
                observer
                observe-parents
                :modules="[SwiperNavigation]"
                :space-between="10"
                :navigation="{
                    nextEl: '.swiper-btn-next',
                    prevEl: '.swiper-btn-prev',
                }"
                :allow-touch-move="false"
                :slides-per-view="1.2"
            >
                <SwiperSlide
                    v-for="product in data.FlashSaleProduct"
                    :key="product.id"
                >
                    <UCard
                        :ui="{
                            strategy: 'override',
                            shadow: '',
                            base: 'overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary'
                        }"
                    >
                        <div class="grid grid-cols-12 gap-4">
                            <div class="lg:col-span-6 col-span-12">
                                <BaseProductGallery :product="product" />
                            </div>

                            <div class="lg:col-span-6 col-span-12 text-left">
                                <NuxtLink
                                    :to="navigateProduct(product.slug)"
                                    class="line-clamp-2"
                                >
                                    <h3 class="capitalize font-semibold text-lg transition-colors hover:text-primary">
                                        {{ product.name }}
                                    </h3>
                                </NuxtLink>

                                <StarRatings
                                    class="mt-1 mb-2"
                                    :model-value="Number(product.total_rating)"
                                    disable-click
                                    :star-size="14"
                                />

                                <BaseProductInformation :product="product" />

                                <p
                                    v-if="product.short_description"
                                    class="tracking-wide my-2"
                                >
                                    {{ product.short_description }}
                                </p>

                                <ProductPageAddToCart :product="product" />
                            </div>
                        </div>
                    </UCard>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>
