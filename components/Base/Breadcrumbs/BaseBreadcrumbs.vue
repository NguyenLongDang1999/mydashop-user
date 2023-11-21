<script setup lang="ts">

// ** Props & Emits
interface Props {
    title: string
}

defineProps<Props>()
</script>


<template>
    <section
        v-once
        class="bg-gray-100 py-3"
    >
        <UContainer>
            <ul class="flex gap-2 flex-wrap items-center">
                <BaseBreadcrumbsItem
                    to="/"
                    title="Trang chủ"
                    :separator-icon="false"
                />

                <slot />

                <BaseBreadcrumbsItem :title="title" />
            </ul>
        </UContainer>
    </section>
</template>
