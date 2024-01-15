<script setup lang="ts">

// ** Types Imports
import { useCartList } from '~/composables/useCart'
import type { IAttributeValues } from '~/types/attribute.type'

// ** Validations Imports
import { schema } from '~/validations/checkout'

definePageMeta({ middleware: ['auth'] })

// ** useHooks
const { userData } = useAuth()
const { dataList, cartLength, cartTotal } = useCartList()
const { mutateAsync } = useOrderCheckout()

const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        name: userData.value?.name,
        email: userData.value?.email,
        phone: userData.value?.phone,
        shipping_address: userData.value?.address
    }
})

// ** Methods
const onSubmit = handleSubmit(values => {
    const product = dataList.value.CartItem.map(_p => ({
        id: _p.Product.id,
        quantity: _p.quantity,
        price: formatSellingPrice(_p.Product, _p.quantity, false),
        variation: _p.attributes ? JSON.parse(_p.attributes).map((item: IAttributeValues) => `${item.attribute_name}: ${item.attribute_value}`).join(', ') : undefined
    }))

    mutateAsync({
        ...values,
        cart_id: dataList.value.id,
        coupon_discount: Number(dataList.value.discount),
        grand_total: calculateCartDiscount(cartTotal.value, Number(dataList.value.discount), false),
        product_details: JSON.stringify(product)
    })
})
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Thanh toán"
        />

        <UContainer>
            <section
                v-once
                class="mt-10"
            >
                <div class="grid grid-cols-12 gap-4 mt-4">
                    <div class="col-span-12">
                        <UButton
                            label="Button"
                            color="gray"
                            icon="i-heroicons-arrow-left-20-solid"
                            to="/gio-hang"
                        >
                            Về Giỏ Hàng
                        </UButton>
                    </div>

                    <div class="md:col-span-5 col-span-12">
                        <UCard>
                            <template #header>
                                <h4 class="uppercase font-semibold">
                                    Tóm tắt đơn hàng
                                </h4>
                            </template>

                            <ClientOnly>
                                <div
                                    v-if="cartLength"
                                    class="flex flex-col gap-3"
                                >
                                    <div
                                        v-for="row in dataList.CartItem"
                                        :key="row.id"
                                        class="flex items-center gap-2"
                                    >
                                        <UChip
                                            :text="row.quantity"
                                            size="2xl"
                                        >
                                            <NuxtImg
                                                :src="getPathImageFile(row.Product.image_uri)"
                                                :alt="row.Product.name"
                                                :width="60"
                                                :height="60"
                                                class="rounded-lg min-w-[60px] min-h-[60px] object-cover"
                                            />
                                        </UChip>

                                        <div class="flex flex-col whitespace-normal">
                                            <NuxtLink
                                                :to="navigateProduct(row.Product.slug)"
                                                class="hover:text-primary line-clamp-1"
                                            >
                                                <h4 class="font-semibold">
                                                    {{ row.Product.name }} - {{ row.Product.sku }}
                                                </h4>
                                            </NuxtLink>

                                            <span
                                                v-if="row.attributes"
                                                class="text-xs text-gray-400 mt-1"
                                            >{{ JSON.parse(row.attributes).map((item: IAttributeValues) => `${item.attribute_name}: ${item.attribute_value}`).join(', ') }}</span>

                                            <span class="font-semibold text-primary mt-1">{{ formatSellingPrice(row.Product, row.quantity) }}</span>
                                        </div>
                                    </div>

                                    <UDivider />

                                    <div class="flex flex-col gap-1">
                                        <div class="flex items-center gap-3 font-semibold">
                                            <span>Số Tiền:</span>
                                            <span class="text-primary">{{ formatCurrency(cartTotal) }}</span>
                                        </div>

                                        <div class="flex items-center gap-3 font-semibold">
                                            <span>Giảm Giá:</span>
                                            <span class="text-primary">{{ formatCouponDiscount(dataList.discount) }}</span>
                                        </div>

                                        <div class="flex items-center gap-3 font-semibold">
                                            <span>Tổng Tiền:</span>
                                            <span class="text-primary">{{ calculateCartDiscount(cartTotal, Number(dataList.discount)) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </ClientOnly>
                        </UCard>
                    </div>

                    <div class="md:col-span-7 col-span-12">
                        <UCard>
                            <template #header>
                                <h4 class="uppercase font-semibold">
                                    Thông tin thanh toán
                                </h4>
                            </template>

                            <UForm
                                :state="{}"
                                @submit="onSubmit"
                            >
                                <div class="grid grid-cols-12 gap-4">
                                    <div class="col-span-12">
                                        <FormInput
                                            name="name"
                                            label="Họ và tên"
                                        />
                                    </div>

                                    <div class="sm:col-span-6 col-span-12">
                                        <FormInput
                                            name="email"
                                            label="Email"
                                        />
                                    </div>

                                    <div class="sm:col-span-6 col-span-12">
                                        <FormInput
                                            name="phone"
                                            label="Số điện thoại"
                                        />
                                    </div>

                                    <div class="col-span-12">
                                        <FormTextarea
                                            name="shipping_address"
                                            label="Địa chỉ giao hàng"
                                        />
                                    </div>

                                    <div class="col-span-12">
                                        <FormTextarea
                                            name="note"
                                            label="Ghi chú đơn hàng"
                                        />
                                    </div>

                                    <div class="col-span-12">
                                        <UButton
                                            type="submit"
                                            size="sm"
                                            :loading="isPending"
                                        >
                                            Thanh Toán
                                        </UButton>
                                    </div>
                                </div>
                            </UForm>
                        </UCard>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
