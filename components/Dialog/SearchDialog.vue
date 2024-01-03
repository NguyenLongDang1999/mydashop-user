<script setup lang="ts">

// ** Types Imports
import type { Group } from '@nuxt/ui/dist/runtime/types'
import type { IProduct } from '~/types/product.type'

// ** Data
const isOpen = ref<boolean>(false)

// ** useHooks
const { path } = useProduct()

const groups: Group[] = [{
    key: 'products',
    label: (q: string) => q && `Từ khóa “${q}”...`,
    search: async (q: string) => {
        if (!q) {
            return []
        }

        const product = await useFetcher<IProduct[]>(path.value + '/data-list-search', {
            params: { q }
        })

        return product.map((_p: IProduct) => ({
            id: _p.id,
            label: _p.name,
            avatar: {
                src: getPathImageFile(_p.image_uri)
            },
            to: navigateProduct(_p.slug),
            loading: 'lazy'
        }))
    }
}]

// ** Methods
function onSelect (option: Group) {
    if (option.to) {
        navigateTo(option.to)
    }

    isOpen.value = false
}

</script>

<template>
    <UTooltip text="Tìm Kiếm">
        <UButton
            icon="i-heroicons-magnifying-glass-20-solid"
            size="sm"
            variant="link"
            color="gray"
            @click="isOpen = true"
        />
    </UTooltip>

    <UModal v-model="isOpen">
        <UCommandPalette
            :groups="groups"
            :autoselect="false"
            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
            placeholder="Tìm kiếm..."
            :empty-state="{
                icon: 'i-heroicons-magnifying-glass-20-solid',
                label: 'Nhập từ khoá cần tìm kiếm.',
                queryLabel: 'Không tìm thấy sản phẩm nào.'
            }"
            @update:model-value="onSelect"
        />
    </UModal>
</template>
