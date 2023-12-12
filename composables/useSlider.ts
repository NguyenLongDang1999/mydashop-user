// ** Types Imports
import type { ISlider } from '~/types/slider.type'

// ** State
const path = ref<string>(ROUTE.SLIDER)

export default function () {
    return {
        path
    }
}

export const useSliderDataList = async () => {
    // ** useHooks
    const { data, suspense } = useQueryFetch<ISlider[]>(path.value)

    await suspense()

    // ** Computed
    return {
        path,
        dataList: computed(() => data.value || [])
    }
}
