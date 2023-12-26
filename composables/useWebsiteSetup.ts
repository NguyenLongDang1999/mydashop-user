// ** Types Imports
import type { IWebsiteSetup } from '~/types/core.type'

// ** State
const path = ref<string>(ROUTE.WEBSITE_SETUP)

export default function () {
    return {
        path
    }
}

export const useWebsiteSetupDetail = async (slug: string) => {
    // ** useHooks
    const { data, suspense } = useQueryFetch<IWebsiteSetup>(path.value, '', 'Detail',
        { slug },
        {
            queryKey: [path.value + '-detail', slug]
        }
    )

    await suspense()

    // ** Computed
    return {
        data: computed(() => data.value as IWebsiteSetup || {})
    }
}

export const useWebsiteSetupSystem = async () => {
    // ** useHooks
    const { data, suspense } = useQueryFetch<IWebsiteSetup[]>(path.value, '/system', 'DataListSystem')

    await suspense()

    return {
        data: computed(() => data.value as IWebsiteSetup[] || [])
    }
}
