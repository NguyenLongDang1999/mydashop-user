<script setup lang="ts">

// ** Types Imports
import { useCartList } from '~/composables/useCart'

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
            <UButton
                icon="i-heroicons-shopping-bag"
                size="sm"
                square
                color="gray"
                variant="ghost"
                @click="isOpen = true"
            >
                <template #leading>
                    <div class="relative">
                        <UIcon
                            name="i-heroicons-shopping-bag"
                            class="w-5 h-5"
                        />

                        <span
                            v-if="cartLength"
                            class="absolute -top-3 -right-3"
                        >
                            <div class="w-5 h-5 bg-primary text-white rounded-full text-xs flex justify-center items-center">
                                {{ dataList.CartItem.length }}
                            </div>
                        </span>
                    </div>
                </template>
            </UButton>
        </UTooltip>

        <USlideover v-model="isOpen">
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
                                    width="96"
                                    height="96"
                                    class="w-24 h-24 rounded-md"
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

                        <div class="flex-1 flex flex-col gap-2">
                            <NuxtLink
                                :to="navigateCategory(cart.Product.Category.slug)"
                                @click="isOpen = false"
                            >
                                <h6 class="font-medium line-clamp-1 text-gray-400 text-xs hover:text-primary capitalize">
                                    {{ cart.Product.Category.name }}
                                </h6>
                            </NuxtLink>

                            <NuxtLink
                                :to="navigateProduct(cart.Product.slug)"
                                @click="isOpen = false"
                            >
                                <h4 class="line-clamp-2 font-semibold text-sm hover:text-primary">
                                    {{ cart.Product.name }}
                                </h4>
                            </NuxtLink>

                            <div>
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
        </USlideover>
    </div>
</template>
