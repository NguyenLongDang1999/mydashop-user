<script setup lang="ts">

// ** Types Imports
import type { ICartFormInput } from '~/types/cart.type'
import type { IProduct } from '~/types/product.type'

// ** Props & Emits
interface Props {
    product: IProduct
}

defineProps<Props>()

// ** useHooks
const { path } = useProduct()
const { path: pathCart } = useCart()
const { dataFormInput } = useCrudFormInput<ICartFormInput>(pathCart.value, MESSAGE_SUCCESS.CART)
</script>

<template>
    <UCard
        class="group"
        :ui="{
            strategy: 'override',
            shadow: '',
            base: 'overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary',
            body: { padding: 'p-3' }
        }"
    >
        <div class="grid gap-4 grid-cols-12">
            <div class="col-span-12 flex gap-4">
                <div class="relative">
                    <NuxtLink :to="navigateProduct(product.slug)">
                        <NuxtImg
                            :src="getImageFile(path, product.image_uri)"
                            :alt="product.name"
                            :title="product.name"
                            width="600"
                            height="600"
                            class="w-40 rounded-md object-cover"
                        />
                    </NuxtLink>

                    <span
                        v-if="Number(product.special_price_type) === SPECIAL_PRICE.PERCENT"
                        class="absolute top-3 left-3 bg-red-600 px-2 py-1 text-xs text-white rounded-md"
                    >-{{ product.special_price }}%</span>
                </div>

                <div class="flex-1 flex flex-col gap-1">
                    <StarRatings
                        :model-value="Number(product.total_rating)"
                        disable-click
                        :star-size="14"
                    />

                    <NuxtLink
                        :to="navigateCategory(product.category.slug)"
                        class="inline-flex capitalize mt-1"
                    >
                        <h6 class="font-medium line-clamp-1 text-gray-400 text-xs hover:text-primary">
                            {{ product.category.name }}
                        </h6>
                    </NuxtLink>

                    <NuxtLink
                        :to="navigateProduct(product.slug)"
                        class="block capitalize"
                    >
                        <h4 class="text-sm font-semibold line-clamp-1 hover:text-primary">
                            {{ product.name }}
                        </h4>
                    </NuxtLink>

                    <p class="line-clamp-2">
                        {{ product.short_description }}
                    </p>

                    <div class="flex items-center">
                        <LazyBaseProductPrice
                            :price="Number(product.price)"
                            :selling-price="Number(product.selling_price)"
                        />
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <UButton
                            size="md"
                            icon="i-heroicons-shopping-bag"
                            class="capitalize"
                            :disabled="product.in_stock !== INVENTORY_STATUS.IN_STOCK"
                            label="Thêm Giỏ Hàng"
                            @click="dataFormInput({
                                product_id: product.id,
                                quantity: 1
                            })"
                        />

                        <UButton
                            size="md"
                            color="red"
                            icon="i-heroicons-heart"
                        />
                    </div>
                </div>
            </div>
        </div>
    </UCard>
</template>
