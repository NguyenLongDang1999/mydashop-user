<script setup lang="ts">

// ** Types Imports
import type { IAttributeValues } from '~/types/attribute.type'
import type { ICart, ICartFormInput } from '~/types/cart.type'

// ** Props & Emits
interface Props {
    dataList: ICart
}

defineProps<Props>()

// ** useHooks
const { path } = useCart()
const { path: pathProduct } = useProduct()
const { dataFormInput: cartQuantity } = useCrudFormInput<ICartFormInput>(path.value, 'Thành công!', false)
const { isLoading, dataFormInput } = useCrudDelete(path.value, MESSAGE_SUCCESS.DELETE_CART)
const { dataFormInput: purgeCart } = useCrudDelete(`${path.value}/purge-cart`, MESSAGE_SUCCESS.DELETE_CART)

// ** Data
const cartColumns = [{
    key: 'name',
    label: 'Thông tin sản phẩm',
    class: 'capitalize'
}, {
    key: 'price',
    label: 'Giá cả',
    class: 'capitalize'
}, {
    key: 'quantity',
    label: 'Số lượng',
    class: 'capitalize'
}, {
    key: 'total',
    label: 'Tổng tiền',
    class: 'capitalize'
}]
</script>

<template>
    <div class="flex border border-gray-200 dark:border-gray-700 relative not-prose rounded-md bg-white dark:bg-gray-900 overflow-x-auto">
        <UTable
            class="w-full"
            :rows="dataList.CartItem"
            :columns="cartColumns"
        >
            <template #name-data="{ row }">
                <div class="flex items-center gap-2">
                    <div class="relative">
                        <NuxtImg
                            :src="getImageFile(pathProduct, row.Product.image_uri)"
                            :alt="row.Product.name"
                            :width="56"
                            :height="56"
                            class="rounded-lg min-w-[56px] min-h-[56px] object-cover"
                        />

                        <UButton
                            class="absolute -top-2 -left-2"
                            icon="i-heroicons-x-mark-20-solid"
                            size="2xs"
                            :ui="{ rounded: 'rounded-full' }"
                            :disabled="isLoading"
                            @click="dataFormInput(row.id)"
                        />
                    </div>

                    <div class="flex flex-col w-80 whitespace-normal">
                        <NuxtLink
                            :to="navigateProduct(row.Product.slug)"
                            class="hover:text-primary"
                        >
                            <h4 class="font-semibold">
                                {{ row.Product.name }} - {{ row.Product.sku }}
                            </h4>
                        </NuxtLink>

                        <span
                            v-if="row.attributes"
                            class="text-xs text-gray-400 mt-1"
                        >{{ JSON.parse(row.attributes).map((item: IAttributeValues) => `${item.attribute_name}: ${item.attribute_value}`).join(', ') }}</span>
                    </div>
                </div>
            </template>

            <template #price-data="{ row }">
                <span class="font-semibold sm:text-lg text-primary text-base">
                    {{ formatCurrency(Number(row.Product.selling_price)) }}
                </span>
            </template>

            <template #quantity-data="{ row }">
                <BaseProductQuantity
                    :model-value="row.quantity"
                    class="w-32"
                    @update:model-value="quantity => cartQuantity({
                        id: row.Product.id,
                        product_id: row.Product.id,
                        quantity,
                        attributes: row.attributes
                    })"
                />
            </template>

            <template #total-data="{ row }">
                <span class="font-semibold sm:text-lg text-primary text-base">{{ formatCurrency(row.quantity * Number(row.Product.selling_price)) }}</span>
            </template>
        </UTable>
    </div>

    <div class="mt-4 flex justify-between">
        <UButton
            label="Button"
            color="gray"
            icon="i-heroicons-building-storefront"
            to="/cua-hang"
            variant="ghost"
        >
            Tiếp Tục Mua Sắm
        </UButton>

        <div>
            <UButton
                label="Button"
                color="red"
                icon="i-heroicons-x-mark"
                @click="purgeCart(dataList.id)"
            >
                Xóa Giỏ Hàng
            </UButton>
        </div>
    </div>
</template>
