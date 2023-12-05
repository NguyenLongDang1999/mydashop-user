<script setup lang="ts">
import type { IAttributeValues } from '~/types/attribute.type'


// ** Data
const isOpen = ref<boolean>(false)

// ** useHooks
const { path } = useProduct()
const { path: pathCart } = useCart()
const { dataList } = await useCartList()
const { isLoading, dataFormInput } = useCrudDelete(pathCart.value, MESSAGE_SUCCESS.DELETE_CART)

// ** Computed
const cartLength = computed(() => dataList.value.CartItem && dataList.value.CartItem.length)
const cartTotal = computed(() => cartLength.value && dataList.value.CartItem.reduce((acc, item) => acc + (item.quantity * Number(item.Product.selling_price)), 0))
</script>

<template>
    <div class="block">
        <UTooltip text="Giỏ Hàng">
            <UChip
                :text="cartLength ? dataList.CartItem.length : 0"
                size="2xl"
            >
                <UButton
                    icon="i-heroicons-shopping-bag"
                    size="sm"
                    square
                    color="gray"
                    @click="isOpen = true"
                />
            </UChip>
        </UTooltip>

        <USlideover v-model="isOpen">
            <ClientOnly>
                <UCard
                    class="flex flex-col flex-1"
                    :ui="{ body: { base: 'flex-1 overflow-y-auto scroll-py-10' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
                >
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                Giỏ Hàng ({{ cartLength ? dataList.CartItem.length : 0 }})
                            </h3>

                            <UButton
                                color="gray"
                                variant="ghost"
                                icon="i-heroicons-x-mark-20-solid"
                                class="-my-1"
                                @click="isOpen = false"
                            />
                        </div>
                    </template>

                    <ul
                        v-if="cartLength"
                        class="flex flex-col gap-4"
                    >
                        <li
                            v-for="cart in dataList.CartItem"
                            :key="cart.id"
                            class="flex gap-4"
                        >
                            <div class="relative">
                                <NuxtLink
                                    :to="navigateProduct(cart.Product.slug)"
                                    @click="isOpen = false"
                                >
                                    <NuxtImg
                                        :src="getImageFile(path, cart.Product.image_uri)"
                                        :alt="cart.Product.name"
                                        :title="cart.Product.name"
                                        loading="lazy"
                                        width="100"
                                        height="100"
                                        class="w-[100px] h-[100px] rounded-md"
                                    />
                                </NuxtLink>

                                <UButton
                                    class="absolute -top-2 -left-2"
                                    icon="i-heroicons-x-mark-20-solid"
                                    size="2xs"
                                    :ui="{ rounded: 'rounded-full' }"
                                    :disabled="isLoading"
                                    @click="dataFormInput(cart.id)"
                                />
                            </div>

                            <div class="flex-1 flex flex-col gap-1">
                                <NuxtLink
                                    :to="navigateCategory(cart.Product.category.slug)"
                                    @click="isOpen = false"
                                >
                                    <h6 class="font-medium line-clamp-1 text-gray-400 text-xs hover:text-primary capitalize">
                                        {{ cart.Product.category.name }}
                                    </h6>
                                </NuxtLink>

                                <NuxtLink
                                    :to="navigateProduct(cart.Product.slug)"
                                    @click="isOpen = false"
                                >
                                    <h4 class="line-clamp-2 font-semibold text-sm hover:text-primary">
                                        {{ cart.Product.name }} - {{ cart.Product.sku }}
                                    </h4>
                                </NuxtLink>

                                <div>
                                    <div
                                        v-if="cart.attributes"
                                        class="text-xs text-gray-400"
                                    >
                                        {{ JSON.parse(cart.attributes).map((item: IAttributeValues) => `${item.attribute_name}: ${item.attribute_value}`).join(', ') }}
                                    </div>

                                    <span class="font-semibold sm:text-lg text-primary text-base">{{ cart.quantity }} x {{ formatCurrency(Number(cart.Product.selling_price)) }}</span>
                                    <span class="font-normal sm:text-base text-sm text-gray-300 line-through pl-3">{{ formatCurrency(Number(cart.Product.price)) }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div
                        v-else
                        class="flex flex-col items-center mt-10"
                    >
                        <UIcon
                            name="i-heroicons-face-frown"
                            class="text-9xl"
                        />

                        <p class="mt-4 capitalize font-semibold">
                            Không có sản phẩm trong giỏ hàng.
                        </p>
                    </div>

                    <template
                        v-if="cartLength"
                        #footer
                    >
                        <div class="flex justify-between">
                            <span class="uppercase font-semibold text-lg">Tổng tiền:</span>
                            <span class="text-lg">{{ formatCurrency(cartTotal) }}</span>
                        </div>

                        <div class="flex gap-2 mt-3">
                            <UButton
                                class="flex-1 capitalize"
                                block
                                size="lg"
                                to="/gio-hang"
                                @click="isOpen = false"
                            >
                                Xem giỏ hàng
                            </UButton>

                            <UButton
                                class="flex-1 capitalize"
                                variant="outline"
                                color="red"
                                size="lg"
                                block
                                to="/thanh-toan"
                                @click="isOpen = false"
                            >
                                Thanh toán
                            </UButton>
                        </div>
                    </template>
                </UCard>
            </ClientOnly>
        </USlideover>
    </div>
</template>
