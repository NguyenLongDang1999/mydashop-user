<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/profile'

// ** useHooks
const { userData } = useAuth()
const { isPending, mutateAsync } = useAuthUpdateProfile()

const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: userData
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
</script>

<template>
    <div class="grid grid-cols-12 gap-4 auto-rows-max">
        <div class="col-span-12">
            <UForm
                :state="{}"
                @submit="onSubmit"
            >
                <UCard>
                    <template #header>
                        <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                            Chỉnh sửa thông tin
                        </h2>
                    </template>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="md:col-span-6 col-span-12">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12">
                                    <FormInput
                                        :label="label.name"
                                        name="name"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        :label="label.email"
                                        name="email"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        :label="label.phone"
                                        name="phone"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormTextarea
                                        :label="label.address"
                                        name="address"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="md:col-span-6 col-span-12">
                            <FormUpload />
                        </div>
                    </div>

                    <template #footer>
                        <UButton
                            type="submit"
                            size="sm"
                            variant="solid"
                            label="Cập Nhật"
                            :loading="isPending"
                            :trailing="false"
                        />
                    </template>
                </UCard>
            </UForm>
        </div>
    </div>
</template>
