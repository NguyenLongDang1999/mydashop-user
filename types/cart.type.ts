// ** Types Imports
import type { IProduct } from '~/types/product.type'

export interface ICartItem {
    id: number
    quantity: number;
    Product: IProduct
}

export interface ICart {
    id: number
    CartItem: ICartItem[]
}

export interface ICartFormInput {
    id?: number
    product_id: number
    quantity: number
    attribute_id?: string
}
