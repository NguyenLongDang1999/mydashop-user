<script setup lang="ts">

// ** Props & Emits
interface Props {
    price: number
    sellingPrice: number
}

defineProps<Props>()
</script>

<template>
    <span class="font-semibold text-lg text-primary">{{ formatCurrency(sellingPrice) }}</span>
    <span
        v-if="price !== sellingPrice"
        class="font-normal text-base text-gray-300 line-through pl-3"
    >{{ formatCurrency(price) }}</span>
</template>
