<script setup lang="ts">

// ** Props & Emits
interface Props {
    label?: string
    name?: string
    options: {
        id: number
        value: string
    }[]
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
        <URadioGroup
            v-model="value"
            :options="options"
            option-attribute="value"
            value-attribute="id"
            v-bind="$attrs"
        />
    </UFormGroup>
</template>
