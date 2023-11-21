<script setup lang="ts">

// ** Props & Emits
interface Props {
    to?: string
    title: string
    separatorIcon?: boolean
}

withDefaults(defineProps<Props>(), {
    to: undefined,
    separatorIcon: true
})
</script>

<template>
    <li class="flex gap-2 capitalize items-center">
        <UIcon
            v-if="separatorIcon"
            name="i-heroicons-chevron-double-right"
        />

        <NuxtLink
            v-if="to"
            :to="to"
            class="flex gap-1 items-center transition-colors hover:text-primary"
        >
            <UIcon
                v-if="to === '/'"
                name="i-heroicons-home"
            />

            {{ title }}
        </NuxtLink>

        <template v-else>
            <span class="font-semibold">{{ title }}</span>
        </template>
    </li>
</template>
