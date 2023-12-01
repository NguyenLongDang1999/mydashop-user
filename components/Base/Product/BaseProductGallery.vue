<script setup lang="ts">

// ** Types Imports
import type { IProduct } from '~/types/product.type'

// ** Props & Emits
interface Props {
    product: IProduct
}

defineProps<Props>()

// ** useHooks
const { path } = useProduct()

// ** Data
const thumbsSwiper = ref()
</script>

<template>
    <Swiper
        :space-between="10"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="[SwiperFreeMode, SwiperThumbs]"
    >
        <SwiperSlide>
            <NuxtImg
                :alt="product.name"
                :src="getImageFile(path, product.image_uri)"
                class="rounded-md w-full"
            />
        </SwiperSlide>

        <SwiperSlide
            v-for="data in product.productImage"
            :key="data.image_uri"
        >
            <NuxtImg
                :alt="product.name"
                :src="getImageFile(path, data.image_uri)"
                class="rounded-md w-full"
            />
        </SwiperSlide>
    </Swiper>

    <Swiper
        :space-between="10"
        :slides-per-view="4"
        :modules="[SwiperFreeMode, SwiperThumbs]"
        free-mode
        watch-slides-progress
        class="mt-3"
        @swiper="swiper => thumbsSwiper = swiper"
    >
        <SwiperSlide>
            <NuxtImg
                :alt="product.name"
                :src="getImageFile(path, product.image_uri)"
                class="rounded-md w-full"
            />
        </SwiperSlide>

        <SwiperSlide
            v-for="data in product.productImage"
            :key="data.image_uri"
        >
            <NuxtImg
                :alt="product.name"
                :src="getImageFile(path, data.image_uri)"
                class="rounded-md w-full"
            />
        </SwiperSlide>
    </Swiper>
</template>
