<script setup lang="ts">

// ** Types Imports
import type { IProduct } from '~/types/product.type';

// ** Props & Emits
interface Props {
    product: IProduct
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useCartAdd()
const { mutateAsync: mutateAsyncWishlist } = useWishlistAdd()

// ** Computed
const productTypeSingle = computed(() => props.product.product_type === PRODUCT_TYPE.SINGLE)

// ** Methods
const handleAddtoCart = () => {
    if (productTypeSingle.value) {
        return useIsLoggedIn() ? mutateAsync({
            product_id: props.product.id,
            quantity: 1
        }) : navigateTo('/dang-nhap')
    } else {
        return navigateTo(navigateProduct(props.product.slug))
    }
}
</script>

<template>
    <UCard
        v-once
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
                            :src="getPathImageFile(product.image_uri)"
                            :alt="product.name"
                            :title="product.name"
                            width="600"
                            height="600"
                            class="w-44 rounded-md object-cover"
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
                            {{ product.name }} - {{ product.sku }}
                        </h4>
                    </NuxtLink>

                    <p
                        v-if="product.short_description"
                        class="line-clamp-2"
                    >
                        {{ product.short_description }}
                    </p>

                    <div class="flex items-center">
                        <LazyBaseProductPrice
                            :price="Number(product.price)"
                            :selling-price="formatSellingPrice(product).toString()"
                        />
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <ClientOnly>
                            <UButton
                                size="sm"
                                icon="i-heroicons-shopping-bag"
                                class="capitalize"
                                :loading="isPending"
                                :disabled="product.in_stock !== INVENTORY_STATUS.IN_STOCK"
                                :label="productTypeSingle ? 'Thêm Giỏ Hàng' : 'Xem Lựa Chọn'"
                                @click="handleAddtoCart"
                            />
                        </ClientOnly>

                        <UButton
                            size="sm"
                            color="red"
                            icon="i-heroicons-heart"
                            @click="mutateAsyncWishlist({ product_id: product.id })"
                        />
                    </div>
                </div>
            </div>
        </div>
    </UCard>
</template>
