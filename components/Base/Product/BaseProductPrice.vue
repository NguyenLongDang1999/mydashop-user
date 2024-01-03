<script setup lang="ts">

// ** Props & Emits
interface Props {
    price: number
    sellingPrice: string
}

defineProps<Props>()
</script>

<template>
    <span
        class="font-semibold text-lg text-primary"
        :class="sellingPrice !== formatCurrency(price) ? 'pr-3' : ''"
    >{{ sellingPrice }}</span>
    <span
        v-if="sellingPrice !== formatCurrency(price)"
        class="font-normal text-base text-gray-300 line-through"
    >{{ formatCurrency(price) }}</span>
</template>
