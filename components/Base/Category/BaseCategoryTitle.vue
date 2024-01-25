<script setup lang="ts">

// ** Props & Emits
interface Props {
    icon?: string
    image?: string
    title: string
    description?: string
}

defineProps<Props>()
</script>

<template>
    <div class="flex flex-col items-center gap-4">
        <UIcon
            v-if="icon && !image"
            :name="icon"
            class="w-10 h-10"
        />

        <NuxtImg
            v-else
            :src="image"
            :alt="title"
            :title="title"
            width="100"
            height="100"
            class="rounded-full"
            loading="lazy"
        />

        <h1 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl">
            {{ title }}
        </h1>

        <p
            v-if="description"
            class="md:w-3/4 text-center"
        >
            {{ description }}
        </p>
    </div>
</template>
