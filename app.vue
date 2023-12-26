<script setup lang="ts">

// ** Third Party Imports
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

// ** useHooks
const config = useRuntimeConfig()
const { data } = await useWebsiteSetupSystem()

// ** Computed
const dataWebsiteName = computed(() => getValueBySlug('website_name', data.value))
const dataWebsiteMotto = computed(() => getValueBySlug('website_motto', data.value))
const dataWebsiteFavicon = computed(() => getValueBySlug('website_favicon', data.value))
const dataMetaTitle = computed(() => getValueBySlug('meta_title', data.value))
const dataMetaDescription = computed(() => getValueBySlug('meta_description', data.value))

// ** Meta SEO
useHead({
    htmlAttrs: {
        lang: 'vi',
        class: 'nuxt-ui-scrollbars'
    },
    bodyAttrs: {
        class: 'font-[\'Bai_Jamjuree\'] bg-white text-sm overflow-x-hidden font-medium'
    },
    link: [
        {
            rel: 'canonical',
            href: config.public.domainUrl
        },
        {
            rel: 'icon',
            href: getPathImageFile(dataWebsiteFavicon.value)
        }
    ],
    title: dataWebsiteName.value,
    titleTemplate: titleChunk => {
        return titleChunk ? `${titleChunk} · ${dataWebsiteMotto.value}` : dataWebsiteName.value
    }
})

useServerSeoMeta({
    title: dataWebsiteName.value,
    robots: {
        index: true,
        follow: true
    },
    description: dataMetaDescription.value,
    ogType: 'website',
    ogUrl: config.public.domainUrl,
    ogTitle: dataMetaTitle.value,
    ogDescription: dataMetaDescription.value,
    twitterTitle: dataMetaTitle.value,
    twitterDescription: dataMetaDescription.value
})
</script>

<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>

    <VueQueryDevtools />
    <UNotifications />
</template>

<style>
.page-leave-active,
.page-enter-active {
  transition: all 0.2s;
}

.page-enter-from {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(-30px);
}

.page-leave-to {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(30px);
}

.nuxt-ui-scrollbars ::-webkit-scrollbar {
    background-color: transparent;
    height: .6em;
    width: .7em;
}

.nuxt-ui-scrollbars ::-webkit-scrollbar-track {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-100)/1);
    background-color: rgb(var(--color-gray-100)/var(--tw-bg-opacity))
}

.nuxt-ui-scrollbars ::-webkit-scrollbar-thumb {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-300)/1);
    background-color: rgb(var(--color-gray-300)/var(--tw-bg-opacity));
    border-radius: .6em
}

.nuxt-ui-scrollbars ::-webkit-scrollbar-thumb:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-400)/1);
    background-color: rgb(var(--color-gray-400)/var(--tw-bg-opacity))
}
</style>
