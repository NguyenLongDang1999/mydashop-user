<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/contact'

// ** useHooks
const { handleSubmit } = useForm({ validationSchema: schema })
const { isLoading, authLogin } = useAuthLogin()

// ** Methods
const onSubmit = handleSubmit(values => authLogin(values))
</script>

<template>
    <main>
        <BaseBreadcrumbs
            v-once
            title="Liên hệ"
        />

        <UContainer>
            <section
                v-once
                class="mt-10"
            >
                <div class="grid gap-4 grid-cols-12">
                    <div class="md:col-span-6 col-span-12">
                        <UCard>
                            <h1 class="uppercase font-bold md:text-3xl sm:text-2xl text-xl text-center mb-2">
                                Liên hệ
                            </h1>

                            <UForm
                                :state="{}"
                                @submit="onSubmit"
                            >
                                <div class="grid gap-4 grid-cols-12">
                                    <div class="col-span-12">
                                        <FormInput
                                            :label="label.fullname"
                                            name="fullname"
                                        />
                                    </div>

                                    <div class="md:col-span-6 col-span-12">
                                        <FormInput
                                            :label="label.email"
                                            name="email"
                                        />
                                    </div>

                                    <div class="md:col-span-6 col-span-12">
                                        <FormInput
                                            :label="label.phone"
                                            name="phone"
                                        />
                                    </div>

                                    <div class="col-span-12">
                                        <FormTextarea
                                            :label="label.content"
                                            :rows="5"
                                            name="content"
                                        />
                                    </div>

                                    <div class="col-span-12">
                                        <UButton
                                            type="submit"
                                            size="lg"
                                            block
                                            :loading="isLoading"
                                        >
                                            Gửi
                                        </UButton>
                                    </div>
                                </div>
                            </UForm>
                        </UCard>
                    </div>

                    <div class="md:col-span-6 col-span-12">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.74699320876!2d109.19281957579648!3d12.265393329966253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170678c61b8f251%3A0x115f6f97f1af1d7c!2sPonagar%20Temple!5e0!3m2!1sen!2s!4v1699343525432!5m2!1sen!2s"
                            width="600"
                            height="450"
                            style="border:0;"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            class="w-full"
                        />
                    </div>
                </div>
            </section>
        </UContainer>
    </main>
</template>
