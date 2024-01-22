<script setup lang="ts">

// ** useHooks
const { data } = await useWebsiteSetupSystem()

// ** Computed
const dataWebsiteColour = computed(() => getValueBySlug(WEBSITE_SETUP.WEBSITE_COLOUR, data.value))

updateAppConfig({
    ui: { primary: dataWebsiteColour.value }
})
</script>

<template>
    <TheHeader />
    <slot />

    <UContainer>
        <TheService />
    </UContainer>

    <TheFooter />
</template>
