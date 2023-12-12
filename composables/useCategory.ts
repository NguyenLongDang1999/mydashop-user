// ** Third Party Imports
import { keepPreviousData } from '@tanstack/vue-query'

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

export const useCategoryNested = () => useQueryFetch<ICategory[]>(path.value, '/data-list-nested', 'DataListNested')

export const useCategoryDataList = async () => {
    // ** useHooks
    const { data, suspense } = useQueryFetch<ICategory[]>(path.value)

    await suspense()

    // ** Computed
    return computed(() =>
        data.value?.map(category => ({
            id: category.id,
            name: category.name,
            link: navigateCategory(category.slug),
            imageSrc: getImageFile(path.value, category.image_uri),
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
    const { data, suspense } = useCategoryNested()

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
    const { data: dataList } = useCategoryNested()

    // ** Data
    const search = reactive<ICategoryProductFilter>({
        sort: Number(route.query.sort) || sortOption[0].id,
        pageSize: route.query.pageSize as string || paginationOption[0],
        page: Number(route.query.page) || PAGE.CURRENT,
        attribute: parseQueryArray(route.query.attribute),
        brand: parseQueryArray(route.query.brand),
        slug
    })

    const { data: row, isFetching, suspense } = useQueryFetch<ICategoryDetail>(path.value, `/${slug}`, 'Detail', search, {
        placeholderData: keepPreviousData
    })

    await suspense()

    return {
        search,
        isFetching,
        data: computed(() => row.value as ICategoryDetail),
        categoryList: computed(() => dataList.value || []),
        dataTable: computed(() => row.value?.Product || []),
        dataAggregations: computed(() => row.value?.aggregations || 0)
    }
}

export const useCategoryPagination = async () => {
    // ** useHooks
    const route = useRoute()
    const { data: dataList } = useCategoryNested()

    // ** Data
    const search = reactive<ICategoryProductFilter>({
        sort: Number(route.query.sort) || sortOption[0].id,
        pageSize: route.query.pageSize as string || paginationOption[0],
        page: Number(route.query.page) || PAGE.CURRENT,
        attribute: parseQueryArray(route.query.attribute),
        brand: parseQueryArray(route.query.brand)
    })

    const { data, isFetching, suspense } = useQueryFetch<IProductPagination>(path.value, '/data-list-shop', 'DataListShop', search, {
        placeholderData: keepPreviousData
    })

    await suspense()

    return {
        search,
        isFetching,
        categoryList: computed(() => dataList.value || []),
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
