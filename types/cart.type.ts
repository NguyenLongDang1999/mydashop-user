// ** Types Imports
import type { IProduct } from '~/types/product.type'

export interface ICartItem {
    id: number
    quantity: number
    attributes: string
    Product: IProduct
}

export interface ICart {
    id: number
    coupon_code: string
    discount: number
    CartItem: ICartItem[]
}

export interface ICartFormInput {
    id?: number
    product_id: number
    quantity: number
    attributes?: string
}

export interface ICouponFormInput {
    coupon_code: string
    cart_total: number
}
