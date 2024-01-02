// ** Types Imports
import type { IProduct } from '~/types/product.type'

export interface IWishlist {
    id: number
    product: IProduct
}

export interface IWishlistFormInput {
    id?: number
    product_id: number
}

export interface IWishlistDataTable {
    data: IWishlist[]
    aggregations: number
}
