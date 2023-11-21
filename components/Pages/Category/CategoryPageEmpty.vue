<template>
    <div class="lg:grid-col-span-9 grid-col-span-12 flex flex-col items-center text-center">
        <UIcon
            name="i-heroicons-face-frown"
            class="text-4xl text-primary"
        />

        <h2 class="mt-3 text-2xl font-semibold text-gray-800 uppercase">
            Không có sản phẩm nào được tìm thấy.
        </h2>

        <div class="mt-3">
            <UButton
                icon="i-heroicons-arrow-long-left"
                @click="navigateTo('/')"
            >
                Trang Chủ
            </UButton>
        </div>
    </div>
</template>
