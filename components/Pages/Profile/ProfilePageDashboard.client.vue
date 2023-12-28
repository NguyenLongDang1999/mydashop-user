<script setup lang="ts">

// ** useHooks
const { userData } = useAuth()
const { dataList } = useWishlistList()
</script>

<template>
    <div class="grid grid-cols-12 gap-4 auto-rows-max">
        <div class="lg:col-span-4 col-span-12">
            <UCard class="relative h-full">
                <h5 class="uppercase text-gray-500">
                    Giới thiệu
                </h5>

                <ul class="flex flex-col mt-3 gap-3">
                    <li class="flex items-center gap-2">
                        <div class="flex items-center gap-1">
                            <BaseIconUser />
                            <span class="font-semibold capitalize">Họ và tên:</span>
                        </div>

                        <span class="capitalize flex-1">{{ userData?.name }}</span>
                    </li>

                    <li class="flex items-center gap-2">
                        <div class="flex items-center gap-1">
                            <BaseIconPhoneCall />
                            <span class="font-semibold capitalize">SĐT:</span>
                        </div>

                        <span class="flex-1">{{ userData?.phone }}</span>
                    </li>

                    <li class="flex items-center gap-2">
                        <div class="flex items-center gap-1">
                            <BaseIconMail />
                            <span class="font-semibold capitalize">Email:</span>
                        </div>

                        <span class="flex-1">{{ userData?.email }}</span>
                    </li>
                </ul>

                <NuxtLink
                    to="/"
                    class="absolute bg-primary text-white px-2 py-1 text-xs rounded-tl-md right-0 bottom-0"
                >
                    Chỉnh Sửa
                </NuxtLink>
            </UCard>
        </div>

        <div class="lg:col-span-8 col-span-12">
            <UCard class="relative h-full">
                <h5 class="uppercase text-gray-500">
                    Tóm Tắt
                </h5>

                <ul class="grid grid-cols-12 mt-3 gap-4">
                    <li class="col-span-6 flex items-center gap-2">
                        <UButton
                            :ui="{ rounded: 'rounded-full' }"
                            icon="i-heroicons-shopping-bag"
                            size="lg"
                            color="primary"
                            square
                            variant="soft"
                        />

                        <div class="flex flex-col">
                            <span class="text-base font-semibold">01</span>
                            <span class="capitalize text-slate-400">sản phẩm trong giỏ hàng</span>
                        </div>
                    </li>

                    <li class="col-span-6 flex items-center gap-2">
                        <UButton
                            :ui="{ rounded: 'rounded-full' }"
                            icon="i-heroicons-heart"
                            size="lg"
                            color="primary"
                            square
                            variant="soft"
                        />

                        <div class="flex flex-col">
                            <span class="text-base font-semibold">07</span>
                            <span class="capitalize text-slate-400">sản phẩm yêu thích</span>
                        </div>
                    </li>

                    <li class="col-span-6 flex items-center gap-2">
                        <UButton
                            :ui="{ rounded: 'rounded-full' }"
                            icon="i-heroicons-truck"
                            size="lg"
                            color="primary"
                            square
                            variant="soft"
                        />

                        <div class="flex flex-col">
                            <span class="text-base font-semibold">10</span>
                            <span class="capitalize text-slate-400">đơn hàng đang vận chuyển</span>
                        </div>
                    </li>

                    <li class="col-span-6 flex items-center gap-2">
                        <UButton
                            :ui="{ rounded: 'rounded-full' }"
                            icon="i-heroicons-inbox-stack"
                            size="lg"
                            color="primary"
                            square
                            variant="soft"
                        />

                        <div class="flex flex-col">
                            <span class="text-base font-semibold">10</span>
                            <span class="capitalize text-slate-400">đơn hàng đã giao</span>
                        </div>
                    </li>
                </ul>
            </UCard>
        </div>

        <div
            v-if="dataList.length"
            class="col-span-12"
        >
            <div class="flex items-center justify-between mt-5">
                <h2 class="uppercase font-bold text-base">
                    Sản phẩm yêu thích
                </h2>

                <UButton
                    label="Button"
                    color="gray"
                    trailing-icon="i-heroicons-arrow-right-20-solid"
                    to="/tat-ca-danh-muc"
                >
                    Xem Tất Cả
                </UButton>
            </div>

            <div class="mt-2">
                <Swiper
                    :space-between="10"
                    :slides-per-view="2"
                    :breakpoints="{
                        1200: {
                            slidesPerView: 5,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        475: {
                            slidesPerView: 2,
                        },
                        360: {
                            slidesPerView: 1,
                        },
                    }"
                >
                    <SwiperSlide
                        v-for="product in dataList"
                        :key="product.product.id"
                    >
                        <BaseProductCard :product="product.product" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
</template>
