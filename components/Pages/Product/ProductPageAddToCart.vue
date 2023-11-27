<script setup lang="ts">

// ** Types Imports
import type { IAttributeValues, IProductAttribute } from '~/types/attribute.type'
import type { ICartFormInput } from '~/types/cart.type'
import type { IProduct } from '~/types/product.type'

// ** Props & Emits
interface Props {
    product: IProduct
}

const props = defineProps<Props>()

// ** useHooks
const { path } = useCart()
const { isLoading, dataFormInput } = useCrudFormInput<ICartFormInput>(path.value, MESSAGE_SUCCESS.CART)

// ** Data
const quantity = ref<number>(1)

const attributeValues: IAttributeValues[] = props.product.product_attributes.map((item: IProductAttribute) => ({
    attribute_id: item.id,
    attribute_value_id: item.product_attribute_values[0].attribute_value_id
}))

// ** Methods
const handleAttributeValues = (attribute: IProductAttribute, values: number) => {
    const existingItem = attributeValues.find(item => item.attribute_id === attribute.id)

    if (existingItem) {
        existingItem.attribute_value_id = values
    } else {
        attributeValues.push({ attribute_id: attribute.id, attribute_value_id: values })
    }
}

const handleAddToCart = () => {
    if (useIsLoggedIn()) {
        const formInput: ICartFormInput = {
            product_id: props.product.id,
            quantity: quantity.value
        }

        if (props.product.product_attributes.length) {
            formInput.attribute_id = JSON.stringify(attributeValues)
        }

        dataFormInput(formInput)
    }

    return navigateTo('/dang-nhap')
}
</script>

<template>
    <div class="my-1">
        <div
            v-if="product.product_attributes.length"
            class="flex flex-col gap-3 mb-3"
        >
            <div
                v-for="attribute in product.product_attributes"
                :key="attribute.attribute.id"
            >
                <UFormGroup
                    :label="attribute.attribute.name"
                    :name="`attribute_value_id-${product.id}-${attribute.attribute.id}`"
                    :ui="{
                        label: { base: 'font-semibold' }
                    }"
                >
                    <URadioGroup
                        :model-value="attribute.product_attribute_values[0].attribute_value_id"
                        :options="attribute.product_attribute_values"
                        option-attribute="attribute_values.value"
                        value-attribute="attribute_values.id"
                        @update:model-value="val => handleAttributeValues(attribute, val)"
                    />
                </UFormGroup>
            </div>
        </div>

        <BaseProductPrice
            v-once
            :price="Number(product.price)"
            :selling-price="Number(product.selling_price)"
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

        <div class="md:col-span-7 col-span-12">
            <UButton
                size="lg"
                block
                icon="i-heroicons-shopping-bag"
                :disabled="product.in_stock !== INVENTORY_STATUS.IN_STOCK || isLoading"
                label="Thêm Giỏ Hàng"
                @click="handleAddToCart"
            />
        </div>
    </div>
</template>
