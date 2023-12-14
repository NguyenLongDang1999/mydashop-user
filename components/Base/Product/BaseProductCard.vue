<script setup lang="ts">

// ** Types Imports
import type { IProduct } from '~/types/product.type'

// ** Props & Emits
interface Props {
    product: IProduct
}

const props = defineProps<Props>()

// ** useHooks
const { path } = useProduct()
const { isPending, mutateAsync } = useCartAdd()

// ** Computed
const productAttributeLength = computed(() => props.product.productAttributes.length || 0)
</script>

<template>
    <UCard
        v-once
        class="group text-left"
        :ui="{
            strategy: 'override',
            shadow: '',
            base: 'overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary',
            body: { padding: 'p-3' }
        }"
    >
        <div class="relative">
            <NuxtLink :to="navigateProduct(product.slug)">
                <NuxtImg
                    :src="getImageFile(path, product.image_uri)"
                    :alt="product.name"
                    :title="product.name"
                    loading="lazy"
                    width="600"
                    height="600"
                    class="w-full rounded-md"
                />
            </NuxtLink>

            <span
                v-if="Number(product.special_price_type) === SPECIAL_PRICE.PERCENT"
                class="absolute top-3 left-3 bg-red-600 px-2 py-1 text-xs text-white rounded-md"
            >-{{ product.special_price }}%</span>

            <ul class="absolute top-3 right-3 opacity-100 transform translate-x-0 group-hover:translate-x-0 group-hover:opacity-100 md:translate-x-20 md:op-0 transition">
                <li>
                    <UTooltip
                        text="Thêm Yêu Thích"
                        :popper="{ placement: 'left' }"
                    >
                        <UButton
                            icon="i-heroicons-heart"
                            size="sm"
                        />
                    </UTooltip>
                </li>
            </ul>
        </div>

        <div class="mt-3 flex gap-1 flex-col">
            <StarRatings
                :model-value="Number(product.total_rating)"
                disable-click
                :star-size="14"
            />

            <NuxtLink
                :to="navigateCategory(product.category.slug)"
                class="inline-block mt-1 capitalize"
            >
                <h6 class="font-medium line-clamp-1 text-gray-400 text-xs hover:text-primary">
                    {{ product.category.name }}
                </h6>
            </NuxtLink>

            <NuxtLink
                :to="navigateProduct(product.slug)"
                class="block h-12 capitalize"
            >
                <UTooltip
                    :text="product.name"
                    :popper="{ placement: 'bottom' }"
                >
                    <h4 class="text-sm font-semibold line-clamp-2 hover:text-primary">
                        {{ product.name }} - {{ product.sku }}
                    </h4>
                </UTooltip>
            </NuxtLink>

            <div class="flex items-center">
                <BaseProductPrice
                    :price="Number(product.price)"
                    :selling-price="Number(product.selling_price)"
                />
            </div>

            <ClientOnly>
                <UButton
                    size="md"
                    variant="outline"
                    block
                    :loading="isPending"
                    :disabled="product.in_stock !== INVENTORY_STATUS.IN_STOCK"
                    :label="productAttributeLength ? 'Xem Lựa Chọn' : 'Thêm Giỏ Hàng'"
                    @click="productAttributeLength ? navigateTo(navigateProduct(product.slug)) : mutateAsync({
                        product_id: product.id,
                        quantity: 1
                    })"
                />
            </ClientOnly>
        </div>
    </UCard>
</template>
