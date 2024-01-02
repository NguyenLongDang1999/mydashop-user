<script setup lang="ts">

// ** useHooks
const { cartTotal } = useCartList()
</script>

<template>
    <UCard
        :ui="{
            header: { padding: 'py-4' }
        }"
    >
        <template #header>
            <h6 class="capitalize font-semibold">
                Tổng tiền
            </h6>
        </template>

        <div class="flex items-end gap-2">
            <FormInput
                label="Mã giảm giá"
                name="coupon"
            />

            <UButton
                variant="solid"
                size="md"
            >
                Gửi
            </UButton>
        </div>

        <div class="flex flex-col gap-4 mt-5">
            <ul class="flex flex-col gap-2">
                <UDivider />

                <li class="flex items-center justify-between">
                    <span class="capitalize font-semibold">Số tiền:</span>
                    <span class="text-base font-semibold">{{ formatCurrency(cartTotal) }}</span>
                </li>

                <li class="flex items-center justify-between">
                    <span class="capitalize font-semibold">Giảm giá:</span>
                    <span class="text-base font-semibold">{{ formatCurrency(500000) }}</span>
                </li>

                <UDivider />

                <li class="flex items-center justify-between text-primary">
                    <span class="capitalize font-semibold">Tổng tiền:</span>
                    <span class="text-base font-semibold">{{ formatCurrency(cartTotal) }}</span>
                </li>
            </ul>
        </div>
    </UCard>

    <div class="mt-5">
        <UButton
            color="red"
            variant="soft"
            size="md"
            block
            to="/thanh-toan"
        >
            Thanh Toán
        </UButton>
    </div>
</template>
