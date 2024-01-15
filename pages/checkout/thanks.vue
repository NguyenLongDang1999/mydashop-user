<template>
    <main>
        <UContainer>
            <section
                v-once
                class="mt-10"
            >
                <div class="lg:grid-col-span-9 grid-col-span-12 flex flex-col items-center text-center">
                    <UIcon
                        name="i-heroicons-check-circle"
                        class="text-4xl text-primary"
                    />

                    <h2 class="mt-3 text-2xl font-semibold text-gray-800 uppercase">
                        Đặt hàng thành công.
                    </h2>

                    <p class="my-3 lg:w-3/5 md:w-4/6">
                        <!-- Đơn đặt hàng đã -->
                    </p>

                    <UButton
                        icon="i-heroicons-arrow-long-left"
                        @click="navigateTo('/cua-hang')"
                    >
                        Tiếp Tục Mua Hàng
                    </UButton>
                </div>
            </section>
        </UContainer>
    </main>
</template>
