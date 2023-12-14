<script setup lang="ts">

// ** useHooks
const { dataList, cartLength } = useCartList()
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Giỏ hàng"
        />

        <UContainer>
            <section
                v-if="cartLength"
                class="mt-10"
            >
                <BaseCategoryTitle
                    icon="i-heroicons-shopping-bag"
                    title="Giỏ hàng"
                />
            </section>

            <section class="mt-10">
                <div class="grid gap-4 grid-cols-12">
                    <ClientOnly>
                        <template v-if="cartLength">
                            <div class="lg:col-span-9 col-span-12">
                                <CartPageList :data-list="dataList" />
                            </div>

                            <div class="lg:col-span-3 sm:col-span-6 col-span-12">
                                <CartPageCoupon :data-list="dataList" />
                            </div>
                        </template>

                        <div
                            v-else
                            class="col-span-12"
                        >
                            <div class="flex flex-col items-center mt-10">
                                <UIcon
                                    name="i-heroicons-face-frown"
                                    class="text-9xl"
                                />

                                <p class="my-4 capitalize font-semibold">
                                    Không có sản phẩm trong giỏ hàng.
                                </p>

                                <UButton
                                    label="Button"
                                    color="primary"
                                    icon="i-heroicons-arrow-left-20-solid"
                                    to="/cua-hang"
                                >
                                    Mua Sắm
                                </UButton>
                            </div>
                        </div>
                    </ClientOnly>
                </div>
            </section>
        </UContainer>
    </main>
</template>
