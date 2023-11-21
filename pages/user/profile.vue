<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Thông tin tài khoản"
        />

        <UContainer>
            <section
                v-once
                class="mt-10"
            >
                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <UCard
                            :ui="{
                                header: { padding: '!p-0' }
                            }"
                        >
                            <template #header>
                                <NuxtImg
                                    src="/profile-banner.png"
                                    alt="Banner"
                                    class="w-full object-cover h-60"
                                />
                            </template>

                            <div class="flex flex-col sm:flex-row sm:text-start text-center -mt-16">
                                <div class="flex justify-center sm:mb-3">
                                    <NuxtImg
                                        src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/14.png"
                                        alt="Banner"
                                        class="w-32 object-cover border-4 border-solid rounded-md"
                                    />
                                </div>

                                <div class="sm:mt-16 sm:ml-5 mt-4">
                                    <h3 class="text-xl font-semibold capitalize mb-1">
                                        Nguyễn Long Đăng
                                    </h3>

                                    <p class="text-base text-gray-500">
                                        038 9747 179
                                    </p>
                                </div>
                            </div>
                        </UCard>
                    </div>

                    <div class="col-span-4">
                        <UCard>
                            <h5 class="uppercase text-gray-500">
                                Giới thiệu
                            </h5>

                            <ul class="flex flex-col mt-3 gap-3">
                                <li class="flex items-center gap-2">
                                    <div class="flex items-center gap-1">
                                        <BaseIconUser />
                                        <span class="font-semibold capitalize">Họ và tên:</span>
                                    </div>

                                    <span class="capitalize">Nguyễn Long Đăng</span>
                                </li>

                                <li class="flex items-center gap-2">
                                    <div class="flex items-center gap-1">
                                        <BaseIconPhoneCall />
                                        <span class="font-semibold capitalize">SĐT:</span>
                                    </div>

                                    <span>038 9747 179</span>
                                </li>

                                <li class="flex items-center gap-2">
                                    <div class="flex items-center gap-1">
                                        <BaseIconMail />
                                        <span class="font-semibold capitalize">Email:</span>
                                    </div>

                                    <span>longdang0412@gmail.com</span>
                                </li>

                                <li class="flex items-center gap-2">
                                    <div class="flex items-center gap-1">
                                        <BaseIconSkype />
                                        <span class="font-semibold capitalize">Skype:</span>
                                    </div>

                                    <span>Skype ID</span>
                                </li>

                                <li class="flex items-center gap-2">
                                    <div class="flex items-center gap-1">
                                        <BaseIconFacebookTabler />
                                        <span class="font-semibold capitalize">Facebook:</span>
                                    </div>

                                    <span>Facebook ID</span>
                                </li>
                            </ul>
                        </UCard>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
