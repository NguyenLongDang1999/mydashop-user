<script setup lang="ts">

// ** Data
const service = [
    {
        icon: 'i-heroicons-truck',
        title: 'Miễn phí vận chuyển',
        content: 'Miễn phí đơn hàng từ 500k'
    },
    {
        icon: 'i-heroicons-receipt-refund',
        title: 'Đổi trả dễ dàng',
        content: 'Đổi trả hàng sau 7 ngày nếu không vừa ý'
    },
    {
        icon: 'i-heroicons-user-group',
        title: 'Hỗ trợ 24/7',
        content: 'Gọi hotline để được tư vấn'
    },
    {
        icon: 'i-heroicons-credit-card',
        title: 'Thanh toán đa dạng',
        content: 'Nhiều phương thức thanh toán đa dạng linh động'
    }
]
</script>

<template>
    <section
        v-once
        class="grid gap-8 grid-cols-12 my-24"
    >
        <div
            v-for="item in service"
            :key="item.title"
            class="col-span-12 lg:col-span-3 md:col-span-6"
        >
            <div class="flex items-center">
                <UIcon
                    :name="item.icon"
                    class="text-5xl"
                />

                <div class="pl-4">
                    <h3 class="text-base mb-1 font-medium capitalize">
                        {{ item.title }}
                    </h3>

                    <p>{{ item.content }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
