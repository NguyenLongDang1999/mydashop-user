<script setup lang="ts">

// ** Types Imports
import type { IAttributeValues, IProductAttribute } from '~/types/attribute.type'
import type { IProduct, IProductVariant } from '~/types/product.type'

// ** Props & Emits
interface Props {
    product: IProduct
}

const props = defineProps<Props>()
const emits = defineEmits(['result'])

// ** useHooks
const { isPending, mutateAsync } = useCartAdd()

// ** Data
const quantity = ref<number>(1)
const result = ref<IProductVariant>()

const attributeValues = reactive<IAttributeValues[]>(props.product.product_attributes.map((item: IProductAttribute) => ({
    attribute_id: item.attribute.id,
    attribute_value_id: item.product_attribute_values[0].attribute_value_id,
    attribute_name: item.attribute.name,
    attribute_value: item.product_attribute_values[0].attribute_values.value
})))

// ** Methods
const handleAttributeValues = (attribute: IProductAttribute, attribute_value: { id: number, value: string }) => {
    const existingItem = attributeValues.find(item => item.attribute_id === attribute.attribute.id)

    if (existingItem) {
        existingItem.attribute_value_id = attribute_value.id
        existingItem.attribute_value = attribute_value.value
    } else {
        attributeValues.push({
            attribute_id: attribute.attribute.id,
            attribute_value_id: attribute_value.id,
            attribute_name: attribute.attribute.name,
            attribute_value: attribute_value.value
        })
    }
}

const findAttributeValues = (productVariant: IProductVariant[], valuesData: IAttributeValues[]) => {
    for (const variant of productVariant) {
        const labelParts = variant.label.split('-').map(item => item.trim()).sort()
        const valueFind = valuesData.map(item2 => item2.attribute_value).sort()

        if (arraysAreEqual(labelParts, valueFind)) {
            result.value = variant
            emits('result', variant)
        }
    }

    return null
}

const arraysAreEqual = (productVariant: string[], valuesData: string[]) => {
    if (productVariant.length !== valuesData.length) {
        return false
    }

    return productVariant.every((value, index) => value === valuesData[index])
}

// ** Watch
watch(attributeValues, () => findAttributeValues(props.product.productVariant, attributeValues), { immediate: true })
</script>

<template>
    <div class="my-1">
        <div
            v-if="product.product_attributes.length"
            class="flex flex-col gap-3 mb-3"
        >
            <div
                v-for="(attribute, index) in product.product_attributes"
                :key="attribute.attribute.id"
            >
                <UFormGroup
                    :label="attribute.attribute.name"
                    :name="`attribute_value_id-${product.id}-${attribute.attribute.id}`"
                    :ui="{
                        label: { base: 'font-semibold' }
                    }"
                >
                    <div class="flex flex-wrap gap-2">
                        <UButtonGroup
                            v-for="value in attribute.product_attribute_values"
                            :key="value.attribute_values.id"
                            size="sm"
                            orientation="horizontal"
                        >
                            <UButton
                                :label="value.attribute_values.value"
                                variant="solid"
                                :color="attributeValues[index].attribute_value_id === value.attribute_value_id ? 'blue' : 'white'"
                                @click="handleAttributeValues(attribute, value.attribute_values)"
                            />
                        </UButtonGroup>
                    </div>
                </UFormGroup>
            </div>
        </div>

        <BaseProductPrice
            :price="Number(result?.price || product.price)"
            :selling-price="formatSellingPrice(result || product)"
        />
    </div>

    <div class="grid grid-cols-12 gap-2 mt-4">
        <div class="md:col-span-3 col-span-6">
            <BaseProductQuantity v-model="quantity" />
        </div>

        <div class="md:col-span-4 col-span-6">
            <UButton
                color="red"
                block
                truncate
                size="lg"
                icon="i-heroicons-heart"
                label="Thêm Yêu Thích"
            />
        </div>

        <ClientOnly>
            <div class="md:col-span-7 col-span-12">
                <UButton
                    size="lg"
                    block
                    icon="i-heroicons-shopping-bag"
                    :loading="isPending"
                    :disabled="(result?.in_stock || product.in_stock) !== INVENTORY_STATUS.IN_STOCK"
                    label="Thêm Giỏ Hàng"
                    @click="mutateAsync({
                        product_id: product.id,
                        quantity,
                        attributes: product.product_attributes.length ? JSON.stringify(attributeValues) : undefined
                    })"
                />
            </div>
        </ClientOnly>
    </div>
</template>
