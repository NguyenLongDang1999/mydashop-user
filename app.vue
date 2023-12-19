<script setup lang="ts">

// ** Third Party Imports
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

// ** Meta SEO
useHead({
    htmlAttrs: {
        lang: 'vi',
        class: 'nuxt-ui-scrollbars'
    },
    bodyAttrs: {
        class: 'font-[\'Bai_Jamjuree\'] bg-white text-sm overflow-x-hidden font-medium'
    },
    title: 'Nuxivy',
    titleTemplate: titleChunk => {
        return titleChunk ? `${titleChunk} · Nuxivy` : 'Nuxivy'
    }
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
