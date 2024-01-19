// ** Third Party Imports
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { LocationQueryValue } from 'vue-router'
import type { ICategory, ICategoryDetail, ICategoryProductFilter } from '~/types/category.type'
import type { IProductPagination } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.CATEGORY)

export default function () {
    return {
        path
    }
}

export const useCategoryDataList = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<ICategory[]>({
        queryKey: [path.value + 'DataList'],
        queryFn: () => useFetcher(path.value + '/data-list')
    })

    await suspense()

    // ** Computed
    return computed(() =>
        data.value?.map(category => ({
            id: category.id,
            name: category.name,
            link: navigateCategory(category.slug),
            imageSrc: getPathImageFile(category.image_uri),
            children: category.children.map(subCategory => ({
                id: subCategory.id,
                name: subCategory.name,
                link: navigateCategory(subCategory.slug)
            }))
        })) || []
    )
}

export const useCategoryDataListNested = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<ICategory[]>({
        queryKey: [path.value + 'DataListNested'],
        queryFn: () => useFetcher(path.value + '/data-list-nested')
    })

    await suspense()

    // ** Computed
    return {
        path,
        dataList: computed(() => data.value as ICategory[])
    }
}

export const useCategoryDetail = async (slug: string) => {
    // ** useHooks
    const route = useRoute()

    // ** Data
    const search = reactive<ICategoryProductFilter>({
        sort: Number(route.query.sort) || sortOption[0].id,
        pageSize: route.query.pageSize as string || paginationOption[0],
        page: Number(route.query.page) || PAGE.CURRENT,
        attribute: parseQueryArray(route.query.attribute),
        brand: parseQueryArray(route.query.brand)
    })

    const { data, isFetching, suspense } = useQuery<ICategoryDetail>({
        queryKey: [path.value + 'Detail', slug, search],
        queryFn: () => useFetcher(path.value + `/${slug}`, { params: search }),
        placeholderData: keepPreviousData
    })

    await suspense()

    return {
        search,
        isFetching,
        data: computed(() => data.value as ICategoryDetail),
        dataTable: computed(() => data.value?.Product || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useCategoryPagination = async () => {
    // ** useHooks
    const route = useRoute()

    // ** Data
    const search = reactive<ICategoryProductFilter>({
        sort: Number(route.query.sort) || sortOption[0].id,
        pageSize: route.query.pageSize as string || paginationOption[0],
        page: Number(route.query.page) || PAGE.CURRENT,
        attribute: parseQueryArray(route.query.attribute),
        brand: parseQueryArray(route.query.brand),
        rating: parseQueryArray(route.query.rating)
    })

    const { data, isFetching, suspense } = useQuery<IProductPagination>({
        queryKey: [path.value + 'DataListShop', search],
        queryFn: () => useFetcher(path.value + '/data-list-shop', { params: search }),
        placeholderData: keepPreviousData
    })

    await suspense()

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

const parseQueryArray = (value: LocationQueryValue | LocationQueryValue[]) => {
    if (Array.isArray(value)) {
        return value.map(_v => Number(_v))
    } else if (value) {
        return [Number(value)]
    } else {
        return []
    }
}
