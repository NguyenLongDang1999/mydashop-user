export enum ROUTE {
    AUTH = 'auth',
    CATEGORY = 'category',
    BRAND = 'brand',
    PRODUCT = 'product',
    PRODUCT_COMMENT = 'product-comment',
    CART = 'cart',
    WEBSITE_SETUP = 'website-setup',
    WISHLISTS = 'wishlists'
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

export enum PRODUCT_TYPE {
    SINGLE = 10,
    VARIANT = 20
}

export enum MESSAGE_SUCCESS {
    CART = 'Sản phẩm đã được thêm vào giỏ hàng!',
    WISHLISTS = 'Sản phẩm đã được thêm vào danh sách yêu thích!',
    DELETE_CART = 'Xoá sản phẩm khỏi giỏ hàng!'
}

export enum WEBSITE_SETUP {
    HOME_SLIDER = 'home_slider',
    HOME_BANNER1 = 'home_banner1',
    HOME_BANNER2 = 'home_banner2',
    HOME_BANNER3 = 'home_banner3',
    WEBSITE_COLOUR = 'website_colour',
}
