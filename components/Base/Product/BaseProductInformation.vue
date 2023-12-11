<script setup lang="ts">

// ** Types Imports
import type { IProduct, IProductVariant } from '~/types/product.type'

// ** Props & Emits
interface Props {
    product: IProduct
    result?: IProductVariant
}

defineProps<Props>()
</script>

<template>
    <ul class="flex flex-col gap-1">
        <li class="font-semibold">
            <span class="capitalize">Mã sản phẩm:</span>
            <span class="pl-2 text-primary">{{ result?.sku || product.sku }}</span>
        </li>

        <li
            v-if="product.brand"
            class="font-semibold"
        >
            <span class="capitalize">Thương hiệu:</span>

            <NuxtLink
                to="/"
                class="pl-2 capitalize text-primary"
            >
                {{ product.brand.name }}
            </NuxtLink>
        </li>

        <li
            v-if="product.category"
            class="font-semibold"
        >
            <span class="capitalize">Danh mục:</span>

            <NuxtLink
                :to="navigateCategory(product.category.slug)"
                class="pl-2 capitalize text-primary"
            >
                {{ product.category.name }}
            </NuxtLink>
        </li>

        <li class="flex gap-2 items-center font-semibold">
            <span class="capitalize">Tình trạng:</span>
            <BaseProductInStock :instock="result?.in_stock || product.in_stock" />
        </li>
    </ul>
</template>
