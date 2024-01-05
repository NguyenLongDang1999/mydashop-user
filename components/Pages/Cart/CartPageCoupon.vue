<script setup lang="ts">

// ** VeeValidate Imports
import { object, string } from 'yup'

// ** Validate
const schema = object({
    coupon_code: string().required('Vui lòng nhập.')
})

// ** useHooks
const { dataList, cartTotal } = useCartList()
const { mutateAsync } = useCartApplyCoupon()
const { mutateAsync: removeCoupon } = useCartRemoveCoupon()

const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        coupon_code: dataList.value.coupon_code
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    coupon_code: values.coupon_code,
    cart_total: cartTotal.value
}))
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

        <UForm
            :state="{}"
            @submit="onSubmit"
        >
            <div class="flex items-start gap-2">
                <FormInput
                    label="Mã giảm giá"
                    name="coupon_code"
                    :disabled="!!dataList.coupon_code"
                />

                <UButton
                    v-if="!dataList.coupon_code"
                    type="submit"
                    variant="solid"
                    size="md"
                    class="mt-6"
                >
                    Gửi
                </UButton>

                <UButton
                    v-else
                    variant="solid"
                    size="md"
                    class="mt-6"
                    @click="removeCoupon"
                >
                    Xóa
                </UButton>
            </div>
        </UForm>

        <div class="flex flex-col gap-4 mt-5">
            <ul class="flex flex-col gap-2">
                <UDivider />

                <li class="flex items-center justify-between">
                    <span class="capitalize font-semibold">Số tiền:</span>
                    <span class="text-base font-semibold">{{ formatCurrency(cartTotal) }}</span>
                </li>

                <li class="flex items-center justify-between">
                    <span class="capitalize font-semibold">Giảm giá:</span>
                    <span class="text-base font-semibold">{{ formatCouponDiscount(dataList.discount) }}</span>
                </li>

                <UDivider />

                <li class="flex items-center justify-between text-primary">
                    <span class="capitalize font-semibold">Tổng tiền:</span>
                    <span class="text-base font-semibold">{{ calculateCartDiscount(cartTotal, Number(dataList.discount)) }}</span>
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
