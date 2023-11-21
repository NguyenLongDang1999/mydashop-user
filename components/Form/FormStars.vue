<script setup lang="ts">

// ** Props & Emits
interface Props {
    label?: string
    name?: string
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name as string, undefined, {
    syncVModel: true
})
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="errorMessage"
    >
        <StarRatings
            v-model="value"
            v-bind="$attrs"
        />
    </UFormGroup>
</template>
