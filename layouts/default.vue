<script setup lang="ts">

// ** useHooks
const { data } = await useWebsiteSetupSystem()

const { scrollToTop } = useAnchorScroll({
    toTop: {
        scrollOptions: {
            behavior: 'smooth',
            offsetTop: 0
        }
    }
})

// ** Data
const showButton = ref<boolean>(false)

// ** Computed
const dataWebsiteColour = computed(() => getValueBySlug(WEBSITE_SETUP.WEBSITE_COLOUR, data.value))

updateAppConfig({
    ui: { primary: dataWebsiteColour.value }
})

// ** Methods
const handleScroll = () => showButton.value = window.scrollY > 500

onBeforeMount(() => window.addEventListener('scroll', handleScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
    <TheHeader />
    <slot />

    <UContainer>
        <TheService />
    </UContainer>

    <UButton
        v-if="showButton"
        size="xl"
        icon="i-heroicons-arrow-up"
        class="rounded-full fixed bottom-2 right-2 z-10"
        @click="scrollToTop"
    />

    <TheFooter />
</template>
