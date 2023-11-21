import type { IProductAttribute } from './attribute.type'
import type { ICategory } from './category.type'
import type { IAggregations } from './core.type'

export interface IProductDataList {
    id: number
    name: string
    slug: string
    Product: IProduct[]
}

export interface IProduct {
    id: number
    sku: string
    slug: string
    name: string
    technical_specifications: string
    image_uri: string
    price: string
    in_stock: number
    special_price: string
    selling_price: string
    short_description: string
    special_price_type: number
    total_rating: number
    product_attributes: IProductAttribute[]
    category: {
        id: number
        slug: string
        name: string
        parentCategory: Omit<ICategory, 'image_uri'>
    }
    brand: {
        name: string
    }
}

export interface IProductDetail extends IProduct {
    description: string
    meta_title: string
    meta_description: string
}

export interface IProductPagination extends IAggregations {
    data: IProduct[]
}

export interface IProductCommentFormInput {
    rating: number
    product_id: number
    content: string
}

export interface IProductComment {
    id: number
    rating: number
    content: string
    created_at: string
    Users: {
        id: number
        fullname: string
        image_uri: string
    }
}

export interface IProductCommentPagination extends IAggregations {
    data: IProductComment[]
    totalReviews: number
    ratingPercentages: {
        count: number
        percent: number
    }[]
}
