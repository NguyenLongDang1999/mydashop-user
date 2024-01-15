// ** Types Imports
import type { IWebsiteSetup } from '~/types/core.type'

export const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

export const navigateProduct = (slug: string) => `/san-pham/${slug}`
export const navigateCategory = (slug: string) => `/danh-muc/${slug}`

export const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()

    const timeDifference = now.getTime() - date.getTime()

    const seconds = Math.floor(timeDifference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (years > 0) {
        return `${years} năm trước`
    } else if (months > 0) {
        return `${months} tháng trước`
    } else if (days > 0) {
        return `${days} ngày trước`
    } else if (hours > 0) {
        return `${hours} giờ trước`
    } else if (minutes > 0) {
        return `${minutes} phút trước`
    } else {
        return `${seconds} giây trước`
    }
}

export const compareDateTime = row => {
    const startDate = new Date(row.discount_start_date).getTime()
    const endDate = new Date(row.discount_end_date).getTime()
    const today = new Date().getTime()

    return today >= startDate && today <= endDate
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatSellingPrice = (row: any, quantity = 1, isFormat = true) => {
    let discount = 0
    let sellingPrice = 0

    const formatPrice = Number(row.price)
    const formatSpecialPrice = Number(row.special_price)

    if (row.special_price_type === SPECIAL_PRICE.PERCENT) {
        discount = (formatPrice / 100) * formatSpecialPrice
        sellingPrice = Math.round((formatPrice - discount) / 1000) * 1000
    }

    if (row.special_price_type === SPECIAL_PRICE.PRICE) {
        discount = formatSpecialPrice
        sellingPrice = formatPrice - discount
    }

    // ** Sale Price
    if (compareDateTime(row)) {
        const formatDiscountAmount = Number(row.discount_amount)

        if (row.discount_type === SPECIAL_PRICE.PERCENT) {
            discount = (formatPrice / 100) * formatDiscountAmount
            sellingPrice = Math.round((formatPrice - discount) / 1000) * 1000
        }

        if (row.discount_type === SPECIAL_PRICE.PRICE) {
            discount = formatDiscountAmount
            sellingPrice = formatPrice - discount
        }
    }

    return isFormat ? formatCurrency(sellingPrice * quantity) : (sellingPrice * quantity)
}

export const getPathImageFile = (name?: string) => {
    const config = useRuntimeConfig()

    if (name) {
        return name.includes('https://') ?
            name :
            config.public.previewCdn + name
    }

    return IMAGE.DEFAULT
}

export const getValueBySlug = (slug: string, dataList: IWebsiteSetup[]) => (dataList.find(({ slug: dataSlug }) => dataSlug === slug)?.value) ?? ''

export const formatCouponDiscount = (amount: number) => {
    if (amount > 0 && amount <= 100) {
        return amount + '%'
    }

    return formatCurrency(Number(amount))
}

export const calculateCartDiscount = (cartTotal: number, amount: number, isFormat = true) => {
    let discount = amount
    let sellingPrice = cartTotal - discount

    if (amount > 0 && amount <= 100) {
        discount = ((cartTotal / 100) * amount)
        sellingPrice = Math.round((cartTotal - discount) / 1000) * 1000
    }

    return isFormat ? formatCurrency(sellingPrice) : sellingPrice
}
