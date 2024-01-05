<script setup lang="ts">

// ** useHooks
const { data } = await useWebsiteSetupSystem()

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

// ** Computed
const dataHomeSlider = computed(() => getValueBySlug(WEBSITE_SETUP.HOME_SLIDER, data.value))
const dataList = computed(() => typeof dataHomeSlider.value === 'string' ? JSON.parse(dataHomeSlider.value) : [])
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
                v-for="(item, index) in dataList"
                :key="index"
            >
                <NuxtLink :to="item.image_link">
                    <NuxtImg
                        :src="getPathImageFile(item.image_uri)"
                        :alt="item.image_link"
                        :title="item.image_link"
                        width="1900"
                        height="500"
                        class="w-full object-cover h-[500px]"
                    />
                </NuxtLink>
            </SwiperSlide>
        </Swiper>
    </section>
</template>
