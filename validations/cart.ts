// ** VeeValidate Imports
import { object, string } from 'yup'

export const label = {
    attribute_id: 'Thông tin không được bỏ trống.'
}

export const schema = object({
    attribute_id: string().required(`${label.attribute_id} không được bỏ trống.`)
})
