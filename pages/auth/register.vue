<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/register'

// ** useHooks
const router = useRouter()
const { handleSubmit } = useForm({ validationSchema: schema })
const { isLoading, authRegister } = useAuthRegister()

// ** Methods
const onSubmit = handleSubmit(async values => {
    values.confirm_password = undefined
    await authRegister(values)
    router.push('/')
})
</script>

<template>
    <main>
        <BaseBreadcrumbs title="Đăng Nhập" />

        <UContainer>
            <section class="mt-10">
                <h1 class="text-center uppercase font-bold md:text-3xl sm:text-2xl text-xl">
                    Đăng ký
                </h1>

                <div class="mt-5 grid gap-4 grid-cols-12">
                    <div class="xl:col-start-5 xl:col-span-4 lg:col-start-4 lg:col-span-6 md:col-start-3 md:col-span-8 col-span-12">
                        <UForm
                            :state="{}"
                            @submit="onSubmit"
                        >
                            <div class="grid gap-4 grid-cols-12">
                                <div class="col-span-6">
                                    <FormInput
                                        :label="label.fullname"
                                        name="fullname"
                                    />
                                </div>

                                <div class="col-span-6">
                                    <FormInput
                                        :label="label.phone"
                                        name="phone"
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
                                        :label="label.password"
                                        name="password"
                                        type="password"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        :label="label.confirm_password"
                                        name="confirm_password"
                                        type="password"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <UButton
                                        type="submit"
                                        size="lg"
                                        block
                                        :loading="isLoading"
                                    >
                                        ĐĂNG KÝ
                                    </UButton>
                                </div>
                            </div>
                        </UForm>

                        <div
                            v-once
                            class="mt-5 text-base text-center text-gray-500"
                        >
                            <span>Hoặc, Đăng nhập với</span>

                            <div class="my-3 flex gap-2 justify-center">
                                <BaseIconFacebook />
                                <BaseIconGoogle />
                            </div>

                            <span>Bạn đã có tài khoản?</span>

                            <div class="mt-5">
                                <UButton
                                    size="lg"
                                    variant="outline"
                                    to="/dang-nhap"
                                    block
                                >
                                    TỚI ĐĂNG NHẬP
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
