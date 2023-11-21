export enum ROUTE {
    AUTH = 'auth',
    CATEGORY = 'category',
    BRAND = 'brand',
    SLIDER = 'slider',
    PRODUCT = 'product',
    PRODUCT_COMMENT = 'product-comment',
    CART = 'cart'
}

export enum IMAGE {
    DEFAULT = '/default.jpg'
}

export enum PAGE {
    CURRENT = 1,
    SIZE = 12
}

export enum INVENTORY_STATUS {
    IN_STOCK = 10,
    OUT_OF_STOCK = 20
}

export enum SPECIAL_PRICE {
    PRICE = 10,
    PERCENT = 20
}

export enum MESSAGE_SUCCESS {
    CART = 'Sản phẩm đã được thêm vào giỏ hàng!',
    DELETE_CART = 'Xoá sản phẩm khỏi giỏ hàng!'
}
