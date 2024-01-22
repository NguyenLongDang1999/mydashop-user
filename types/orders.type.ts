export interface IOrdersCheckout {
    name: string
    email: string
    phone: string
    shipping_address: string
    note?: string
    cart_id: number
    coupon_discount: number
    grand_total: number
    product_details: string
}
