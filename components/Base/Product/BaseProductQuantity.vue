<script setup lang="ts">

// ** Props & Emits
interface Props {
    modelValue: number
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

// ** Data
const quantity = ref<number>(props.modelValue)

watch(quantity, () => emits('update:modelValue', quantity.value))
</script>

<template>
    <div class="relative">
        <UButton
            variant="ghost"
            icon="i-heroicons-minus"
            size="lg"
            square
            class="absolute top-0 left-0 z-10"
            :disabled="quantity <= 1"
            @click="quantity > 1 ? quantity-- : undefined"
        />
        <UInput
            v-model="quantity"
            size="lg"
            :ui="{ base: 'text-center' }"
            disabled
            v-bind="$attrs"
        />
        <UButton
            variant="ghost"
            icon="i-heroicons-plus"
            size="lg"
            square
            class="absolute top-0 right-0 z-10"
            @click="quantity++"
        />
    </div>
</template>
