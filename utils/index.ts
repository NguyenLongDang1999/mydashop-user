export const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

export const getImageFile = (path: string, name?: string) => {
    if (name) {
        const env = useRuntimeConfig()

        return name.includes('https://') ?
            name :
            `${env.public.previewCdn}/${path}/${name}`
    }

    return IMAGE.DEFAULT
}

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

export const generateUUIDv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8

    return v.toString(16)
})

export const compareDateTime = row => {
    const startDate = new Date(row.discount_start_date).getTime()
    const endDate = new Date(row.discount_end_date).getTime()
    const today = new Date().getTime()

    return today >= startDate && today <= endDate
}

export const formatSellingPrice = (row, quantity = 1) => {
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

    return formatCurrency(sellingPrice * quantity)
}
