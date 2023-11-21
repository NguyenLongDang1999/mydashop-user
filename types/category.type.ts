// ** Types Imports
import type { ICategoryAttribute } from '~/types/attribute.type'
import type { ICategoryBrand } from '~/types/brand.type'
import type { IProduct } from '~/types/product.type'

export interface ICategoryBreadcrumb {
    id: number
    slug: string
    name: string
}

export interface ICategory extends ICategoryBreadcrumb  {
    parent_id: number
    image_uri: string
    children: ICategory[]
    defaultOpen?: boolean
}

export interface ICategoryProductFilter {
    sort?: number
    attribute?: number[]
    brand?: number[]
    page: number
    pageSize?: string
}

export interface ICategoryDetail {
    id: number
    name: string
    image_uri: string
    description: string
    meta_title: string
    meta_description: string
    Product: IProduct[]
    brands: ICategoryBrand[]
    attributes: ICategoryAttribute[]
    aggregations: number
}
