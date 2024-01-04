<script setup lang="ts">

// ** useHooks
const appConfig = useAppConfig()
const { data } = await useWebsiteSetupSystem()

// ** Computed
const dataWebsiteColour = computed(() => getValueBySlug(WEBSITE_SETUP.WEBSITE_COLOUR, data.value))

appConfig.ui.primary = dataWebsiteColour.value
</script>

<template>
    <TheHeader />
    <slot />

    <UContainer>
        <TheService />
    </UContainer>

    <TheFooter />
</template>
