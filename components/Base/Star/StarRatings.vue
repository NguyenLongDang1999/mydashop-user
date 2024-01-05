<script setup lang="ts">

// ** Props & Emits
interface Props {
    modelValue?: number;
    numberOfStars?: number;
    starColor?: string;
    starSize?: number;
    disableClick?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    numberOfStars: 5,
    starSize: 24,
    modelValue: 0,
    starColor: 'primary'
})

const emit = defineEmits<{
    (e: 'update:modelValue', v: number): void;
}>()

// ** Data
const utils = {
    rounded(value: number, decimalPlaces: number) {
        const power = Math.pow(10, decimalPlaces)

        return Math.round(value * power) / power
    }
}

const starsContainer = ref<HTMLDivElement>()

// ** Computed
const rating = computed({
    get() {
        return props.modelValue
    },
    set(newVal) {
        const roundedVal = utils.rounded(newVal, 1)

        emit('update:modelValue', roundedVal)
    }
})

const percent = computed(() => {
    const normalizedRating =
    rating.value < 0
        ? 0
        : rating.value > props.numberOfStars
            ? props.numberOfStars
            : rating.value

    return (normalizedRating / props.numberOfStars) * 100
})

// ** Methods
function adjustRating(this: HTMLDivElement, e: MouseEvent) {
    if (props.disableClick) return
    const rect = this.getBoundingClientRect()

    const { pageX } = e
    const relativeX = pageX - rect.left
    const offsetWidth = rect.width
    const numberOfStars = props.numberOfStars
    const result = (relativeX / offsetWidth) * numberOfStars

    rating.value = Math.ceil(result)
}

onMounted(() => starsContainer.value?.addEventListener('click', adjustRating))
onBeforeUnmount(() => starsContainer.value?.removeEventListener('click', adjustRating))
</script>

<template>
    <div
        ref="starsContainer"
        class="overflow-hidden relative whitespace-nowrap w-fit"
        :class="disableClick ? 'pointer-events-none' : 'pointer-events-auto'"
    >
        <div
            class="absolute top-0 left-0 max-w-full overflow-hidden transition-[width]"
            :class="`text-${starColor}`"
            :style="{ width: percent + '%' }"
        >
            <BaseIconStar
                v-for="i in numberOfStars"
                :key="i"
                :style="{ width: starSize + 'px' }"
                class="fill-current cursor-pointer inline-block"
            />
        </div>

        <div class="text-gray-500">
            <BaseIconStar
                v-for="i in numberOfStars"
                :key="i"
                :style="{ width: starSize + 'px' }"
                class="fill-current cursor-pointer inline-block"
            />
        </div>
    </div>
</template>
