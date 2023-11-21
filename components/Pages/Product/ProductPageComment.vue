<script setup lang="ts">

// ** Types Imports
import type { IProductCommentFormInput } from '~/types/product.type'

// ** Validations Import
import { label, schema } from '~/validations/comment'

// ** Props & Emits
interface Props {
    totalRating?: number
    productId?: number
}

const props = defineProps<Props>()

// ** Data
const search = reactive({
    page: 1,
    pageSize: 8
})

// ** useHooks
const { path } = useProductComment()
const { handleSubmit } = useForm({ validationSchema: schema })
const { isLoading, dataFormInput } = useCrudFormInput<IProductCommentFormInput>(path.value, 'Gửi đánh giá sản phẩm thành công!')
const { dataComments, dataTable: commentList, dataAggregations } = await useProductCommentList(props.productId as number, search)

// ** Methods
const onSubmit = handleSubmit((values, { resetForm }) => {
    dataFormInput({
        ...values,
        product_id: props.productId
    })

    resetForm()
})
</script>

<template>
    <div class="mt-5">
        <h4 class="capitalize text-xl font-semibold">
            Thêm đánh giá của bạn
        </h4>

        <div class="grid gap-4 grid-cols-12 mt-5">
            <div class="md:col-span-5 col-span-12">
                <UAlert
                    v-if="!useIsLoggedIn()"
                    icon="i-heroicons-information-circle"
                    color="red"
                    variant="subtle"
                    title="Cảnh báo!"
                    description="Bạn cần đăng nhập để có thể thêm đánh giá của bản thân."
                />

                <UForm
                    v-else
                    :state="{}"
                    @submit="onSubmit"
                >
                    <div class="grid gap-4 grid-cols-12">
                        <div class="col-span-12">
                            <FormStars
                                :label="label.rating"
                                name="rating"
                            />
                        </div>

                        <div class="col-span-12">
                            <FormTextarea
                                :rows="6"
                                :label="label.content"
                                name="content"
                            />
                        </div>

                        <div class="col-span-12">
                            <UButton
                                type="submit"
                                :loading="isLoading"
                            >
                                Gửi Bình Luận
                            </UButton>
                        </div>
                    </div>
                </UForm>
            </div>

            <div class="md:hidden block col-span-12">
                <UDivider label="Bình Luận" />
            </div>

            <div class="md:col-span-7 col-span-12">
                <div class="flex flex-col gap-4">
                    <UCard>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2 border-r border-gray-200 dark:border-gray-800">
                                <div class="flex items-center gap-1">
                                    <span class="text-3xl text-primary">{{ totalRating?.toFixed(2) || 0 }}</span>

                                    <UIcon
                                        class="bg-primary w-6 h-6"
                                        name="i-heroicons-star-solid"
                                    />
                                </div>

                                <p class="text-gray-500">
                                    Tổng cộng {{ dataComments?.totalReviews }} đánh giá sản phẩm
                                </p>
                            </div>

                            <div class="flex flex-col gap-3 justify-center">
                                <div
                                    v-for="(rating, key) in dataComments?.ratingPercentages"
                                    :key="key"
                                    class="flex items-center gap-2"
                                >
                                    <span class="whitespace-nowrap">{{ key }} Sao</span>
                                    <UProgress :value="rating.percent" />
                                    <span>{{ rating.count }}</span>
                                </div>
                            </div>
                        </div>
                    </UCard>

                    <div
                        v-for="comment in commentList"
                        :key="comment.id"
                        class="flex flex-col gap-1"
                    >
                        <div class="flex justify-between">
                            <div class="flex items-center gap-2">
                                <UAvatar
                                    src="https://avatars.githubusercontent.com/u/739984?v=4"
                                    alt="Avatar"
                                />

                                <div class="flex flex-col">
                                    <h6 class="font-semibold capitalize text-base">
                                        {{ comment.Users.fullname }}
                                    </h6>

                                    <div class="flex gap-0.5">
                                        <StarRatings
                                            v-model="comment.rating"
                                            disable-click
                                            :star-size="18"
                                        />
                                    </div>
                                </div>
                            </div>

                            <span class="text-gray-400">{{ formatTimeAgo(comment.created_at) }}</span>
                        </div>

                        <p>{{ comment.content }}</p>
                    </div>

                    <template v-if="dataAggregations > 8">
                        <UPagination
                            v-model="search.page"
                            :page-count="search.pageSize"
                            :total="dataAggregations"
                            :ui="{
                                wrapper: 'flex items-center gap-1',
                                rounded: '!rounded-full min-w-[32px] justify-center'
                            }"
                            :prev-button="{
                                icon: 'i-heroicons-arrow-small-left-20-solid',
                                color: 'primary',
                                variant: 'outline'
                            }"
                            :next-button="{
                                icon: 'i-heroicons-arrow-small-right-20-solid',
                                color: 'primary',
                                variant: 'outline'
                            }"
                        />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
