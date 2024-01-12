<template>
    <header class="bg-white border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
        <UContainer>
            <div class="flex items-center justify-between gap-3 h-16">
                <div class="lg:flex-1 flex items-center gap-1.5">
                    <TheLogo />
                </div>

                <nav>
                    <ul class="gap-x-8 hidden lg:flex">
                        <li
                            v-for="nav in navigation()"
                            :key="nav.to"
                            class="relative"
                        >
                            <NuxtLink
                                class="text-sm/6 font-semibold capitalize flex items-center gap-1 transition-colors hover:text-primary"
                                :to="nav.to"
                                active-class="text-primary"
                            >
                                {{ nav.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>

                <div class="flex items-center justify-end lg:flex-1 gap-1">
                    <TheSlideoverMenu />
                    <SearchDialog />
                    <ClientOnly>
                        <TheSlideoverCart v-if="useIsLoggedIn()" />
                        <UTooltip
                            v-else
                            text="Giỏ Hàng"
                        >
                            <UButton
                                icon="i-heroicons-shopping-bag"
                                size="sm"
                                square
                                variant="link"
                                color="gray"
                                to="/dang-nhap"
                            />
                        </UTooltip>

                        <TheAuthDropdown />
                    </ClientOnly>
                </div>
            </div>
        </UContainer>
    </header>
</template>
