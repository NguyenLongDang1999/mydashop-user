export interface ICategoryAttribute {
    id: number
    name: string
    attribute_values: {
        id: number
        value: string
    }[]
}

export interface IProductAttribute {
    id: number
    name: string
    attribute: {
        id: number
        name: string
    }
    product_attribute_values: {
        id: number
        value: string
        attribute_value_id: number
    }[]
}

export interface IAttributeValues {
    attribute_id?: number
    attribute_value_id?: number
}
