<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Sản phẩm yêu thích"
        >
            <BaseBreadcrumbsItem
                to="/thong-tin-tai-khoan"
                title="Thông tin tài khoản"
            />
        </BaseBreadcrumbs>

        <UContainer>
            <section class="mt-10">
                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <ProfilePageHeader />
                    </div>

                    <div class="col-span-12">
                        <div class="md:flex">
                            <ProfilePageNav />

                            <section class="w-full">
                                <ProfilePageWishlist />
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
