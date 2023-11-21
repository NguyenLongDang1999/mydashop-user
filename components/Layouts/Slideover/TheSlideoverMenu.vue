<script setup lang="ts">

// ** Data
const isOpen = ref<boolean>(false)
</script>

<template>
    <div class="lg:hidden block">
        <UTooltip text="Menu">
            <UButton
                icon="i-heroicons-bars-3"
                size="sm"
                square
                color="gray"
                variant="ghost"
                @click="isOpen = true"
            />
        </UTooltip>

        <USlideover
            v-model="isOpen"
            side="left"
        >
            <UCard
                class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Menu
                        </h3>

                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </div>
                </template>

                <ul class="flex flex-col gap-4">
                    <li
                        v-for="nav in navigation()"
                        :key="nav.to"
                    >
                        <NuxtLink
                            class="text-sm/6 font-semibold capitalize flex items-center gap-1 transition-colors hover:text-primary"
                            :to="nav.to"
                            active-class="text-primary"
                            @click="isOpen = false"
                        >
                            {{ nav.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </UCard>
        </USlideover>
    </div>
</template>
