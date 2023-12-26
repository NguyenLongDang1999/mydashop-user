<script setup lang="ts">

// ** useHooks
const dataList = await useProductDataListPopular()
</script>

<template>
    <section
        v-if="dataList.length"
        class="grid grid-cols-12 mt-10"
    >
        <div class="col-span-12">
            <div class="flex items-center justify-between">
                <h2 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                    Sản phẩm phổ biến
                </h2>

                <UButton
                    label="Button"
                    color="gray"
                    trailing-icon="i-heroicons-arrow-right-20-solid"
                    to="/"
                >
                    Xem Tất Cả
                </UButton>
            </div>

            <div class="mt-5">
                <Swiper
                    :space-between="10"
                    :slides-per-view="1"
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
                        460: {
                            slidesPerView: 2,
                        },
                        360: {
                            slidesPerView: 1,
                        },
                    }"
                >
                    <SwiperSlide
                        v-for="product in dataList"
                        :key="product.id"
                    >
                        <BaseProductCard :product="product" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </section>
</template>
