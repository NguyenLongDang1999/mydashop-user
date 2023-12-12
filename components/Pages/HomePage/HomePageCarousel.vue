<script setup lang="ts">

// ** useHooks
const { path, dataList } = await useSliderDataList()

// ** Data
const creativeEffect = {
    prev: {
        shadow: false,
        translate: ['-20%', 0, -1]
    },
    next: {
        translate: ['100%', 0, 0]
    }
}
</script>

<template>
    <section
        v-if="dataList.length"
        v-once
    >
        <Swiper
            :modules="[SwiperAutoplay, SwiperEffectCreative]"
            :slides-per-view="1"
            :autoplay="{
                delay: 8000,
                disableOnInteraction: true,
            }"
            :creative-effect="creativeEffect"
            loop
            effect="creative"
        >
            <SwiperSlide
                v-for="slider in dataList"
                :key="slider.id"
            >
                <NuxtImg
                    :src="getImageFile(path, slider.image_uri)"
                    :alt="slider.name"
                    :title="slider.name"
                    width="1900"
                    height="500"
                    class="w-full object-cover h-[500px]"
                />
            </SwiperSlide>
        </Swiper>
    </section>
</template>
