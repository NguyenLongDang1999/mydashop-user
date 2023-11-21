<script setup lang="ts">

// ** Types Imports
import { useCartList } from '~/composables/useCart'
import type { ICartFormInput } from '~/types/cart.type'

// ** useHooks
const { path } = useCart()
const { path: pathProduct } = useProduct()
const { dataList } = await useCartList()
const { dataFormInput: cartQuantity } = useCrudFormInput<ICartFormInput>(path.value, 'Thành công!')
const { isLoading, dataFormInput } = useCrudDelete(path.value, MESSAGE_SUCCESS.DELETE_CART)

// ** Computed
const cartTotal = computed(() => dataList.value.CartItem.reduce((acc, item) => acc + (item.quantity * Number(item.Product.selling_price)), 0))

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
    <main>
        <BaseBreadcrumbs
            v-once
            title="Giỏ hàng"
        />

        <UContainer>
            <section
                v-once
                class="mt-10"
            >
                <BaseCategoryTitle
                    icon="i-heroicons-shopping-bag"
                    title="Giỏ hàng"
                />
            </section>

            <section class="mt-10">
                <div class="grid gap-4 grid-cols-12">
                    <div class="lg:col-span-9 col-span-12">
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
                                                class="rounded-lg w-14 h-14 object-cover"
                                            />

                                            <UButton
                                                class="absolute -top-2 -left-2"
                                                icon="i-heroicons-x-mark-20-solid"
                                                size="2xs"
                                                :ui="{ rounded: 'rounded-full' }"
                                                :disabled="isLoading"
                                                @click="dataFormInput(row.Product.id)"
                                            />
                                        </div>

                                        <div class="flex flex-col w-80 whitespace-normal">
                                            <NuxtLink
                                                :to="navigateProduct(row.Product.slug)"
                                                class="hover:text-primary"
                                            >
                                                <h4 class="font-semibold">
                                                    {{ row.Product.name }}
                                                </h4>
                                            </NuxtLink>

                                            <span>{{ row.Product.sku }}</span>
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
                                        @update:model-value="val => cartQuantity({
                                            id: row.Product.id,
                                            product_id: row.Product.id,
                                            quantity: val
                                        })"
                                    />
                                </template>

                                <template #total-data="{ row }">
                                    <span class="font-semibold sm:text-lg text-primary text-base">{{ formatCurrency(row.quantity * Number(row.Product.selling_price)) }}</span>
                                </template>
                            </UTable>
                        </div>
                    </div>

                    <div class="lg:col-span-3 sm:col-span-6 col-span-12">
                        <UCard
                            :ui="{
                                header: { padding: 'py-4' }
                            }"
                        >
                            <template #header>
                                <h6 class="capitalize font-semibold">
                                    Tổng tiền
                                </h6>
                            </template>

                            <div class="flex items-end gap-2">
                                <FormInput
                                    label="Mã giảm giá"
                                    name="coupon"
                                />

                                <UButton
                                    variant="solid"
                                    size="md"
                                >
                                    Gửi
                                </UButton>
                            </div>

                            <div class="flex flex-col gap-4 mt-5">
                                <ul class="flex flex-col gap-2">
                                    <UDivider />

                                    <li class="flex items-center justify-between">
                                        <span class="capitalize font-semibold">Số tiền:</span>
                                        <span class="text-base font-semibold">{{ formatCurrency(cartTotal) }}</span>
                                    </li>

                                    <li class="flex items-center justify-between">
                                        <span class="capitalize font-semibold">Giảm giá:</span>
                                        <span class="text-base font-semibold">500.000đ</span>
                                    </li>

                                    <UDivider />

                                    <li class="flex items-center justify-between text-primary">
                                        <span class="capitalize font-semibold">Tổng tiền:</span>
                                        <span class="text-base font-semibold">{{ formatCurrency(cartTotal) }}</span>
                                    </li>
                                </ul>
                            </div>
                        </UCard>

                        <div class="mt-5">
                            <UButton
                                color="red"
                                variant="soft"
                                size="md"
                                block
                                to="/thanh-toan"
                            >
                                Thanh Toán
                            </UButton>
                        </div>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
