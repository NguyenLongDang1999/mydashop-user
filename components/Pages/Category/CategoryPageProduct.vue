<script setup lang="ts">

// ** Types Imports
import type { ICategoryAttribute } from '~/types/attribute.type'
import type { ICategoryBrand } from '~/types/brand.type'
import type { ICategory } from '~/types/category.type'
import type { ICrudTableOptions } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

// ** Props & Emits
interface Props {
    categoryList?: ICategory[]
    categoryBrand?: ICategoryBrand[]
    categoryAttribute?: ICategoryAttribute[]
}

defineProps<Props>()

// ** Data
const { dataTable } = inject('product') as ICrudTableOptions<IProduct>

// ** Data
const isList = ref<boolean>(false)
</script>

<template>
    <div class="lg:w-[calc(100%-288px)] w-full">
        <template v-if="dataTable.length">
            <CategoryPageFilterMobile
                :category-list="categoryList"
                :category-brand="categoryBrand"
                :category-attribute="categoryAttribute"
            />
            <CategoryPageSort @category-view="val => isList = val" />
            <CategoryPageListProduct v-if="isList" />
            <CategoryPageGridProduct v-else />
        </template>

        <CategoryPageEmpty v-else />
    </div>
</template>
