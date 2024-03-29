// ** VeeValidate Imports
import { object, string } from 'yup'

export const label = {
    name: 'Họ và tên',
    phone: 'Số điện thoại',
    email: 'Email',
    shipping_address: 'Địa chỉ giao hàng'
}

export const schema = object({
    name: string()
        .required(`${label.name} không được bỏ trống.`)
        .max(60, ({ max }) => `${label.name} không được vượt quá ${max} ký tự.`),
    email: string()
        .required(`${label.email} không được bỏ trống.`)
        .email(`${label.email} không đúng định dạng.`),
    phone: string().notRequired(),
    shipping_address: string().required(`${label.shipping_address} không được bỏ trống.`),
    note: string().notRequired()
})
