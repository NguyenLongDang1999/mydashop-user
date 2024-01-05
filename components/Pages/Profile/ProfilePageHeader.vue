<script setup lang="ts">

// ** useHooks
const { userData } = useAuth()
</script>

<template>
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
                    {{ userData?.name }}
                </h3>

                <p class="text-base text-gray-500">
                    {{ userData?.phone }}
                </p>
            </div>
        </div>
    </UCard>
</template>
