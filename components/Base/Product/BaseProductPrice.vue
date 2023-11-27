<script setup lang="ts">

// ** Props & Emits
interface Props {
    price: number
    sellingPrice: number
}

defineProps<Props>()
</script>

<template>
    <span class="font-semibold sm:text-lg text-sm text-primary">{{ formatCurrency(sellingPrice) }}</span>
    <span
        v-if="price !== sellingPrice"
        class="font-normal sm:text-base text-xs text-gray-300 line-through pl-3"
    >{{ formatCurrency(price) }}</span>
</template>
