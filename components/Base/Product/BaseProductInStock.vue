<script setup lang="ts">

// ** Props & Emits
interface Props {
    instock: number
}

defineProps<Props>()
</script>

<template>
    <span
        v-if="instock === INVENTORY_STATUS.IN_STOCK"
        class="capitalize text-primary flex gap-1 items-center"
    >
        <UIcon name="i-heroicons-check-circle" />
        Còn hàng
    </span>

    <span
        v-else
        class="capitalize text-red-500 flex gap-1 items-center"
    >
        <UIcon name="i-heroicons-no-symbol" />
        Hết hàng
    </span>
</template>
