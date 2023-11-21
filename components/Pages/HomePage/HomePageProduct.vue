<script setup lang="ts">

// ** Types Imports
import type { IProductDataList } from '~/types/product.type'

// ** useHooks
const { path } = useProduct()
const { dataList } = await useCrudList<IProductDataList>(path.value)
</script>

<template>
    <template
        v-for="category in dataList"
        :key="category.id"
    >
        <section
            v-if="category.Product.length"
            class="grid grid-cols-12 mt-10"
        >
            <div class="col-span-12">
                <div class="flex items-center justify-between">
                    <h2 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                        {{ category.name }}
                    </h2>

                    <UButton
                        label="Button"
                        color="gray"
                        trailing-icon="i-heroicons-arrow-right-20-solid"
                        :to="navigateCategory(category.slug)"
                    >
                        Xem Tất Cả
                    </UButton>
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
                            576: {
                                slidesPerView: 2,
                            },
                            360: {
                                slidesPerView: 1,
                            },
                        }"
                    >
                        <SwiperSlide
                            v-for="product in category.Product"
                            :key="product.id"
                        >
                            <BaseProductCard :product="product" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    </template>
</template>
