<script setup lang="ts">

// ** Props & Emits
interface Props {
    label?: string
    name?: string
    modelValue?: string
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name as string, undefined, {
    syncVModel: true,
    initialValue: props.modelValue
})
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="errorMessage"
    >
        <UInput
            v-model="value"
            v-bind="$attrs"
            size="md"
        />
    </UFormGroup>
</template>
