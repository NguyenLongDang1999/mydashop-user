<script setup lang="ts">

// ** useHooks
const { data } = await useWebsiteSetupSystem()

// ** Computed
const dataHomeBanner = computed(() => getValueBySlug(WEBSITE_SETUP.HOME_BANNER3, data.value))
const dataList = computed(() => typeof dataHomeBanner.value === 'string' ? JSON.parse(dataHomeBanner.value) : [])
</script>

<template>
    <section
        v-if="dataList.length"
        v-once
        class="mt-10"
    >
        <Swiper
            :modules="[SwiperAutoplay, SwiperEffectCreative]"
            :slides-per-view="dataList.length"
            :space-between="20"
            :breakpoints="{
                1200: {
                    slidesPerView: dataList.length,
                },
                1024: {
                    slidesPerView: dataList.length,
                },
                768: {
                    slidesPerView: dataList.length,
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
                v-for="(item, index) in dataList"
                :key="index"
            >
                <ULink
                    :to="item.image_link"
                    target="_blank"
                >
                    <NuxtImg
                        :src="getPathImageFile(item.image_uri)"
                        :alt="item.image_link"
                        :title="item.image_link"
                        class="w-full rounded-md"
                    />
                </ULink>
            </SwiperSlide>
        </Swiper>
    </section>
</template>
