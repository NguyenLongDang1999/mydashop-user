// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { IWebsiteSetup } from '~/types/core.type'

// ** State
const path = ref<string>(ROUTE.WEBSITE_SETUP)

export default function () {
    return {
        path
    }
}

export const useWebsiteSetupSystem = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<IWebsiteSetup[]>({
        queryKey: [path.value + 'DataListSystem'],
        queryFn: () => useFetcher(path.value + '/system')
    })

    await suspense()

    return {
        data: computed(() => data.value as IWebsiteSetup[] || [])
    }
}
